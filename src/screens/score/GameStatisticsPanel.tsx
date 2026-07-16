import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import LinearGradient from 'react-native-linear-gradient';

import { FadeInItem } from '../../components/FadeInItem';
import { Fonts } from '../../constants/theme';

import { useScoreState } from '../../navigation/ScoreContext';
import { Colors } from '../../theme/colors';

import type { SavedGame } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 32 - 32 - 8;

const PERIODS = [
  { key: '7d', label: '7 Days', ms: 7 * 24 * 60 * 60 * 1000 },
  { key: '30d', label: '30 Days', ms: 30 * 24 * 60 * 60 * 1000 },
  { key: '3m', label: '3 Months', ms: 90 * 24 * 60 * 60 * 1000 },
  { key: 'all', label: 'All Time', ms: Infinity },
];

// Illustrative placeholder shown only until the player has saved a real round.
const DEMO_STATS = {
  gamesPlayed: '24',
  bestScore: '-3',
  avgScore: '+6.4',
  avgPutts: '32.1',
  holesPlayed: '396',
  improvement: '+8%',
};
const DEMO_SCORE_HISTORY = [9, 14, 8, 12, 6, 11];
const DEMO_STROKES = [44, 36, 32, 40, 24, 36];

function formatToPar(value: number): string {
  if (value === 0) {
    return 'E';
  }
  return value > 0 ? `+${value}` : `${value}`;
}

