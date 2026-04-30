/**
 * useAppBootstrap - App initialization hook
 * Handles: font loading, splash screen, translations
 */

import { useState, useEffect, useCallback } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { registerTranslation, enGB, fr } from 'react-native-paper-dates';
import { initSentry } from '@src/services/sentry';
import { initMixpanel } from '@src/config/Analytic';

// Register translations for react-native-paper-dates
registerTranslation('en', enGB);
registerTranslation('fr', fr);

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// One-time initializations (module scope, not hook)
let initialized = false;
const runOneTimeInit = () => {
  if (initialized) return;
  initialized = true;
  initSentry();
  initMixpanel();
};

export const useAppBootstrap = () => {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    runOneTimeInit();

    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require('../../../assets/fonts/Roboto-Black.ttf'),
          blackItalic: require('../../../assets/fonts/Roboto-BlackItalic.ttf'),
          bold: require('../../../assets/fonts/Roboto-Bold.ttf'),
          boldItalic: require('../../../assets/fonts/Roboto-BoldItalic.ttf'),
          italic: require('../../../assets/fonts/Roboto-Italic.ttf'),
          light: require('../../../assets/fonts/Roboto-Light.ttf'),
          lightItalic: require('../../../assets/fonts/Roboto-LightItalic.ttf'),
          medium: require('../../../assets/fonts/Roboto-Medium.ttf'),
          mediumItalic: require('../../../assets/fonts/Roboto-MediumItalic.ttf'),
          regular: require('../../../assets/fonts/Roboto-Regular.ttf'),
          thin: require('../../../assets/fonts/Roboto-Thin.ttf'),
          thinItalic: require('../../../assets/fonts/Roboto-ThinItalic.ttf'),
        });
      } catch (error) {
        console.log('[AppBootstrap] Font loading error:', error);
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  return { appIsLoaded, onLayout };
};
