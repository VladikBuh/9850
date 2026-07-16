import React, { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { BackHeader } from '../../components/BackHeader';
import { Fonts } from '../../constants/theme';
import { HOLES } from '../../data/holes';

import { useOverlayAnimation } from '../../hooks/useOverlayAnimation';
import { useAppNavigation } from '../../navigation/NavigationContext';

import { useScoreState } from '../../navigation/ScoreContext';
import { Colors } from '../../theme/colors';

export function HoleDetailScreen() {
  const { holeDetail, closeHoleDetail, openHoleDetail, selectTab } =
    useAppNavigation();
  const { jumpToHole } = useScoreState();
  const { renderedValue, animatedStyle } = useOverlayAnimation(holeDetail);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (holeDetail) {
      setAdded(false);
    }
  }, [holeDetail]);

  if (!renderedValue) {
    return null;
  }

  const hole = renderedValue;
  const index = HOLES.findIndex(h => h.number === hole.number);
  const previousHole = HOLES[(index - 1 + HOLES.length) % HOLES.length];
  const nextHole = HOLES[(index + 1) % HOLES.length];

  const addToCurrentGame = () => {
    jumpToHole(index);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeHoleDetail();
      selectTab('Score');
    }, 700);
  };

  return (
    <Animated.View style={[styles.HoleDetailScreenContainer, animatedStyle]}>
      <BackHeader title={`Hole ${hole.number}`} onBack={closeHoleDetail} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.HoleDetailScreenBody}
      >
        <Image
          source={require('../../assets/golf-at-hole-hero.png')}
          style={styles.HoleDetailScreenImage}
          resizeMode="cover"
        />

        <View style={styles.HoleDetailScreenStatsGrid}>
          <View style={styles.HoleDetailScreenStatCard}>
            <Text style={styles.HoleDetailScreenStatLabel}>PAR</Text>
            <Text style={styles.HoleDetailScreenStatValue}>{hole.par}</Text>
          </View>
          <View style={styles.HoleDetailScreenStatCard}>
            <Text style={styles.HoleDetailScreenStatLabel}>DISTANCE</Text>
            <Text style={styles.HoleDetailScreenStatValue}>
              {hole.yards} yds
            </Text>
          </View>
          <View style={styles.HoleDetailScreenStatCard}>
            <Text style={styles.HoleDetailScreenStatLabel}>HANDICAP INDEX</Text>
            <Text style={styles.HoleDetailScreenStatValue}>
              {hole.handicapIndex}
            </Text>
          </View>
          <View style={styles.HoleDetailScreenStatCard}>
            <Text style={styles.HoleDetailScreenStatLabel}>TERRAIN</Text>
            <Text style={styles.HoleDetailScreenStatValueSmall}>
              {hole.terrain}
            </Text>
          </View>
        </View>

        <Text style={styles.HoleDetailScreenDescription}>
          {hole.description}
        </Text>

        <Text style={styles.HoleDetailScreenSectionLabel}>Strategy</Text>
        <Text style={styles.HoleDetailScreenTip}>
          <Text style={styles.HoleDetailScreenTipLabel}>Beginner tip: </Text>
          {hole.beginnerTip}
        </Text>
        <Text style={styles.HoleDetailScreenTip}>
          <Text style={styles.HoleDetailScreenTipLabel}>Advanced tip: </Text>
          {hole.advancedTip}
        </Text>

        <View style={styles.HoleDetailScreenNavRow}>
          <TouchableOpacity
            style={styles.HoleDetailScreenNavBtn}
            onPress={() => openHoleDetail(previousHole)}
          >
            <Text style={styles.HoleDetailScreenNavBtnText}>Previous Hole</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.HoleDetailScreenNavBtn}
            onPress={() => openHoleDetail(nextHole)}
          >
            <Text style={styles.HoleDetailScreenNavBtnText}>Next Hole</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={addToCurrentGame}
          disabled={added}
        >
          <LinearGradient
            colors={[Colors.goldLight, Colors.gold]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.HoleDetailScreenCta}
          >
            <Text style={styles.HoleDetailScreenCtaText}>
              {added ? 'Added ✓' : 'Add to Current Game'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  HoleDetailScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
  },
  HoleDetailScreenBody: {
    paddingHorizontal: 18,
    paddingBottom: 32,
  },

  HoleDetailScreenImage: {
    width: '100%',
    height: 140,
    borderRadius: 19,
    marginBottom: 18,
  },

  HoleDetailScreenStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  HoleDetailScreenStatCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 12,
  },
  HoleDetailScreenStatLabel: {
    fontSize: 10,
    color: Colors.textFaint,
    marginBottom: 8,
  },

  HoleDetailScreenStatValue: {
    fontFamily: Fonts.headingSemiBold,
    fontSize: 16,
    color: Colors.ivory,
  },
  HoleDetailScreenStatValueSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.ivory,
  },
  HoleDetailScreenDescription: {
    fontSize: 12.5,
    lineHeight: 20,
    color: Colors.ivoryMuted,
    marginBottom: 20,
  },

  HoleDetailScreenSectionLabel: {
    fontSize: 12,
    color: Colors.textFaint,
    marginBottom: 12,
  },
  HoleDetailScreenTip: {
    fontSize: 12.5,
    lineHeight: 19.375,
    color: Colors.ivoryMuted,
    marginBottom: 12,
  },
  HoleDetailScreenTipLabel: {
    color: Colors.ivoryMuted,
    fontWeight: '700',
  },
  HoleDetailScreenNavRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    marginBottom: 12,
  },

  HoleDetailScreenNavBtn: {
    flex: 1,
    height: 41,
    borderRadius: 14,
    backgroundColor: '#1b1f27',
    borderWidth: 1,
    borderColor: 'rgba(233,205,110,0.26)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HoleDetailScreenNavBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.ivory,
  },

  HoleDetailScreenCta: {
    height: 42.5,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  HoleDetailScreenCtaText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.buttonText,
  },
});
