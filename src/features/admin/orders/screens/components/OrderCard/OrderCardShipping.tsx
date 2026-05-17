import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderCard.styles';

interface OrderCardShippingProps {
  isAir: boolean;
  destination?: string;
}

export const OrderCardShipping: React.FC<OrderCardShippingProps> = ({ isAir, destination }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.shippingRow}>
      <View style={[styles.shippingMode, { backgroundColor: isAir ? colors.status.info + '15' : colors.status.success + '15' }]}>
        <FontAwesome5
          name={isAir ? 'plane' : 'ship'}
          size={12}
          color={isAir ? colors.status.info : colors.status.success}
        />
        <Text style={[styles.shippingText, { color: isAir ? colors.status.info : colors.status.success }]}>
          {isAir ? 'Air Freight' : 'Sea Shipping'}
        </Text>
      </View>

      {destination && (
        <View style={styles.routeInfo}>
          <MaterialIcons name="location-on" size={12} color={colors.text.secondary} />
          <Text style={styles.routeText}>{destination}</Text>
        </View>
      )}
    </View>
  );
};
