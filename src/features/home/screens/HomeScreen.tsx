/**
 * HomeScreen
 * Thin orchestrator composing home page sections
 */

import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Header } from '../components/Header';
import { CreateOrderCTA } from '../components/CreateOrderCTA';
import Banner from '../components/Banner';
import { EventCountdownBanner } from '@src/features/events';
import { WhatsAppButton } from '../components/WhatsAppButton';
import {
  HeroSection,
  DashboardBanner,
  StatsStrip,
  ServiceShowcase,
  ProcessTimeline,
  BenefitsGrid,
  CertificateVerifier,
  PartnersStrip,
} from '../components/sections';
import { useHomeScreen } from './hooks/useHomeScreen';
import { getStyles } from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  const { token, firstName, whatsappStyle, scrollHandler, handlers } = useHomeScreen();
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeroSection />
        <EventCountdownBanner />
        <StatsStrip />
        <ServiceShowcase onServicePress={handlers.handleServicePress} />
        <Banner />
        {token && <CreateOrderCTA onPress={handlers.handleCreateOrderPress} />}
        {token && <DashboardBanner firstName={firstName} onPress={handlers.handleDashboardPress} />}
        <ProcessTimeline />
        <CertificateVerifier />
        <BenefitsGrid />
        <PartnersStrip />
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>

      <WhatsAppButton animatedStyle={whatsappStyle} />
    </SafeAreaView>
  );
};

export default HomeScreen;
