import React from 'react';
import Svg, {Path} from 'react-native-svg';

export type AppIconName = 'chevronLeft' | 'bell' | 'checkmark' | 'sparkle' | 'star' | 'starFilled';

interface Props {
  name: AppIconName;
  size?: number;
  color?: string;
}

const ICONS: Record<
  AppIconName,
  {viewBox: string; paths: string[]; strokeWidth?: number; fill?: boolean}
> = {
  chevronLeft: {
    viewBox: '0 0 9 16',
    paths: ['M8 1L1 8L8 15'],
    strokeWidth: 2,
  },
  bell: {
    viewBox: '0 0 18 18',
    paths: [
      'M9 1.5C7.80653 1.5 6.66193 1.97411 5.81802 2.81802C4.97411 3.66193 4.5 4.80653 4.5 6V8.4C4.5 9 4.275 9.525 3.9 9.975L3 11.4C2.55 11.925 2.925 12.75 3.6 12.75H14.4C15.075 12.75 15.45 11.925 15 11.4L14.1 9.9C13.725 9.45 13.5 8.925 13.5 8.325V6C13.5 4.80653 13.0259 3.66193 12.182 2.81802C11.3381 1.97411 10.1935 1.5 9 1.5Z',
      'M7.125 14.25C7.125 14.7473 7.32254 15.2242 7.67417 15.5758C8.02581 15.9275 8.50272 16.125 9 16.125C9.49728 16.125 9.97419 15.9275 10.3258 15.5758C10.6775 15.2242 10.875 14.7473 10.875 14.25',
    ],
    strokeWidth: 1.2,
  },
  checkmark: {
    viewBox: '0 0 26 26',
    paths: ['M5.41667 13.5417L10.2917 18.4167L20.5833 7.58333'],
    strokeWidth: 2.6,
  },
  sparkle: {
    viewBox: '0 0 18 18',
    paths: ['M9 1.5L10.8 6.6L15.75 8.25L10.8 9.9L9 15L7.2 9.9L2.25 8.25L7.2 6.6L9 1.5Z'],
    fill: true,
  },
  star: {
    viewBox: '0 0 24 24',
    paths: ['M12 2.5L15.09 9.26L22 10.27L17 15.14L18.18 22.02L12 18.77L5.82 22.02L7 15.14L2 10.27L8.91 9.26L12 2.5Z'],
    strokeWidth: 1.6,
  },
  starFilled: {
    viewBox: '0 0 24 24',
    paths: ['M12 2.5L15.09 9.26L22 10.27L17 15.14L18.18 22.02L12 18.77L5.82 22.02L7 15.14L2 10.27L8.91 9.26L12 2.5Z'],
    fill: true,
  },
};

export function AppIcon({name, size = 18, color = '#E9CD6E'}: Props) {
  const icon = ICONS[name];
  const [, , vw, vh] = icon.viewBox.split(' ');
  const width = size;
  const height = (size * Number(vh)) / Number(vw);

  return (
    <Svg width={width} height={height} viewBox={icon.viewBox} fill="none">
      {icon.paths.map((d, i) => (
        <Path
          key={i}
          d={d}
          stroke={icon.fill ? 'none' : color}
          fill={icon.fill ? color : 'none'}
          strokeWidth={icon.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}
