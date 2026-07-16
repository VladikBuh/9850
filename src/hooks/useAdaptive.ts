import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';

import {DESIGN_HEIGHT, DESIGN_WIDTH} from '../constants/theme';

export function useAdaptive() {
  const {width, height} = useWindowDimensions();

  return useMemo(() => {
    const scale = (size: number) => (width / DESIGN_WIDTH) * size;
    const verticalScale = (size: number) => (height / DESIGN_HEIGHT) * size;

    return {
      width,
      height,
      scale,
      verticalScale,
    };
  }, [width, height]);
}
