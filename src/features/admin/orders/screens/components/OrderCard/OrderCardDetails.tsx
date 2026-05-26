import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderCard.styles';

interface OrderCardDetailsProps {
  clientPhone?: string;
  departureDate?: string;
  orderPrice: number;
}

export const OrderCardDetails: React.FC<OrderCardDetailsProps> = ({ clientPhone, departureDate, orderPrice }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.detailsGrid}>
      <View style={styles.detailItem}>
        <MaterialIcons name="phone" size={14} color={colors.text.secondary} />
        <Text style={styles.detailText}>{clientPhone || 'N/A'}</Text>
      </View>

      <View style={styles.detailItem}>
        <MaterialIcons name="schedule" size={14} color={colors.text.secondary} />
        <Text style={styles.detailText}>
          {departureDate ? new Date(departureDate).toLocaleDateString('fr-FR') : 'No date'}
        </Text>
      </View>

      <View style={styles.detailItem}>
        <MaterialIcons name="attach-money" size={14} color={colors.text.secondary} />
        <Text style={[styles.amountText, { color: orderPrice > 0 ? colors.status.success : colors.text.secondary }]}>
          {orderPrice > 0 ? `${orderPrice.toLocaleString()} FCFA` : 'Non défini'}
        </Text>
      </View>
    </View>
  );
};
