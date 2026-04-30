import React from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AuditChange } from '../types';
import { formatAuditValue } from '../utils/formatAudit';
import { createAuditDetailBlockStyles } from './AuditDetailBlock.styles';

interface AuditChangeListProps {
  changes?: Record<string, AuditChange>;
}

export const AuditChangeList: React.FC<AuditChangeListProps> = ({ changes }) => {
  const { colors } = useAppTheme();
  const styles = createAuditDetailBlockStyles(colors);
  const entries = Object.entries(changes || {});

  return (
    <View style={styles.block}>
      <Text style={styles.title}>Changements</Text>
      {entries.length === 0 ? (
        <Text style={[styles.value, styles.valueMuted]}>Aucun changement détaillé.</Text>
      ) : (
        entries.map(([field, change]) => (
          <View key={field} style={styles.row}>
            <Text style={styles.label}>{field}</Text>
            <Text style={styles.value}>Avant: {formatAuditValue(change.before)}</Text>
            <Text style={styles.value}>Après: {formatAuditValue(change.after)}</Text>
          </View>
        ))
      )}
    </View>
  );
};
