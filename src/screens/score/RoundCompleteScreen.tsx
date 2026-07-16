import React, { useEffect, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Fonts } from '../../constants/theme';
import { useOverlayAnimation } from '../../hooks/useOverlayAnimation';
import { useScoreState } from '../../navigation/ScoreContext';
import { Colors } from '../../theme/colors';

function formatToPar(value: number): string {
  if (value === 0) {
    return 'E';
  }
  return value > 0 ? `+${value}` : `${value}`;
}

export function RoundCompleteScreen() {
  const { roundComplete, saveGame, startNewGame, viewStatistics } =
    useScoreState();
  const [gameSaved, setGameSaved] = useState(false);
  const { renderedValue, animatedStyle } = useOverlayAnimation(roundComplete);

  useEffect(() => {
    if (roundComplete) {
      setGameSaved(false);
    }
  }, [roundComplete]);

  if (!renderedValue) {
    return null;
  }

  const summary = renderedValue;

  const handleSaveGame = () => {
    if (gameSaved) {
      return;
    }
    saveGame();
    setGameSaved(true);
  };

  return (
    <Animated.View style={[styles.RoundCompleteScreenContainer, animatedStyle]}>
      <View style={styles.RoundCompleteScreenHeader}>
        <Text style={styles.RoundCompleteScreenEyebrow}>ROUND COMPLETE</Text>
        <Text style={styles.RoundCompleteScreenTitle}>
          {formatToPar(summary.scoreToPar)}{' '}
          <Text style={styles.RoundCompleteScreenTitleSub}>
            ({summary.finalStrokes} strokes)
          </Text>
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.RoundCompleteScreenBody}
      >
        <View style={styles.RoundCompleteScreenGrid}>
          <StatCard label="FINAL SCORE" value={String(summary.finalStrokes)} />
          <StatCard
            label="SCORE TO PAR"
            value={formatToPar(summary.scoreToPar)}
          />
          <StatCard label="TOTAL PUTTS" value={String(summary.totalPutts)} />
          <StatCard label="BEST HOLE" value={`Hole ${summary.bestHole}`} />
          <StatCard
            label="TOUGHEST HOLE"
            value={`Hole ${summary.toughestHole}`}
          />
          <StatCard label="FAIRWAYS HIT" value={`${summary.fairwaysHitPct}%`} />
          <StatCard
            label="GREENS IN REG."
            value={`${summary.greensInRegPct}%`}
          />
          <StatCard label="DURATION" value={`${summary.durationMin} min`} />
        </View>
      </ScrollView>

      <View style={styles.RoundCompleteScreenFooter}>
        <View style={styles.RoundCompleteScreenRow}>
          <TouchableOpacity
            style={[
              styles.RoundCompleteScreenSecondaryBtn,
              gameSaved && styles.RoundCompleteScreenSecondaryBtnSaved,
            ]}
            onPress={handleSaveGame}
          >
            <Text style={styles.RoundCompleteScreenSecondaryBtnText}>
              {gameSaved ? 'Game Saved ✓' : 'Save Game'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.RoundCompleteScreenSecondaryBtn}
            onPress={viewStatistics}
          >
            <Text style={styles.RoundCompleteScreenSecondaryBtnText}>
              View Statistics
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={startNewGame}>
          <LinearGradient
            colors={[Colors.goldLight, Colors.gold]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.RoundCompleteScreenCta}
          >
            <Text style={styles.RoundCompleteScreenCtaText}>
              Start New Game
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.StatCardContainer}>
      <Text style={styles.StatCardLabel}>{label}</Text>
      <Text style={styles.StatCardValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  RoundCompleteScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
  },

  RoundCompleteScreenHeader: {
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.headerBorder,
  },

  RoundCompleteScreenEyebrow: {
    fontSize: 11,
    color: Colors.goldLight,
    letterSpacing: 2,
    marginBottom: 10,
  },
  RoundCompleteScreenTitle: {
    fontFamily: Fonts.headingSemiBold,
    fontSize: 26,
    color: Colors.ivory,
  },

  RoundCompleteScreenTitleSub: {
    fontSize: 16,
    color: Colors.textFaint,
  },
  RoundCompleteScreenBody: {
    padding: 18,
  },
  RoundCompleteScreenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
    fontSize: 18,
    color: Colors.ivory,
  },
  RoundCompleteScreenFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.headerBorder,
    padding: 18,
    gap: 12,
    marginBottom: 25,
  },
  RoundCompleteScreenRow: {
    flexDirection: 'row',
    gap: 10,
  },
  RoundCompleteScreenSecondaryBtn: {
    flex: 1,
    height: 41,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.goldSoftBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RoundCompleteScreenSecondaryBtnSaved: {
    backgroundColor: Colors.goldSoftBg,
  },
  RoundCompleteScreenSecondaryBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.goldLight,
  },
  RoundCompleteScreenCta: {
    height: 43,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  RoundCompleteScreenCtaText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.buttonText,
  },
});
