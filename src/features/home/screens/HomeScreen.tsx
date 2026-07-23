/**
 * HomeScreen
 * Guest home — an index-first entry point into the LEXD journey.
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Header } from '../components/Header';
import { WhatsAppButton } from '../components/WhatsAppButton';
import {
  HomeAccountPrompt,
  HomeActionIndex,
  HomeFreightLanes,
  HomeIntro,
  HomeJourney,
  HomeServicesAndContacts,
} from '../components/redesign';
import { useHomeScreen } from './hooks/useHomeScreen';
import { getStyles } from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  const { whatsappStyle, scrollHandler, handlers } = useHomeScreen();
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
      >
        <HomeIntro />
        <HomeActionIndex
          onTrack={handlers.handleTrackPress}
          onPreview={handlers.handlePreviewPress}
          onLogin={handlers.handleLoginPress}
        />
        <HomeFreightLanes onSelect={handlers.handleFreightPress} />
        <HomeJourney />
        <HomeServicesAndContacts onContact={handlers.handleContactPress} />
        <HomeAccountPrompt onPress={handlers.handleLoginPress} />
      </Animated.ScrollView>

      <WhatsAppButton animatedStyle={whatsappStyle} />
    </SafeAreaView>
  );
};

export default HomeScreen;
