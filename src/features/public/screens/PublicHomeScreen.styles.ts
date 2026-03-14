/**
 * PublicHomeScreen Styles
 * 
 * Shared styles for the PublicHomeScreen and its components.
 */

import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
    fontFamily: (Fonts as any).medium || (Fonts as any).meduim,
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
    fontFamily: (Fonts as any).medium || (Fonts as any).meduim,
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
    fontFamily: (Fonts as any).medium || (Fonts as any).meduim,
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
