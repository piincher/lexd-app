import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AuditChangeSet } from '../types';
import { formatValue } from './auditFormatters';

interface AuditChangeSetProps {
  changeSet?: AuditChangeSet;
}

const getBeforeAfter = (value: unknown) => {
  if (value && typeof value === 'object' && ('before' in value || 'after' in value)) {
    const change = value as { before?: unknown; after?: unknown };
    return { before: change.before, after: change.after };
  }

  return { before: undefined, after: value };
};

export const AuditChangeSet: React.FC<AuditChangeSetProps> = ({ changeSet }) => {
  const { colors } = useAppTheme();
  const entries = Object.entries(changeSet ?? {});

  if (!entries.length) {
    return (
      <View style={[styles.card, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Change set</Text>
        <Text style={[styles.empty, { color: colors.text.secondary }]}>No field-level changes were recorded.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Change set</Text>
      {entries.map(([field, value]) => {
        const { before, after } = getBeforeAfter(value);
        return (
          <View key={field} style={[styles.change, { borderColor: colors.border }]}>
            <Text style={[styles.field, { color: colors.text.primary }]}>{field}</Text>
            <ValueColumn label="Before" value={before} />
            <ValueColumn label="After" value={after} />
          </View>
        );
      })}
    </View>
  );
};

const ValueColumn: React.FC<{ label: string; value: unknown }> = ({ label, value }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.valueBlock}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.text.primary }]} selectable>
        {formatValue(value)}
      </Text>
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
  empty: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
  },
  change: {
    borderTopWidth: 1,
    paddingVertical: 12,
  },
  field: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    marginBottom: 8,
  },
  valueBlock: {
    marginBottom: 8,
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 18,
  },
});
