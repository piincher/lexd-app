import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './RewardBalanceCard.styles';

interface RewardBalanceCardProps {
  points: number;
  pointValueFCFA: number;
  pendingPoints?: number;
  onRedeem?: () => void;
  onHistory?: () => void;
}

const formatFCFA = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;

export const RewardBalanceCard: React.FC<RewardBalanceCardProps> = ({
  points,
  pointValueFCFA,
  pendingPoints = 0,
  onRedeem,
  onHistory,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const value = points * pointValueFCFA;
  const pendingValue = pendingPoints * pointValueFCFA;
  const hasPoints = points > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: colors.primary.main + '18' }]}>
          <MaterialCommunityIcons name="wallet-giftcard" size={24} color={colors.primary.main} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Mes points</Text>
          <Text style={styles.headerSubtitle}>1 point = {formatFCFA(pointValueFCFA)}</Text>
        </View>
      </View>

      <View style={styles.balanceRow}>
        <View style={styles.balanceBlock}>
          <Text style={styles.balanceValue}>{points}</Text>
          <Text style={styles.balanceLabel}>points disponibles</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.balanceBlock}>
          <Text style={[styles.balanceValue, { color: colors.status.success }]}>
            {formatFCFA(value)}
          </Text>
          <Text style={styles.balanceLabel}>valeur estimée</Text>
        </View>
      </View>

      {pendingPoints > 0 && (
        <View style={[styles.pendingBox, { backgroundColor: colors.status.warning + '10' }]}>
          <MaterialCommunityIcons name="clock-outline" size={16} color={colors.status.warning} />
          <Text style={[styles.pendingText, { color: colors.status.warning }]}>
            {pendingPoints} points en attente de validation ({formatFCFA(pendingValue)})
          </Text>
        </View>
      )}

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.redeemButton, { backgroundColor: colors.primary.main }, !hasPoints && styles.actionDisabled]}
          onPress={onRedeem}
          disabled={!hasPoints}
        >
          <MaterialCommunityIcons name="ticket-percent-outline" size={16} color={colors.text.inverse} />
          <Text style={styles.redeemText}>Utiliser mes points</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.historyButton, { borderColor: colors.border }]}
          onPress={onHistory}
        >
          <MaterialCommunityIcons name="history" size={16} color={colors.primary.main} />
          <Text style={[styles.historyText, { color: colors.primary.main }]}>Historique</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
