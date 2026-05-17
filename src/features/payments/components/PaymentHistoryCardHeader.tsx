import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { getPaymentHistoryCardStyles } from './PaymentHistoryCard.styles';

interface PaymentHistoryCardHeaderProps {
  methodIcon: string;
  methodColor: string;
  statusColor: string;
  statusLabel: string;
  colors: any;
}

export const PaymentHistoryCardHeader: React.FC<PaymentHistoryCardHeaderProps> = ({
  methodIcon,
  methodColor,
  statusColor,
  statusLabel,
  colors,
}) => {
  const styles = getPaymentHistoryCardStyles(colors);
  return (
    <View style={styles.header}>
      <View style={[styles.iconContainer, { backgroundColor: methodColor + '20' }]}>
        <MaterialCommunityIcons name={methodIcon as any} size={20} color={methodColor} />
      </View>
      <Chip
        style={[styles.chip, { backgroundColor: statusColor + '20' }]}
        textStyle={{ color: statusColor, fontFamily: Fonts.bold, fontSize: 11 }}
      >
        {statusLabel}
      </Chip>
    </View>
  );
};
