import {Platform} from 'react-native';

export const DESIGN_WIDTH = 393;
export const DESIGN_HEIGHT = 852;

export const Fonts = {
  // iOS resolves fontFamily by the font's internal PostScript name;
  // Android resolves it by the asset filename — they differ for this font.
  headingSemiBold: Platform.select({
    ios: 'Fraunces72pt-SemiBold',
    default: 'Fraunces_72pt-SemiBold',
  }),
};
