/**
 * PublicHomeScreen - V2 Architecture
 * 
 * Landing screen for non-authenticated users.
 * Provides access to public features and clear login CTA.
 */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { usePublicHomeScreen } from './PublicHome/hooks/usePublicHomeScreen';
import {
  FloatingHeader,
  HeroSection,
  ServicesSection,
  HowItWorksSection,
  WhyChooseSection,
  PartnersSection,
  QuickLinksSection,
  CTASection,
  Footer,
  WhatsAppFAB,
} from './PublicHome/components';
import { styles } from './PublicHome/PublicHomeScreen.styles';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const PublicHomeScreen: React.FC = () => {
  const {
    scrollY,
    scrollHandler,
    trackingNumber,
    setTrackingNumber,
    isLoading,
    handleLogin,
    handleTrack,
    handleServicePress,
    handleAboutUs,
    handleContactUs,
    handleFAQ,
    handleWhatsApp,
  } = usePublicHomeScreen();

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [0, 1], 'clamp'),
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 100], [-20, 0], 'clamp'),
      },
    ],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <FloatingHeader headerStyle={headerStyle} onLogin={handleLogin} />

      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection
          trackingNumber={trackingNumber}
          setTrackingNumber={setTrackingNumber}
          onTrack={handleTrack}
          isLoading={isLoading}
        />

        <ServicesSection onServicePress={handleServicePress} />

        <HowItWorksSection />

        <WhyChooseSection />

        <PartnersSection />

        <QuickLinksSection
          onAboutUs={handleAboutUs}
          onContactUs={handleContactUs}
          onFAQ={handleFAQ}
          onWhatsApp={handleWhatsApp}
        />

        <CTASection onLogin={handleLogin} />

        <Footer />

        <View style={styles.bottomSpacing} />
      </AnimatedScrollView>

      <WhatsAppFAB onPress={handleWhatsApp} />
    </SafeAreaView>
  );
};

export default PublicHomeScreen;
