/**
 * HomeScreen
 * Thin orchestrator composing home page sections
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import type { navigationProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAuth } from '@src/store/Auth';
import { Header } from '../components/Header';
import { CreateOrderCTA } from '../components/CreateOrderCTA';
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
  NuvotechSection,
} from '../components/sections';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<navigationProps>();
  const { colors } = useAppTheme();
  const token = useAuth((state) => state.token);
  const firstName = useAuth((state) => state.user?.firstName);
  const { whatsappStyle, scrollHandler } = useHomeScreen();

  const handleServicePress = (route: string) => {
    if (route === 'ChooseShippingMethod') {
      navigation.navigate('ChooseShippingMethod');
    }
  };
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
        {token && <CreateOrderCTA onPress={() => navigation.navigate('ChooseShippingMethod')} />}
        {token && <DashboardBanner firstName={firstName} onPress={handleDashboardPress} />}
        <StatsStrip />
        <ServiceShowcase onServicePress={handleServicePress} />
        <ProcessTimeline />
        <BenefitsGrid />
        <ComparisonCard />
        <CertificateVerifier />
        <PartnersStrip />
        <NuvotechSection />
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