export function GameStatisticsPanel() {
  const { previousGames } = useScoreState();
  const [period, setPeriod] = useState('30d');
  const isDemo = previousGames.length === 0;

  const periodMs = PERIODS.find(p => p.key === period)?.ms ?? Infinity;
  const filtered = useMemo(() => {
    const now = Date.now();
    return previousGames
      .filter(game => now - game.timestamp <= periodMs)
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [previousGames, periodMs]);

  const stats = isDemo ? DEMO_STATS : computeStats(filtered);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.GameStatisticsPanelScroll}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.GameStatisticsPanelPeriodRow}
      >
        {PERIODS.map(p => {
          const isActive = p.key === period;
          return (
            <TouchableOpacity key={p.key} onPress={() => setPeriod(p.key)}>
              {isActive ? (
                <View style={styles.GameStatisticsPanelPeriodChip}>
                  <LinearGradient
                    colors={[Colors.goldLight, Colors.gold]}
                    style={styles.GameStatisticsPanelPeriodChipFill}
                  />
                  <Text style={styles.GameStatisticsPanelPeriodTextActive}>
                    {p.label}
                  </Text>
                </View>
              ) : (
                <View style={styles.GameStatisticsPanelPeriodChipInactive}>
                  <Text style={styles.GameStatisticsPanelPeriodText}>
                    {p.label}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.GameStatisticsPanelStatsGrid}>
        <StatCard label="GAMES PLAYED" value={stats.gamesPlayed} />
        <StatCard label="BEST SCORE" value={stats.bestScore} />
        <StatCard label="AVG SCORE" value={stats.avgScore} />
        <StatCard label="AVG PUTTS" value={stats.avgPutts} />
        <StatCard label="HOLES PLAYED" value={stats.holesPlayed} />
        <StatCard label="IMPROVEMENT" value={stats.improvement} />
      </View>

      <View style={styles.GameStatisticsPanelChartCard}>
        <Text style={styles.GameStatisticsPanelChartTitle}>Score History</Text>
        {isDemo ? (
          <ScoreLineChart values={DEMO_SCORE_HISTORY} />
        ) : filtered.length >= 2 ? (
          <ScoreLineChart values={filtered.map(g => g.summary.scoreToPar)} />
        ) : (
          <Text style={styles.GameStatisticsPanelChartEmpty}>
            Play and save at least 2 games to see your trend.
          </Text>
        )}
      </View>

      <View style={styles.GameStatisticsPanelChartCard}>
        <Text style={styles.GameStatisticsPanelChartTitle}>
          Average Strokes per Round
        </Text>
        {isDemo ? (
          <StrokesBarChart values={DEMO_STROKES} />
        ) : filtered.length >= 1 ? (
          <StrokesBarChart
            values={filtered.slice(-6).map(g => g.summary.finalStrokes)}
          />
        ) : (
          <Text style={styles.GameStatisticsPanelChartEmpty}>
            No rounds saved in this period yet.
          </Text>
        )}
      </View>

      <Text style={styles.GameStatisticsPanelPreviousLabel}>
        Previous Games
      </Text>
      {previousGames.length === 0 ? (
        <Text style={styles.GameStatisticsPanelEmptyText}>
          No saved games yet. Finish a round and tap Save Game to see it here.
        </Text>
      ) : (
        previousGames.map((game, i) => (
          <FadeInItem
            key={game.id}
            index={i}
            style={styles.GameStatisticsPanelGameRow}
          >
            <Text style={styles.GameStatisticsPanelGameDate}>
              {game.dateLabel}
            </Text>
            <Text style={styles.GameStatisticsPanelGameStrokes}>
              {game.summary.finalStrokes} strokes
            </Text>
            <Text style={styles.GameStatisticsPanelGameScore}>
              {formatToPar(game.summary.scoreToPar)}
            </Text>
          </FadeInItem>
        ))
      )}
    </ScrollView>
  );
}

function computeStats(games: SavedGame[]) {
  if (games.length === 0) {
    return {
      gamesPlayed: '0',
      bestScore: '—',
      avgScore: '—',
      avgPutts: '—',
      holesPlayed: '0',
      improvement: '—',
    };
  }

  const scores = games.map(g => g.summary.scoreToPar);
  const putts = games.map(g => g.summary.totalPutts);
  const bestScore = Math.min(...scores);
  const avgScore = scores.reduce((sum, v) => sum + v, 0) / scores.length;
  const avgPutts = putts.reduce((sum, v) => sum + v, 0) / putts.length;

  let improvement = '—';
  if (games.length >= 2) {
    const mid = Math.floor(games.length / 2);
    const older = scores.slice(0, mid);
    const newer = scores.slice(mid);
    const olderAvg = older.reduce((s, v) => s + v, 0) / older.length;
    const newerAvg = newer.reduce((s, v) => s + v, 0) / newer.length;
    const delta = olderAvg - newerAvg;
    const pct =
      olderAvg !== 0 ? Math.round((delta / Math.abs(olderAvg)) * 100) : 0;
    improvement = `${pct >= 0 ? '+' : ''}${pct}%`;
  }

  return {
    gamesPlayed: String(games.length),
    bestScore: formatToPar(bestScore),
    avgScore: formatToPar(Math.round(avgScore * 10) / 10),
    avgPutts: avgPutts.toFixed(1),
    holesPlayed: String(games.length * 18),
    improvement,
  };
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.StatCardContainer}>
      <Text style={styles.StatCardLabel}>{label}</Text>
      <Text style={styles.StatCardValue}>{value}</Text>
    </View>
  );
}

function ScoreLineChart({ values }: { values: number[] }) {
  const data = values.map(value => ({ value }));

  return (
    <LineChart
      data={data}
      width={CHART_WIDTH}
      height={110}
      adjustToWidth
      parentWidth={CHART_WIDTH}
      color={Colors.goldLight}
      thickness={2.5}
      curved
      isAnimated
      animationDuration={700}
      dataPointsColor={Colors.goldLight}
      dataPointsRadius={3.5}
      areaChart
      startFillColor={Colors.goldLight}
      endFillColor={Colors.goldLight}
      startOpacity={0.28}
      endOpacity={0.02}
      hideYAxisText
      hideRules
      hideAxesAndRules
      xAxisThickness={0}
      yAxisThickness={0}
      initialSpacing={4}
      endSpacing={4}
      disableScroll
    />
  );
}

function StrokesBarChart({ values }: { values: number[] }) {
  const data = values.map(value => ({
    value,
    frontColor: Colors.goldLight,
    gradientColor: Colors.gold,
  }));

  return (
    <BarChart
      data={data}
      width={CHART_WIDTH}
      height={80}
      adjustToWidth
      parentWidth={CHART_WIDTH}
      showGradient
      barBorderRadius={6}
      hideYAxisText
      hideRules
      hideAxesAndRules
      xAxisThickness={0}
      yAxisThickness={0}
      initialSpacing={8}
      endSpacing={8}
      disableScroll
    />
  );
}

const styles = StyleSheet.create({
  GameStatisticsPanelScroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  GameStatisticsPanelPeriodRow: {
    marginBottom: 16,
  },
  GameStatisticsPanelPeriodChip: {
    height: 32.5,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    overflow: 'hidden',
  },
  GameStatisticsPanelPeriodChipFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  GameStatisticsPanelPeriodChipInactive: {
    height: 32.5,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  GameStatisticsPanelPeriodText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.ivoryMuted,
  },
  GameStatisticsPanelPeriodTextActive: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.buttonText,
  },

  GameStatisticsPanelStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  StatCardContainer: {
    width: '48%',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: 16,
    padding: 13,
  },
  StatCardLabel: {
    fontSize: 10.5,
    color: Colors.textFaint,
    marginBottom: 8,
  },

  StatCardValue: {
    fontFamily: Fonts.headingSemiBold,
    fontSize: 21,
    color: Colors.ivory,
  },
  GameStatisticsPanelChartCard: {
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: 19,
    padding: 16,
    marginBottom: 16,
  },

  GameStatisticsPanelChartTitle: {
    fontSize: 12.5,
    color: Colors.ivoryMuted,
    marginBottom: 12,
  },
  GameStatisticsPanelChartEmpty: {
    fontSize: 12,
    color: Colors.textFainter,
    paddingVertical: 20,
    textAlign: 'center',
  },
  GameStatisticsPanelPreviousLabel: {
    fontSize: 12,
    color: Colors.textFaint,
    marginBottom: 10,
  },

  GameStatisticsPanelEmptyText: {
    fontSize: 12.5,
    color: 'rgba(244,241,234,0.45)',
    textAlign: 'center',
    paddingVertical: 30,
  },

  GameStatisticsPanelGameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.headerBorder,
  },
  GameStatisticsPanelGameDate: {
    fontSize: 12.5,
    color: Colors.ivoryMuted,
    flex: 1,
  },

  GameStatisticsPanelGameStrokes: {
    fontSize: 12,
    color: Colors.textFainter,
    marginRight: 12,
  },

  GameStatisticsPanelGameScore: {
    fontFamily: Fonts.headingSemiBold,
    fontSize: 15,
    color: Colors.goldLight,
  },
});
