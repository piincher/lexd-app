import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CertifiedShipperCard } from './CertifiedShipperCard';
import { MilestoneBadges } from './MilestoneBadges';
import { BadgesSection } from './BadgesSection';
import { ReviewsSection } from './ReviewsSection';

interface Props {
  certificateProgress: any;
  isCertLoading: boolean;
  certError: any;
  onRetry: () => void;
}

export const AchievementsSection: React.FC<Props> = ({
  certificateProgress,
  isCertLoading,
  certError,
  onRetry,
}) => {
  const { colors, isDark } = useAppTheme();
  const cardBorder = colors.border;

  return (
    <>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="trophy-outline" size={18} color={colors.primary.main} />
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Réalisations</Text>
      </View>
      <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: cardBorder }]}>
        <CertifiedShipperCard progress={certificateProgress} isLoading={isCertLoading} error={certError} onRetry={onRetry} />
        <MilestoneBadges />
        <BadgesSection />
        <ReviewsSection />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    letterSpacing: -0.2,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default AchievementsSection;
