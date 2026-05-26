import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardRedemption } from '../types';
import { RedemptionStatusBadge } from './RedemptionStatusBadge';
import { createStyles } from './RedemptionHistoryList.styles';

interface RedemptionHistoryListProps {
  redemptions: RewardRedemption[];
  isCancelling: boolean;
  onCancel: (id: string) => void;
}

const formatFCFA = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;

export const RedemptionHistoryList: React.FC<RedemptionHistoryListProps> = ({
  redemptions,
  isCancelling,
  onCancel,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (redemptions.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Demandes récentes</Text>
      {redemptions.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.name}>
              {item.requestedPoints} points • {formatFCFA(item.requestedValueFCFA)}
            </Text>
            <RedemptionStatusBadge status={item.status} size="sm" />
          </View>
          {item.status === 'PENDING' && (
            <TouchableOpacity
              style={styles.cancelButton}
              disabled={isCancelling}
              onPress={() => onCancel(item.id)}
            >
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};
