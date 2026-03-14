/**
 * PublicHomeScreen - Landing page for non-authenticated users
 * Refactored from 893 lines to < 100 lines
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

import { Theme as AppTheme } from '@src/constants/Theme';
import { PublicNavigationProp } from '@src/navigations/type';
import { usePublicTracking } from '../../hooks/usePublicTracking';
import { usePublicHomeScroll } from '../../hooks/usePublicHomeScroll';
import { FloatingHeader } from '../../components/FloatingHeader';
import { HeroSection } from '../../components/HeroSection';
import { ServicesSection } from '../../components/ServicesSection';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { WhyChooseUsSection } from '../../components/WhyChooseUsSection';
import { PartnersSection } from '../../components/PartnersSection';
import { QuickLinksSection } from '../../components/QuickLinksSection';
import { TestimonialsSection } from '../../components/TestimonialsSection';
import { FAQSection } from '../../components/FAQSection';
import { CTASection } from '../../components/CTASection';
import { PublicFooter } from '../../components/PublicFooter';
import { WhatsAppFAB } from '../../components/WhatsAppFAB';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const PublicHomeScreen: React.FC = () => {
  const navigation = useNavigation<PublicNavigationProp>();
  const { scrollHandler, headerStyle } = usePublicHomeScroll();
  const [trackingNumber, setTrackingNumber] = useState('');
  const { track, isLoading } = usePublicTracking();

  const nav = {
    login: () => navigation.navigate('Login'),
    about: () => navigation.navigate('AboutUs'),
    contact: () => navigation.navigate('ContactUs'),
    faq: () => navigation.navigate('FAQ'),
    service: () => navigation.navigate('ShippingInfo'),
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;
    const result = await track(trackingNumber.trim());
    if (result) {
      navigation.navigate('PublicTrackingResult', { trackingNumber: trackingNumber.trim(), data: result });
    }
  };

  const handleWhatsApp = () => Linking.openURL('https://wa.me/223XXXXXXXX');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FloatingHeader style={headerStyle} onLoginPress={nav.login} />
      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection trackingNumber={trackingNumber} onTrackingChange={setTrackingNumber} onTrack={handleTrack} isLoading={isLoading} />
        <ServicesSection onServicePress={nav.service} />
        <HowItWorksSection />
        <WhyChooseUsSection />
        <PartnersSection />
        <QuickLinksSection onAboutPress={nav.about} onContactPress={nav.contact} onFAQPress={nav.faq} onWhatsAppPress={handleWhatsApp} />
        <TestimonialsSection />
        <FAQSection />
        <CTASection onPress={nav.login} />
        <PublicFooter onAboutPress={nav.about} onContactPress={nav.contact} onFAQPress={nav.faq} />
        <View style={styles.bottomSpacing} />
      </AnimatedScrollView>
      <WhatsAppFAB onPress={handleWhatsApp} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppTheme.neutral[50] },
  scrollContent: { paddingBottom: AppTheme.spacing['4xl'] },
  bottomSpacing: { height: AppTheme.spacing['4xl'] },
});

export default PublicHomeScreen;
