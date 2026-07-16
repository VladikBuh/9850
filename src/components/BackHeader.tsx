import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Fonts } from '../constants/theme';
import { Colors } from '../theme/colors';

import { AppIcon } from './icons/AppIcon';

interface Props {
  title: string;
  onBack: () => void;
  eyebrow?: string;
}

export function BackHeader({ title, onBack, eyebrow }: Props) {
  return (
    <View style={styles.BackHeaderContainer}>
      <TouchableOpacity style={styles.BackHeaderButton} onPress={onBack}>
        <AppIcon name="chevronLeft" size={9} />
      </TouchableOpacity>
      <View style={styles.BackHeaderTextWrap}>
        {eyebrow && <Text style={styles.BackHeaderEyebrow}>{eyebrow}</Text>}
        <Text style={styles.BackHeaderTitle}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BackHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    gap: 14,
  },

  BackHeaderButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#181c22',
    borderWidth: 1,
    borderColor: Colors.goldSoftBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BackHeaderTextWrap: {
    flex: 1,
  },
  BackHeaderEyebrow: {
    fontSize: 10.5,
    color: Colors.goldLight,
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  BackHeaderTitle: {
    fontFamily: Fonts.headingSemiBold,
    fontSize: 20,
    color: Colors.ivory,
  },
});
