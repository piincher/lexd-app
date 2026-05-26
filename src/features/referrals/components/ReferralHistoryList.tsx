import React from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ReferralPerson } from '../types';
import { createStyles } from './ReferralHistoryList.styles';

interface ReferralHistoryListProps {
  referrals: ReferralPerson[];
}

const getName = (item: ReferralPerson) =>
  `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Client';

export const ReferralHistoryList: React.FC<ReferralHistoryListProps> = ({ referrals }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (referrals.length === 0) {
    return (
      <View style={styles.section}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Mes filleuls</Text>
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            Aucun filleul pour le moment. Partagez votre code pour commencer à gagner des points.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Mes filleuls</Text>
      {referrals.map((item) => (
        <View key={item.id} style={styles.row}>
          <View>
            <Text style={[styles.name, { color: colors.text.primary }]}>{getName(item)}</Text>
            <Text style={[styles.phone, { color: colors.text.secondary }]}>{item.phoneNumber}</Text>
          </View>
          <View
            style={[
              styles.badge,
              { backgroundColor: item.rewardAwarded ? colors.status.success : colors.status.warning },
            ]}
          >
            <Text style={[styles.badgeText, { color: colors.text.inverse }]}>
              {item.rewardAwarded ? 'Récompensé' : 'En attente'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
