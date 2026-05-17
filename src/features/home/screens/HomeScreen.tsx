/**
 * HomeScreen
 * Thin orchestrator composing home page sections
 */

import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { Header } from '../components/Header';
import { CreateOrderCTA } from '../components/CreateOrderCTA';
import Banner from '../components/Banner';
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
import { styles } from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  const { token, firstName, whatsappStyle, scrollHandler, handlers } = useHomeScreen();

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
        <Banner />
        {token && <CreateOrderCTA onPress={handlers.handleCreateOrderPress} />}
        {token && <DashboardBanner firstName={firstName} onPress={handlers.handleDashboardPress} />}
        <StatsStrip />
        <ServiceShowcase onServicePress={handlers.handleServicePress} />
        <ProcessTimeline />
        <BenefitsGrid />
        <CertificateVerifier />
        <PartnersStrip />
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>

      <WhatsAppButton animatedStyle={whatsappStyle} />
    </SafeAreaView>
  );
};

export default HomeScreen;
