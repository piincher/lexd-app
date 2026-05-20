import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './RewardRedemptionCard.styles';

interface RewardRedemptionCardProps {
  rewardPoints: number;
  rewardValueFCFA: number;
  pendingPoints: number;
  pendingValueFCFA: number;
  pointValueFCFA: number;
  onRedeem: () => void;
}

const formatFCFA = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;

export const RewardRedemptionCard: React.FC<RewardRedemptionCardProps> = ({
  rewardPoints,
  rewardValueFCFA,
  pendingPoints,
  pendingValueFCFA,
  pointValueFCFA,
  onRedeem,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const canRedeem = rewardPoints > 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="ticket-percent-outline" size={22} color={colors.status.success} />
        <View style={styles.headerText}>
          <Text style={styles.title}>Utiliser mes points</Text>
          <Text style={styles.subtitle}>1 point = {formatFCFA(pointValueFCFA)}</Text>
        </View>
      </View>

      <View style={styles.values}>
        <View style={styles.valueBlock}>
          <Text style={styles.value}>{rewardPoints}</Text>
          <Text style={styles.label}>points disponibles</Text>
        </View>
        <View style={styles.valueBlock}>
          <Text style={styles.value}>{formatFCFA(rewardValueFCFA)}</Text>
          <Text style={styles.label}>valeur disponible</Text>
        </View>
      </View>

      {pendingPoints > 0 && (
        <View style={styles.pendingBox}>
          <MaterialCommunityIcons name="clock-outline" size={17} color={colors.status.warning} />
          <Text style={styles.pendingText}>
            {pendingPoints} points réservés en attente ({formatFCFA(pendingValueFCFA)})
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, !canRedeem && styles.buttonDisabled]}
        onPress={onRedeem}
        disabled={!canRedeem}
      >
        <MaterialCommunityIcons name="send-check-outline" size={18} color={colors.text.inverse} />
        <Text style={styles.buttonText}>Demander une utilisation</Text>
      </TouchableOpacity>
    </View>
  );
};
