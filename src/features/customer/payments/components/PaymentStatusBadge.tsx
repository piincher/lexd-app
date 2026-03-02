/**
 * Payment Status Badge Component
 * Displays payment status with appropriate styling
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Chip, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  PaymentStatus,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_COLORS,
  PAYMENT_STATUS_BG_COLORS,
} from '../types';
import { Fonts } from '@src/constants/Fonts';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
}

const STATUS_ICONS: Record<PaymentStatus, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  PENDING: 'clock-outline',
  COMPLETED: 'check-circle',
  FAILED: 'close-circle',
};

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({
  status,
  size = 'medium',
  showIcon = true,
}) => {
  const theme = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          chip: { height: 24 },
          text: { fontSize: 11 },
          icon: 12,
        };
      case 'large':
        return {
          chip: { height: 40, paddingHorizontal: 16 },
          text: { fontSize: 16 },
          icon: 20,
        };
      default:
        return {
          chip: { height: 32 },
          text: { fontSize: 13 },
          icon: 16,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const iconName = STATUS_ICONS[status];
  const label = PAYMENT_STATUS_LABELS[status];
  const bgColor = PAYMENT_STATUS_BG_COLORS[status];
  const textColor = PAYMENT_STATUS_COLORS[status];

  return (
    <Chip
      style={[
        styles.chip,
        { backgroundColor: bgColor },
        sizeStyles.chip,
      ]}
      textStyle={[
        styles.text,
        { color: textColor },
        sizeStyles.text,
      ]}
      icon={showIcon ? iconName : undefined}
    >
      {label}
    </Chip>
  );
};

interface PaymentStatusIndicatorProps {
  status: PaymentStatus;
  message?: string;
}

export const PaymentStatusIndicator: React.FC<PaymentStatusIndicatorProps> = ({
  status,
  message,
}) => {
  const iconName = STATUS_ICONS[status];
  const label = PAYMENT_STATUS_LABELS[status];
  const color = PAYMENT_STATUS_COLORS[status];

  return (
    <View style={indicatorStyles.container}>
      <MaterialCommunityIcons
        name={iconName}
        size={64}
        color={color}
      />
      <Text style={[indicatorStyles.statusText, { color }]}>
        {label}
      </Text>
      {message && (
        <Text style={indicatorStyles.messageText}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 8,
  },
  text: {
    fontFamily: Fonts.meduim,
    fontWeight: '600',
  },
});

const indicatorStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    marginTop: 16,
  },
  messageText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#737373',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default PaymentStatusBadge;
