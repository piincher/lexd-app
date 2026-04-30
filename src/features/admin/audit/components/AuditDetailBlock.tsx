import React from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createAuditDetailBlockStyles } from './AuditDetailBlock.styles';

interface DetailRow {
  label: string;
  value?: string | null;
}

interface AuditDetailBlockProps {
  title: string;
  rows: DetailRow[];
}

export const AuditDetailBlock: React.FC<AuditDetailBlockProps> = ({ title, rows }) => {
  const { colors } = useAppTheme();
  const styles = createAuditDetailBlockStyles(colors);

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      {rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <Text style={styles.label}>{row.label}</Text>
          <Text style={[styles.value, !row.value && styles.valueMuted]}>
            {row.value || 'Non disponible'}
          </Text>
        </View>
      ))}
    </View>
  );
};
