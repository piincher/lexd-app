/**
 * TopCustomers
 * SRP: Displays top customers ranked by revenue
 * Hallmark: flat section, no card wrapper, hairline separators
 */

import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { TopCustomer } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createTopCustomersStyles } from './TopCustomers.styles';
import { TopCustomersHeader } from './TopCustomersHeader';
import { TopCustomerRow } from './TopCustomerRow';

interface TopCustomersProps {
  customers: TopCustomer[];
  isLoading?: boolean;
}

export const TopCustomers: React.FC<TopCustomersProps> = ({ customers, isLoading }) => {
  const { colors } = useAppTheme();
  const styles = createTopCustomersStyles(colors);

  return (
    <View style={styles.container}>
      <TopCustomersHeader />

      {isLoading ? (
        <View style={{ gap: 10, paddingVertical: 8 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <ShimmerBlock width={30} height={30} borderRadius={10} />
              <View style={{ flex: 1, gap: 6 }}>
                <ShimmerBlock width={'60%'} height={14} borderRadius={3} />
                <ShimmerBlock width={'40%'} height={10} borderRadius={3} />
              </View>
              <ShimmerBlock width={50} height={14} borderRadius={3} />
            </View>
          ))}
        </View>
      ) : customers.length > 0 ? (
        customers.map((customer, index) => (
          <TopCustomerRow key={`${customer.userId}-${index}`} customer={customer} rank={index} />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={28} color={colors.text.disabled} />
          <Text style={styles.emptyText}>Aucune donnée disponible</Text>
        </View>
      )}
    </View>
  );
};
