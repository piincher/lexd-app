import React from 'react';
import Animated from 'react-native-reanimated';
import { View } from 'react-native';
import { Screen } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGuestPreviewScreen } from './hooks/useGuestPreviewScreen';
import { useGuestPreviewScreenStyles } from './GuestPreviewScreen.styles';
import { AnimatedSection } from '../components/AnimatedSection';
import { GuestHero } from '../components/GuestHero';
import { GuestCommandCenter } from '../components/GuestCommandCenter';
import { GuestModeSelector } from '../components/GuestModeSelector';
import { GuestPrivacyNotice } from '../components/GuestPrivacyNotice';
import { DemoShipmentCard } from '../components/DemoShipmentCard';
import { DemoRouteBoard } from '../components/DemoRouteBoard';
import { DemoGoodsPreview } from '../components/DemoGoodsPreview';
import { DemoTimeline } from '../components/DemoTimeline';
import { DemoBenefitGrid } from '../components/DemoBenefitGrid';
import { DemoNotificationFeed } from '../components/DemoNotificationFeed';
import { DemoDocumentChecklist } from '../components/DemoDocumentChecklist';
import { DemoQuickActions } from '../components/DemoQuickActions';
import { DemoLockedFeatures } from '../components/DemoLockedFeatures';
import { GuestClientJourney } from '../components/GuestClientJourney';
import { GuestFaqList } from '../components/GuestFaqList';
import { GuestConversionCard } from '../components/GuestConversionCard';

export const GuestPreviewScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const {
    benefits,
    clientSteps,
    documents,
    faqs,
    goods,
    lockedFeatures,
    metrics,
    notifications,
    quickActions,
    shipments,
    selectedMode,
    selectedShipment,
    supportPhone,
    scrollRef,
    heroStyle,
    handlers,
  } = useGuestPreviewScreen();

  const styles = useGuestPreviewScreenStyles();

  return (
    <Screen scrollable={false} safeArea variant="plain" style={styles.screen}>
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <Animated.View style={heroStyle}>
          <GuestHero />
        </Animated.View>

        {/* ── Overview: metrics + privacy ── */}
        <AnimatedSection delay={100}>
          <GuestCommandCenter metrics={metrics} />
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <GuestPrivacyNotice />
        </AnimatedSection>

        {/* ── Shipment Preview ── */}
        <View style={[styles.band, { backgroundColor: colors.background.paper }]}>
          <AnimatedSection delay={100}>
            <GuestModeSelector
              shipments={shipments}
              selectedMode={selectedMode}
              onSelect={handlers.setSelectedMode}
            />
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <DemoShipmentCard shipment={selectedShipment} />
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <DemoRouteBoard shipment={selectedShipment} />
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <DemoGoodsPreview goods={goods} />
          </AnimatedSection>
          <AnimatedSection delay={500}>
            <DemoTimeline steps={selectedShipment.timeline} />
          </AnimatedSection>
        </View>

        {/* ── Benefits ── */}
        <AnimatedSection delay={100}>
          <DemoBenefitGrid benefits={benefits} />
        </AnimatedSection>

        {/* ── Activity: notifications + documents + actions ── */}
        <View style={[styles.band, { backgroundColor: colors.background.paper }]}>
          <AnimatedSection delay={100}>
            <DemoNotificationFeed notifications={notifications} />
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <DemoDocumentChecklist documents={documents} />
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <DemoQuickActions actions={quickActions} onAction={handlers.handleAction} />
          </AnimatedSection>
        </View>

        {/* ── Locked features ── */}
        <AnimatedSection delay={100}>
          <DemoLockedFeatures features={lockedFeatures} />
        </AnimatedSection>

        {/* ── Client journey ── */}
        <View style={[styles.band, { backgroundColor: colors.background.paper }]}>
          <AnimatedSection delay={100}>
            <GuestClientJourney steps={clientSteps} />
          </AnimatedSection>
        </View>

        {/* ── FAQ ── */}
        <AnimatedSection delay={100}>
          <GuestFaqList faqs={faqs} />
        </AnimatedSection>

        {/* ── Conversion CTA ── */}
        <AnimatedSection delay={100}>
          <GuestConversionCard
            supportPhone={supportPhone}
            onLogin={handlers.handleLogin}
            onContact={handlers.handleContact}
          />
        </AnimatedSection>

        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>
    </Screen>
  );
};

export default GuestPreviewScreen;
