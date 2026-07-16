import React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

import { Colors } from '../theme/colors';

interface Props {
  onFinish: () => void;
}

export function IntroVideoScreen({ onFinish }: Props) {
  return (
    <Video
      source={require('../assets/onboardingvideo.mp4')}
      style={styles.IntroVideoScreenPlayer}
      resizeMode="cover"
      muted
      playInBackground={false}
      onEnd={onFinish}
      onError={onFinish}
    />
  );
}

const styles = StyleSheet.create({
  IntroVideoScreenPlayer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
