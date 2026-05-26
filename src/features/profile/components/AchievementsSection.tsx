import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CertifiedShipperCard } from './CertifiedShipperCard';
import { MilestoneBadges } from './MilestoneBadges';
import { BadgesSection } from './BadgesSection';
import { ReviewsSection } from './ReviewsSection';
import { ProfileSectionHeader } from './ProfileSectionHeader';
import type { CertificateProgress } from '../api/certificateApi';

interface Props {
  certificateProgress?: CertificateProgress;
  isCertLoading: boolean;
  certError: Error | null;
  onRetry: () => void;
}

export const AchievementsSection: React.FC<Props> = ({
  certificateProgress,
  isCertLoading,
  certError,
  onRetry,
}) => {
  const { colors } = useAppTheme();

  return (
    <>
      <ProfileSectionHeader
        icon="trophy-outline"
        title="Réalisations"
        subtitle="Certificat, badges et avis client"
      />
      <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
        <CertifiedShipperCard
          progress={certificateProgress}
          isLoading={isCertLoading}
          error={certError}
          onRetry={onRetry}
        />
        <MilestoneBadges />
        <BadgesSection />
        <ReviewsSection />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default AchievementsSection;
