import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

const DURATION = 220;

export function useOverlayAnimation<T>(value: T | null) {
  const [renderedValue, setRenderedValue] = useState<T | null>(value);
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    if (value) {
      setRenderedValue(value);
      Animated.timing(progress, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: DURATION,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          setRenderedValue(null);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const animatedStyle = {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  };

  return {renderedValue, animatedStyle};
}
