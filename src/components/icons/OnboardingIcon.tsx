import React from 'react';
import Svg, {Path} from 'react-native-svg';

export type OnboardingIconName =
  | 'venueEvents'
  | 'courseMap'
  | 'scoreTracking'
  | 'golfLearning'
  | 'services';

interface Props {
  name: OnboardingIconName;
  size?: number;
  color?: string;
}

export function OnboardingIcon({name, size = 24, color = '#E9CD6E'}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {ICON_PATHS[name].map((d, i) => (
        <Path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}

const ICON_PATHS: Record<OnboardingIconName, string[]> = {
  venueEvents: [
    'M19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5Z',
    'M3 9.5H21M8 3V7M16 3V7',
  ],
  courseMap: [
    'M9 4L3 6V20L9 18L15 20L21 18V4L15 6L9 4Z',
    'M9 4V18M15 6V20',
  ],
  scoreTracking: ['M6 21V4', 'M6 4L18 7.5L6 11'],
  golfLearning: [
    'M4 5.5C4 4.7 4.7 4 5.5 4H12V20H5.5C5.10218 20 4.72064 19.842 4.43934 19.5607C4.15804 19.2794 4 18.8978 4 18.5V5.5Z',
    'M20 5.5C20 4.7 19.3 4 18.5 4H12V20H18.5C18.8978 20 19.2794 19.842 19.5607 19.5607C19.842 19.2794 20 18.8978 20 18.5V5.5Z',
  ],
  services: [
    'M12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8V11.2C6 12 5.7 12.7 5.2 13.3L4 15.2C3.4 15.9 3.9 17 4.8 17H19.2C20.1 17 20.6 15.9 20 15.2L18.8 13.2C18.3 12.6 18 11.9 18 11.1V8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2Z',
    'M9.5 19C9.5 19.663 9.76339 20.2989 10.2322 20.7678C10.7011 21.2366 11.337 21.5 12 21.5C12.663 21.5 13.2989 21.2366 13.7678 20.7678C14.2366 20.2989 14.5 19.663 14.5 19',
  ],
};
