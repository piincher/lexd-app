import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGuestPreview } from '../hooks/useGuestPreview';
import { GuestHero } from '../components/GuestHero';
import { GuestModeSelector } from '../components/GuestModeSelector';
import { GuestPrivacyNotice } from '../components/GuestPrivacyNotice';
import { DemoShipmentCard } from '../components/DemoShipmentCard';
import { DemoTimeline } from '../components/DemoTimeline';
import { DemoBenefitGrid } from '../components/DemoBenefitGrid';
import { GuestConversionCard } from '../components/GuestConversionCard';
import { GuestClientJourney } from '../components/GuestClientJourney';
import { DemoNotificationFeed } from '../components/DemoNotificationFeed';
import { DemoDocumentChecklist } from '../components/DemoDocumentChecklist';
import { GuestFaqList } from '../components/GuestFaqList';
import { GuestCommandCenter } from '../components/GuestCommandCenter';
import { DemoRouteBoard } from '../components/DemoRouteBoard';
import { DemoGoodsPreview } from '../components/DemoGoodsPreview';
import { DemoLockedFeatures } from '../components/DemoLockedFeatures';

export const GuestPreviewScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'GuestPreview'>>();
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
    shipments,
    selectedMode,
    selectedShipment,
    supportPhone,
    setSelectedMode,
    handleLogin,
    handleContact,
  } = useGuestPreview(navigation);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <GuestHero />
        <GuestCommandCenter metrics={metrics} />
        <GuestModeSelector shipments={shipments} selectedMode={selectedMode} onSelect={setSelectedMode} />
        <GuestPrivacyNotice />
        <DemoShipmentCard shipment={selectedShipment} />
        <DemoRouteBoard shipment={selectedShipment} />
        <DemoGoodsPreview goods={goods} />
        <DemoTimeline steps={selectedShipment.timeline} />
        <DemoBenefitGrid benefits={benefits} />
        <DemoNotificationFeed notifications={notifications} />
        <DemoDocumentChecklist documents={documents} />
        <DemoLockedFeatures features={lockedFeatures} />
        <GuestClientJourney steps={clientSteps} />
        <GuestFaqList faqs={faqs} />
        <GuestConversionCard supportPhone={supportPhone} onLogin={handleLogin} onContact={handleContact} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
});

export default GuestPreviewScreen;
