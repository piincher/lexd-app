import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface ContainerProfitCardRowProps {
  label: string;
  value: string;
  valueColor?: string;
  highlight?: boolean;
}

export const ContainerProfitCardRow: React.FC<ContainerProfitCardRowProps> = ({
  label,
  value,
  valueColor,
  highlight = false,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.row, highlight && styles.rowHighlight]}>
      <Text style={[styles.rowLabel, highlight && styles.rowLabelHighlight]}>{label}</Text>
      <Text style={[styles.rowValue, { color: valueColor || colors.text.primary }, highlight && styles.rowValueHighlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  rowHighlight: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: -4,
  },
  rowLabel: {
    flex: 1,
    fontSize: 13,
    color: Theme.colors.text.secondary,
    flexShrink: 1,
  },
  rowLabelHighlight: {
    fontWeight: '600',
    color: Theme.colors.text.secondary,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
  rowValueHighlight: {
    fontSize: 14,
  },
});
