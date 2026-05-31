import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderCard.styles';
import { formatShortDate } from './OrderCard.utils';

interface OrderCardDetailsProps {
  clientPhone?: string;
  departureDate?: string;
  createdAt?: string;
  isGoodsLinked?: boolean;
  isManual?: boolean;
}

export const OrderCardDetails: React.FC<OrderCardDetailsProps> = ({
  clientPhone,
  departureDate,
  createdAt,
  isGoodsLinked,
  isManual,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const sourceLabel = isGoodsLinked ? 'Lié aux marchandises' : isManual ? 'Commande manuelle' : 'Non lié';

  return (
    <View style={styles.detailsGrid}>
      <View style={styles.detailItem}>
        <MaterialIcons name="phone" size={14} color={colors.text.secondary} />
        <Text style={styles.detailText}>{clientPhone || 'N/A'}</Text>
      </View>

      <View style={styles.detailItem}>
        <MaterialIcons name="schedule" size={14} color={colors.text.secondary} />
        <Text style={styles.detailText}>{formatShortDate(departureDate || createdAt)}</Text>
      </View>

      <View style={styles.detailItem}>
        <MaterialIcons name={isGoodsLinked ? 'link' : 'link-off'} size={14} color={colors.text.secondary} />
        <Text style={styles.detailText} numberOfLines={1}>{sourceLabel}</Text>
      </View>
    </View>
  );
};
