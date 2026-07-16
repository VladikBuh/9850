import React, {useEffect, useRef} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';

interface Props {
  index?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const STEP_DELAY_MS = 45;
const MAX_DELAY_MS = 300;
const DURATION_MS = 280;

export function FadeInItem({index = 0, style, children}: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = Math.min(index * STEP_DELAY_MS, MAX_DELAY_MS);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: DURATION_MS,
      delay,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 0],
              }),
            },
          ],
        },
      ]}>
      {children}
    </Animated.View>
  );
}
