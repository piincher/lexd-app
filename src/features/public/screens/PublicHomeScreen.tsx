/**
 * PublicHomeScreen - V2 Architecture
 * 
 * Landing screen for non-authenticated users.
 * Provides access to public features and clear login CTA.
 * 
 * Features:
 * - Quick tracking (no login required)
 * - Company information
 * - Shipping service overview
 * - Contact information
 * - Clear login/registration CTA
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import {
  Text,
  Button,
  Surface,
  TextInput,
  useTheme,
  IconButton,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { MaterialCommunityIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '@src/constants/Colors';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { PublicNavigationProp } from '@src/navigation/types';
import { usePublicTracking } from '../hooks/usePublicTracking';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

// ============================================
// PARTNER LOGOS
// ============================================

const PARTNER_LOGOS = [
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png',
];

// ============================================
// SERVICE CARDS DATA
// ============================================

const SERVICES = [
  {
    id: 'air',
    icon: 'plane',
    title: 'Fret Aérien',
    description: 'Livraison rapide en 2-3 semaines avec suivi en temps réel',
    color: '#4A90E2',
    features: ['2-3 semaines', 'Suivi temps réel', 'Idéal pour petits colis'],
  },
  {
    id: 'sea',
    icon: 'ship',
    title: 'Fret Maritime',
    description: 'Solution économique pour gros volumes (45-60 jours)',
    color: '#1ED7B5',
    features: ['45-60 jours', 'Meilleur prix/KG', 'Parfait pour bulk'],
  },
];

// ============================================
// WHY CHOOSE US DATA
// ============================================

const WHY_CHOOSE_US = [
  {
    icon: 'clock-check',
    title: '10+ Ans',
    subtitle: "D'expérience",
    description: 'Service logistique fiable depuis 2013',
  },
  {
    icon: 'shield-check',
    title: '100%',
    subtitle: 'Assuré',
    description: 'Protection complète de vos marchandises',
  },
  {
    icon: 'headset',
    title: '24/7',
    subtitle: 'Support',
    description: 'Assistance client disponible à tout moment',
  },
  {
    icon: 'cash-multiple',
    title: 'Meilleurs',
    subtitle: 'Tarifs',
    description: 'Prix compétitifs sans compromis qualité',
  },
];

// ============================================
// HOW IT WORKS DATA
// ============================================

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: 'phone',
    title: 'Contactez-nous',
    description: 'Choisissez votre méthode de livraison préférée',
  },
  {
    step: '02',
    icon: 'warehouse',
    title: 'Adresse Chine',
    description: 'Recevez notre adresse d\'entrepôt en Chine',
  },
  {
    step: '03',
    icon: 'package-variant',
    title: 'Envoyez vos colis',
    description: 'Faites livrer vos achats à notre entrepôt',
  },
  {
    step: '04',
    icon: 'truck-delivery',
    title: 'Livraison Mali',
    description: 'Nous nous occupons du transport jusqu\'à vous',
  },
];

// ============================================
// COMPONENTS
// ============================================

const ServiceCard: React.FC<{
  service: typeof SERVICES[0];
  index: number;
  onPress: () => void;
}> = ({ service, index, onPress }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200).springify()}
      style={styles.serviceCardContainer}
    >
      <Pressable onPress={onPress} style={styles.serviceCardPressable}>
        <Surface style={[styles.serviceCard, { borderLeftColor: service.color }]}>
          <View style={[styles.serviceIconContainer, { backgroundColor: `${service.color}15` }]}>
            <FontAwesome6 name={service.icon} size={32} color={service.color} />
          </View>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
          <View style={styles.serviceFeatures}>
            {service.features.map((feature, idx) => (
              <View key={idx} style={styles.featureBadge}>
                <MaterialCommunityIcons name="check-circle" size={12} color={service.color} />
                <Text style={[styles.featureText, { color: service.color }]}>{feature}</Text>
              </View>
            ))}
          </View>
        </Surface>
      </Pressable>
    </Animated.View>
  );
};

const WhyChooseCard: React.FC<{
  item: typeof WHY_CHOOSE_US[0];
  index: number;
}> = ({ item, index }) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100).springify()}
      style={styles.whyChooseCard}
    >
      <Surface style={styles.whyChooseSurface}>
        <MaterialCommunityIcons name={item.icon as any} size={32} color={COLORS.blue} />
        <Text style={styles.whyChooseTitle}>{item.title}</Text>
        <Text style={styles.whyChooseSubtitle}>{item.subtitle}</Text>
        <Text style={styles.whyChooseDescription}>{item.description}</Text>
      </Surface>
    </Animated.View>
  );
};

const HowItWorksStep: React.FC<{
  step: typeof HOW_IT_WORKS[0];
  index: number;
}> = ({ step, index }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 150).springify()}
      style={styles.howItWorksStep}
    >
      <View style={styles.stepNumberContainer}>
        <Text style={styles.stepNumber}>{step.step}</Text>
      </View>
      <View style={styles.stepContent}>
        <View style={styles.stepIconContainer}>
          <MaterialCommunityIcons name={step.icon as any} size={24} color={COLORS.blue} />
        </View>
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

// ============================================
// MAIN SCREEN
// ============================================

export const PublicHomeScreen: React.FC = () => {
  const navigation = useNavigation<PublicNavigationProp>();
  const theme = useTheme();
  const scrollY = useSharedValue(0);
  
  const [trackingNumber, setTrackingNumber] = useState('');
  const { track, isLoading } = usePublicTracking();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [0, 1], 'clamp'),
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 100], [-20, 0], 'clamp'),
      },
    ],
  }));

  // Navigation handlers
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;
    
    const result = await track(trackingNumber.trim());
    if (result) {
      navigation.navigate('PublicTrackingResult', {
        trackingNumber: trackingNumber.trim(),
        data: result,
      });
    }
  };

  const handleServicePress = (serviceId: string) => {
    navigation.navigate('ShippingInfo');
  };

  const handleAboutUs = () => {
    navigation.navigate('AboutUs');
  };

  const handleContactUs = () => {
    navigation.navigate('ContactUs');
  };

  const handleFAQ = () => {
    navigation.navigate('FAQ');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/223XXXXXXXX');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Floating Header */}
      <Animated.View style={[styles.floatingHeader, headerStyle]}>
        <Text style={styles.floatingHeaderTitle}>ChinaLink Express</Text>
        <Button mode="contained" onPress={handleLogin} compact>
          Connexion
        </Button>
      </Animated.View>

      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Vos Marchandises</Text>
            <Text style={styles.heroTitleAccent}>de Chine au Mali</Text>
            <Text style={styles.heroSubtitle}>
              Service de fret aérien et maritime fiable, rapide et sécurisé
            </Text>
            
            {/* Tracking Input */}
            <Surface style={styles.trackingContainer}>
              <Text style={styles.trackingLabel}>Suivez votre envoi</Text>
              <View style={styles.trackingInputContainer}>
                <TextInput
                  mode="outlined"
                  placeholder="Numéro de suivi (ex: GS-123456)"
                  value={trackingNumber}
                  onChangeText={setTrackingNumber}
                  style={styles.trackingInput}
                  left={<TextInput.Icon icon="magnify" />}
                  outlineStyle={styles.trackingInputOutline}
                />
                <Button
                  mode="contained"
                  onPress={handleTrack}
                  loading={isLoading}
                  disabled={!trackingNumber.trim() || isLoading}
                  style={styles.trackButton}
                  contentStyle={styles.trackButtonContent}
                >
                  Suivre
                </Button>
              </View>
              <Text style={styles.trackingHint}>
                Pas besoin de compte pour suivre votre envoi
              </Text>
            </Surface>
          </View>
        </Animated.View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos Services</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesScroll}
          >
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onPress={() => handleServicePress(service.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* How It Works Section */}
        <View style={[styles.section, styles.howItWorksSection]}>
          <Text style={styles.sectionTitle}>Comment Ça Marche ?</Text>
          <View style={styles.howItWorksContainer}>
            {HOW_IT_WORKS.map((step, index) => (
              <HowItWorksStep key={step.step} step={step} index={index} />
            ))}
          </View>
        </View>

        {/* Why Choose Us Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pourquoi Nous Choisir ?</Text>
          <View style={styles.whyChooseGrid}>
            {WHY_CHOOSE_US.map((item, index) => (
              <WhyChooseCard key={item.title} item={item} index={index} />
            ))}
          </View>
        </View>

        {/* Partners Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos Partenaires</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.partnersScroll}
          >
            {PARTNER_LOGOS.map((logo, index) => (
              <Animated.View
                key={index}
                entering={FadeInRight.delay(index * 100).springify()}
                style={styles.partnerLogoContainer}
              >
                <Image source={{ uri: logo }} style={styles.partnerLogo} />
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Links Section */}
        <View style={[styles.section, styles.quickLinksSection]}>
          <Text style={styles.sectionTitle}>Liens Rapides</Text>
          <View style={styles.quickLinksGrid}>
            <Pressable onPress={handleAboutUs} style={styles.quickLinkItem}>
              <Surface style={styles.quickLinkSurface}>
                <MaterialCommunityIcons name="information" size={28} color={COLORS.blue} />
                <Text style={styles.quickLinkText}>À Propos</Text>
              </Surface>
            </Pressable>
            <Pressable onPress={handleContactUs} style={styles.quickLinkItem}>
              <Surface style={styles.quickLinkSurface}>
                <MaterialCommunityIcons name="phone" size={28} color={COLORS.blue} />
                <Text style={styles.quickLinkText}>Contact</Text>
              </Surface>
            </Pressable>
            <Pressable onPress={handleFAQ} style={styles.quickLinkItem}>
              <Surface style={styles.quickLinkSurface}>
                <MaterialCommunityIcons name="frequently-asked-questions" size={28} color={COLORS.blue} />
                <Text style={styles.quickLinkText}>FAQ</Text>
              </Surface>
            </Pressable>
            <Pressable onPress={handleWhatsApp} style={styles.quickLinkItem}>
              <Surface style={styles.quickLinkSurface}>
                <FontAwesome6 name="whatsapp" size={28} color="#25D366" />
                <Text style={styles.quickLinkText}>WhatsApp</Text>
              </Surface>
            </Pressable>
          </View>
        </View>

        {/* CTA Section */}
        <Animated.View
          entering={FadeInUp.delay(400).springify()}
          style={styles.ctaSection}
        >
          <Surface style={styles.ctaSurface}>
            <Text style={styles.ctaTitle}>Prêt à Expédier ?</Text>
            <Text style={styles.ctaSubtitle}>
              Créez un compte pour accéder à toutes nos fonctionnalités
            </Text>
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.ctaButton}
              contentStyle={styles.ctaButtonContent}
              icon={({ size, color }) => (
                <MaterialCommunityIcons name="arrow-right" size={size} color={color} />
              )}
            >
              Se Connecter / S'inscrire
            </Button>
            <Text style={styles.ctaHint}>
              Déjà client ? Connectez-vous pour voir vos marchandises
            </Text>
          </Surface>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 ChinaLink Express. Tous droits réservés.
          </Text>
          <Text style={styles.footerContact}>
            contact@chinalinkexpress.com | +223 XX XX XX XX
          </Text>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </AnimatedScrollView>

      {/* WhatsApp FAB */}
      <Pressable onPress={handleWhatsApp} style={styles.whatsappFab}>
        <Surface style={styles.whatsappFabSurface}>
          <FontAwesome6 name="whatsapp" size={28} color="#25D366" />
        </Surface>
      </Pressable>
    </SafeAreaView>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  
  // Floating Header
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Theme.neutral.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    zIndex: 100,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  floatingHeaderTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: COLORS.blue,
  },
  
  // Scroll Content
  scrollContent: {
    paddingBottom: Theme.spacing['4xl'],
  },
  
  // Hero Section
  heroSection: {
    backgroundColor: COLORS.blue,
    paddingTop: Theme.spacing['4xl'],
    paddingBottom: Theme.spacing['3xl'],
    borderBottomLeftRadius: Theme.radius['2xl'],
    borderBottomRightRadius: Theme.radius['2xl'],
  },
  heroContent: {
    paddingHorizontal: Theme.spacing.lg,
  },
  heroTitle: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Theme.neutral.white,
  },
  heroTitleAccent: {
    fontFamily: Fonts.black,
    fontSize: 32,
    color: '#1ED7B5',
    marginBottom: Theme.spacing.md,
  },
  heroSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: `${Theme.neutral.white}CC`,
    marginBottom: Theme.spacing.xl,
    lineHeight: 24,
  },
  
  // Tracking
  trackingContainer: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    backgroundColor: Theme.neutral.white,
  },
  trackingLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  trackingInputContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  trackingInput: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
    height: 48,
  },
  trackingInputOutline: {
    borderRadius: Theme.radius.md,
  },
  trackButton: {
    borderRadius: Theme.radius.md,
    justifyContent: 'center',
  },
  trackButtonContent: {
    height: 48,
  },
  trackingHint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.sm,
    textAlign: 'center',
  },
  
  // Section
  section: {
    marginTop: Theme.spacing['2xl'],
    paddingHorizontal: Theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.lg,
  },
  
  // Services
  servicesScroll: {
    gap: Theme.spacing.md,
    paddingRight: Theme.spacing.lg,
  },
  serviceCardContainer: {
    width: SCREEN_WIDTH * 0.75,
  },
  serviceCardPressable: {
    flex: 1,
  },
  serviceCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    borderLeftWidth: 4,
    height: 200,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  serviceTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  serviceDescription: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
    marginBottom: Theme.spacing.md,
    lineHeight: 20,
  },
  serviceFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[100],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.sm,
    gap: 4,
  },
  featureText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
  },
  
  // How It Works
  howItWorksSection: {
    backgroundColor: Theme.neutral[100],
    marginHorizontal: 0,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing['2xl'],
  },
  howItWorksContainer: {
    gap: Theme.spacing.lg,
  },
  howItWorksStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumberContainer: {
    width: 50,
    height: 50,
    borderRadius: Theme.radius.lg,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  stepNumber: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.neutral.white,
  },
  stepContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
  },
  stepIconContainer: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.md,
    backgroundColor: `${COLORS.blue}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.neutral[800],
    marginBottom: 2,
  },
  stepDescription: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Theme.neutral[500],
  },
  
  // Why Choose Us
  whyChooseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  whyChooseCard: {
    width: (SCREEN_WIDTH - Theme.spacing.lg * 2 - Theme.spacing.md) / 2,
  },
  whyChooseSurface: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    alignItems: 'center',
  },
  whyChooseTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: COLORS.blue,
    marginTop: Theme.spacing.sm,
  },
  whyChooseSubtitle: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.xs,
  },
  whyChooseDescription: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
    textAlign: 'center',
  },
  
  // Partners
  partnersScroll: {
    gap: Theme.spacing.xl,
    paddingRight: Theme.spacing.lg,
  },
  partnerLogoContainer: {
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerLogo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  
  // Quick Links
  quickLinksSection: {
    backgroundColor: Theme.neutral[100],
    marginHorizontal: 0,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing['2xl'],
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  quickLinkItem: {
    width: (SCREEN_WIDTH - Theme.spacing.lg * 2 - Theme.spacing.md * 3) / 4,
  },
  quickLinkSurface: {
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    alignItems: 'center',
    aspectRatio: 1,
    justifyContent: 'center',
  },
  quickLinkText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Theme.neutral[600],
    marginTop: Theme.spacing.xs,
  },
  
  // CTA Section
  ctaSection: {
    marginTop: Theme.spacing['2xl'],
    paddingHorizontal: Theme.spacing.lg,
  },
  ctaSurface: {
    padding: Theme.spacing.xl,
    borderRadius: Theme.radius.xl,
    alignItems: 'center',
  },
  ctaTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  ctaSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
  },
  ctaButton: {
    width: '100%',
    borderRadius: Theme.radius.lg,
  },
  ctaButtonContent: {
    height: 50,
  },
  ctaHint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[400],
    marginTop: Theme.spacing.md,
  },
  
  // Footer
  footer: {
    marginTop: Theme.spacing['3xl'],
    paddingHorizontal: Theme.spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[400],
  },
  footerContact: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[400],
    marginTop: Theme.spacing.xs,
  },
  
  // Bottom Spacing
  bottomSpacing: {
    height: Theme.spacing['4xl'],
  },
  
  // WhatsApp FAB
  whatsappFab: {
    position: 'absolute',
    bottom: Theme.spacing.xl,
    right: Theme.spacing.lg,
  },
  whatsappFabSurface: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default PublicHomeScreen;
