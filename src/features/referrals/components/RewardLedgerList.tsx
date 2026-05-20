import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardLedgerEntry } from '../types';
import { createStyles } from './RewardLedgerList.styles';

interface RewardLedgerListProps {
  entries: RewardLedgerEntry[];
  title?: string;
}

const TYPE_LABELS: Record<RewardLedgerEntry['type'], string> = {
  EARN: 'Points gagnés',
  REDEEM: 'Points utilisés',
  REVERSAL: 'Correction',
  ADMIN_ADJUSTMENT: 'Ajustement',
};

const formatFCFA = (value: number) => `${Math.abs(Math.round(value)).toLocaleString('fr-FR')} FCFA`;

export const RewardLedgerList: React.FC<RewardLedgerListProps> = ({
  entries,
  title = 'Historique des points',
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (entries.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {entries.map((entry) => {
        const isCredit = entry.pointsDelta >= 0;
        const reference = entry.source?.reference || entry.note || '';

        return (
          <View key={entry.id} style={styles.row}>
            <View>
              <Text style={styles.name}>{TYPE_LABELS[entry.type]}</Text>
              <Text style={styles.meta}>{reference}</Text>
            </View>
            <View>
              <Text style={[styles.amount, { color: isCredit ? colors.status.success : colors.status.error }]}>
                {isCredit ? '+' : '-'}{Math.abs(entry.pointsDelta)} pts
              </Text>
              <Text style={styles.balance}>{formatFCFA(entry.valueFCFA)}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
