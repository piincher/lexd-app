/**
 * HomeScreen
 * Thin orchestrator composing home page sections
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers';
import { useAuth } from '@src/store/Auth';
import { Header } from '../components/Header';
import Banner from '../components/Banner';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { useHomeScreen } from '../hooks/useHomeScreen';
import {
  HeroSection,
  DashboardBanner,
  StatsStrip,
  ServiceShowcase,
  ProcessTimeline,
  BenefitsGrid,
  ComparisonCard,
  CertificateVerifier,
  PartnersStrip,
} from '../components/sections';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useAppTheme();
  const token = useAuth((state) => state.token);
  const firstName = useAuth((state) => state.user?.firstName);
  const { whatsappStyle, scrollHandler } = useHomeScreen();

  const handleServicePress = (route: string) => navigation.navigate(route);
  const handleDashboardPress = () => navigation.navigate('CustomerDashboard');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['top']}>
      <Header />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeroSection />
        <Banner />
        {token && <DashboardBanner firstName={firstName} onPress={handleDashboardPress} />}
        <StatsStrip />
        <ServiceShowcase onServicePress={handleServicePress} />
        <ProcessTimeline />
        <BenefitsGrid />
        <ComparisonCard />
        <CertificateVerifier />
        <PartnersStrip />
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>

      <WhatsAppButton animatedStyle={whatsappStyle} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default HomeScreen;
