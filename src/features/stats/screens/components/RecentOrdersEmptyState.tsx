import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './RecentOrdersList.styles';

export const RecentOrdersEmptyState: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={28} color={colors.border} />
      <Text style={[styles.emptyText, { color: colors.text.secondary }]}>Aucune commande recente</Text>
    </View>
  );
};
