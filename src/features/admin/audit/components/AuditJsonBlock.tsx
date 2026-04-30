import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatValue } from './auditFormatters';

interface AuditJsonBlockProps {
  title: string;
  value?: unknown;
}

export const AuditJsonBlock: React.FC<AuditJsonBlockProps> = ({ title, value }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
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
    marginBottom: 10,
  },
  value: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 18,
  },
});
