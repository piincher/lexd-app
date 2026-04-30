import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AuditPagination } from '../types';

interface AuditSummaryProps {
  count: number;
  pagination?: AuditPagination;
}

export const AuditSummary: React.FC<AuditSummaryProps> = ({ count, pagination }) => {
  const { colors } = useAppTheme();
  const total = pagination?.total ?? count;

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>
        Showing {count} of {total} audit events
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
});
