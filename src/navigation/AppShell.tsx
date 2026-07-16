import React from 'react';

import {IntroVideoScreen} from '../screens/IntroVideoScreen';
import {LoaderScreen} from '../screens/LoaderScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {MainShell} from './MainShell';
import {useAppNavigation} from './NavigationContext';

export function AppShell() {
  const {phase, finishLoader, finishIntroVideo, finishOnboarding} = useAppNavigation();

  if (phase === 'Loader') {
    return <LoaderScreen onFinish={finishLoader} />;
  }

  if (phase === 'IntroVideo') {
    return <IntroVideoScreen onFinish={finishIntroVideo} />;
  }

  if (phase === 'Onboarding') {
    return <OnboardingScreen onFinish={finishOnboarding} />;
  }

  return <MainShell />;
}
