import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Fonts } from '../../constants/theme';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { useScoreState } from '../../navigation/ScoreContext';

import { Colors } from '../../theme/colors';

import { HOLES } from '../../data/holes';

export function GamePausedModal() {
  const { isPaused, resumeGame, finishGame, holeIndex, holeScores } =
    useScoreState();
  const { selectTab } = useAppNavigation();

  if (!isPaused) {
    return null;
  }

  const hole = HOLES[holeIndex];
  const totalStrokes = holeScores.reduce((sum, s) => sum + s.strokes, 0);

  const saveAndExit = () => {
    resumeGame();
    selectTab('Events');
  };

  const endGame = () => {
    resumeGame();
    finishGame();
  };

  return (
    <View style={styles.GamePausedModalScrim}>
      <View style={styles.GamePausedModalCard}>
        <Text style={styles.GamePausedModalTitle}>Game Paused</Text>
        <Text style={styles.GamePausedModalSubtitle}>
          Hole {hole.number} of {HOLES.length} · {totalStrokes} strokes so far
        </Text>

        <TouchableOpacity
          style={styles.GamePausedModalPrimaryBtnWrap}
          onPress={resumeGame}
        >
          <LinearGradient
            colors={[Colors.goldLight, Colors.gold]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.GamePausedModalPrimaryBtn}
          >
            <Text style={styles.GamePausedModalPrimaryBtnText}>
              Resume Game
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.GamePausedModalSecondaryBtn}
          onPress={saveAndExit}
        >
          <Text style={styles.GamePausedModalSecondaryBtnText}>
            Save and Exit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.GamePausedModalDangerBtn}
          onPress={endGame}
        >
          <Text style={styles.GamePausedModalDangerBtnText}>End Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  GamePausedModalScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.scrim,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  GamePausedModalCard: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.goldSoftBorder,
    borderRadius: 22,
    paddingVertical: 26,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  GamePausedModalTitle: {
    fontFamily: Fonts.headingSemiBold,
    fontSize: 19,
    color: Colors.ivory,
    marginBottom: 8,
  },

  GamePausedModalSubtitle: {
    fontSize: 12.5,
    color: Colors.textFainter,
    marginBottom: 22,
    textAlign: 'center',
  },
  GamePausedModalPrimaryBtnWrap: {
    width: '100%',
    marginBottom: 12,
  },
  GamePausedModalPrimaryBtn: {
    height: 43,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  GamePausedModalPrimaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.buttonText,
  },
  GamePausedModalSecondaryBtn: {
    width: '100%',
    height: 41.5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.goldSoftBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  GamePausedModalSecondaryBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.goldLight,
  },

  GamePausedModalDangerBtn: {
    width: '100%',
    height: 41.5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(196,90,70,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  GamePausedModalDangerBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e08876',
  },
});
