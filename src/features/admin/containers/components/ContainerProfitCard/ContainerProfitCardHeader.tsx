import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface ContainerProfitCardHeaderProps {
  isProfit: boolean;
  profitColor: string;
  profitMargin: number;
}

export const ContainerProfitCardHeader: React.FC<ContainerProfitCardHeaderProps> = ({
  isProfit,
  profitColor,
  profitMargin,
}) => (
  <View style={styles.header}>
    <View style={[styles.iconBox, { backgroundColor: isProfit ? '#ECFDF5' : '#FEF2F2' }]}>
      <Ionicons name="trending-up" size={20} color={profitColor} />
    </View>
    <Text style={styles.title}>Rentabilité CBM</Text>
    <View style={[styles.marginBadge, { backgroundColor: isProfit ? '#ECFDF5' : '#FEF2F2' }]}>
      <Text style={[styles.marginText, { color: profitColor }]}>
        {isProfit ? '+' : ''}{profitMargin.toFixed(1)}%
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  marginBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  marginText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
