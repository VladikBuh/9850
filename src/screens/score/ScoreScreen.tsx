import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ScreenHeader } from '../../components/ScreenHeader';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { useRequestsState } from '../../navigation/RequestsContext';

import { useScoreState } from '../../navigation/ScoreContext';
import { Colors } from '../../theme/colors';
import { CurrentGamePanel } from './CurrentGamePanel';

import { GameStatisticsPanel } from './GameStatisticsPanel';

export function ScoreScreen() {
  const { segment, setSegment } = useScoreState();
  const { openRequestCenter } = useAppNavigation();
  const { submittedRequests } = useRequestsState();
  const activeRequestCount = submittedRequests.filter(
    r => r.status === 'active',
  ).length;

  return (
    <View style={styles.ScoreScreenContainer}>
      <ScreenHeader
        title="Score"
        subtitle="Track your round"
        notificationCount={activeRequestCount}
        onPressBell={openRequestCenter}
      />

      <View style={styles.ScoreScreenSegmentControl}>
        <TouchableOpacity
          style={styles.ScoreScreenSegmentButton}
          onPress={() => setSegment('current')}
        >
          {segment === 'current' ? (
            <LinearGradient
              colors={[Colors.goldLight, Colors.gold]}
              style={styles.ScoreScreenSegmentFill}
            >
              <Text style={styles.ScoreScreenSegmentTextActive}>
                Current Game
              </Text>
            </LinearGradient>
          ) : (
            <Text style={styles.ScoreScreenSegmentText}>Current Game</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ScoreScreenSegmentButton}
          onPress={() => setSegment('stats')}
        >
          {segment === 'stats' ? (
            <LinearGradient
              colors={[Colors.goldLight, Colors.gold]}
              style={styles.ScoreScreenSegmentFill}
            >
              <Text style={styles.ScoreScreenSegmentTextActive}>
                Game Statistics
              </Text>
            </LinearGradient>
          ) : (
            <Text style={styles.ScoreScreenSegmentText}>Game Statistics</Text>
          )}
        </TouchableOpacity>
      </View>

      {segment === 'current' ? <CurrentGamePanel /> : <GameStatisticsPanel />}
    </View>
  );
}

const styles = StyleSheet.create({
  ScoreScreenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  ScoreScreenSegmentControl: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 4,
    gap: 4,
  },
  ScoreScreenSegmentButton: {
    flex: 1,
  },
  ScoreScreenSegmentFill: {
    height: 35,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScoreScreenSegmentText: {
    height: 35,
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.ivoryMuted,
    textAlign: 'center',
    lineHeight: 35,
  },

  ScoreScreenSegmentTextActive: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.buttonText,
  },
});
