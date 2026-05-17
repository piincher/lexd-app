import React from 'react';
import Animated from 'react-native-reanimated';
import { Screen } from '@src/shared/ui';
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
      <Animated.ScrollView ref={scrollRef} style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={heroStyle}><GuestHero /></Animated.View>
        <AnimatedSection delay={100}><GuestCommandCenter metrics={metrics} /></AnimatedSection>
        <AnimatedSection delay={200}><GuestModeSelector shipments={shipments} selectedMode={selectedMode} onSelect={handlers.setSelectedMode} /></AnimatedSection>
        <AnimatedSection delay={300}><GuestPrivacyNotice /></AnimatedSection>
        <AnimatedSection delay={400}><DemoShipmentCard shipment={selectedShipment} /></AnimatedSection>
        <AnimatedSection delay={500}><DemoRouteBoard shipment={selectedShipment} /></AnimatedSection>
        <AnimatedSection delay={600}><DemoGoodsPreview goods={goods} /></AnimatedSection>
        <AnimatedSection delay={700}><DemoTimeline steps={selectedShipment.timeline} /></AnimatedSection>
        <AnimatedSection delay={800}><DemoBenefitGrid benefits={benefits} /></AnimatedSection>
        <AnimatedSection delay={900}><DemoNotificationFeed notifications={notifications} /></AnimatedSection>
        <AnimatedSection delay={1000}><DemoDocumentChecklist documents={documents} /></AnimatedSection>
        <AnimatedSection delay={1100}><DemoQuickActions actions={quickActions} onAction={handlers.handleAction} /></AnimatedSection>
        <AnimatedSection delay={1200}><DemoLockedFeatures features={lockedFeatures} /></AnimatedSection>
        <AnimatedSection delay={1300}><GuestClientJourney steps={clientSteps} /></AnimatedSection>
        <AnimatedSection delay={1400}><GuestFaqList faqs={faqs} /></AnimatedSection>
        <AnimatedSection delay={1500}><GuestConversionCard supportPhone={supportPhone} onLogin={handlers.handleLogin} onContact={handlers.handleContact} /></AnimatedSection>
      </Animated.ScrollView>
    </Screen>
  );
};

export default GuestPreviewScreen;
