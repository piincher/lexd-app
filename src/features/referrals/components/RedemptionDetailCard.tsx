import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardRedemption } from '../types';
import { RedemptionStatusBadge } from './RedemptionStatusBadge';
import { RedemptionTimeline } from './RedemptionTimeline';
import { createStyles } from './RedemptionDetailCard.styles';

interface RedemptionDetailCardProps {
  redemption: RewardRedemption;
}

const formatFCFA = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;
const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const RedemptionDetailCard: React.FC<RedemptionDetailCardProps> = ({ redemption }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const showApproved = redemption.status === 'APPROVED';
  const showRejected = redemption.status === 'REJECTED';
  const showRestored = redemption.restoredPoints > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.idLabel}>Demande #{redemption.id.slice(-6).toUpperCase()}</Text>
          <Text style={styles.date}>{formatDate(redemption.createdAt)}</Text>
        </View>
        <RedemptionStatusBadge status={redemption.status} />
      </View>

      <View style={styles.amountGrid}>
        <View style={styles.amountBlock}>
          <MaterialCommunityIcons name="ticket-percent-outline" size={18} color={colors.primary.main} />
          <Text style={styles.amountValue}>{redemption.requestedPoints} pts</Text>
          <Text style={styles.amountLabel}>Demandés</Text>
        </View>
        <View style={styles.amountBlock}>
          <MaterialCommunityIcons name="cash" size={18} color={colors.status.success} />
          <Text style={styles.amountValue}>{formatFCFA(redemption.requestedValueFCFA)}</Text>
          <Text style={styles.amountLabel}>Valeur</Text>
        </View>
      </View>

      {showApproved && (
        <View style={[styles.section, { backgroundColor: colors.status.success + '10' }]}>
          <Text style={styles.sectionTitle}>Approuvé</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Points approuvés</Text>
            <Text style={styles.rowValue}>{redemption.approvedPoints} pts</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Valeur approuvée</Text>
            <Text style={styles.rowValue}>{formatFCFA(redemption.approvedValueFCFA)}</Text>
          </View>
          {showRestored && (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Points restitués</Text>
              <Text style={[styles.rowValue, { color: colors.status.info }]}>
                +{redemption.restoredPoints} pts
              </Text>
            </View>
          )}
          {redemption.adminNote ? (
            <View style={styles.noteBox}>
              <Text style={styles.noteLabel}>Note admin</Text>
              <Text style={styles.noteText}>{redemption.adminNote}</Text>
            </View>
          ) : null}
        </View>
      )}

      {showRejected && (
        <View style={[styles.section, { backgroundColor: colors.status.error + '08' }]}>
          <Text style={styles.sectionTitle}>Rejet</Text>
          {showRestored && (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Points restitués</Text>
              <Text style={[styles.rowValue, { color: colors.status.info }]}>
                +{redemption.restoredPoints} pts
              </Text>
            </View>
          )}
          <View style={styles.noteBox}>
            <Text style={styles.noteLabel}>Motif</Text>
            <Text style={styles.noteText}>{redemption.rejectionReason}</Text>
          </View>
        </View>
      )}

      {redemption.requestNote ? (
        <View style={styles.noteBox}>
          <Text style={styles.noteLabel}>Votre note</Text>
          <Text style={styles.noteText}>{redemption.requestNote}</Text>
        </View>
      ) : null}

      <RedemptionTimeline redemption={redemption} />
    </View>
  );
};
