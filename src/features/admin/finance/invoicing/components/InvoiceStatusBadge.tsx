import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { InvoiceStatus, INVOICE_STATUS_LABELS, INVOICE_STATUS_COLORS } from '../types';

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
  size?: 'small' | 'medium';
}

export const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({
  status,
  size = 'small',
}) => {
  const theme = useTheme();
  const color = INVOICE_STATUS_COLORS[status];
  const label = INVOICE_STATUS_LABELS[status];

  return (
    <Chip
      mode="flat"
      textStyle={[
        styles.text,
        { color: theme.dark ? '#fff' : color },
        size === 'small' && styles.textSmall,
      ]}
      style={[
        styles.chip,
        { backgroundColor: `${color}20` },
        size === 'small' && styles.chipSmall,
      ]}
    >
      {label}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 8,
    height: 32,
  },
  chipSmall: {
    height: 28,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 11,
  },
});
