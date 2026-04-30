import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Row {
  label: string;
  value?: string;
}

interface AuditInfoCardProps {
  title: string;
  rows: Row[];
}

export const AuditInfoCard: React.FC<AuditInfoCardProps> = ({ title, rows }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
      {rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <Text style={[styles.label, { color: colors.text.secondary }]}>{row.label}</Text>
          <Text style={[styles.value, { color: colors.text.primary }]} selectable>
            {row.value || '-'}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 12,
    padding: 14,
    ...Theme.shadows.sm,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    marginBottom: 12,
  },
  row: {
    gap: 4,
    marginBottom: 10,
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
  value: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
  },
});
