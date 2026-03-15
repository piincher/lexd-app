import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { styles } from '../AllOrdersScreen.styles';

export const EmptyOrders: React.FC = () => (
  <View style={styles.emptyContainer}>
    <MaterialIcons name="inbox" size={64} color={COLORS.lightGray} />
    <Text style={styles.emptyText}>No orders found</Text>
    <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
  </View>
);

export default EmptyOrders;
