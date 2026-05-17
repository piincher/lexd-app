import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SHIPPING_MODE_LABELS } from '../../../types';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface SummaryModeRowProps {
  shippingMode?: 'AIR' | 'SEA';
  getShippingModeIcon: (mode: string) => MaterialIconName;
}

export const SummaryModeRow: React.FC<SummaryModeRowProps> = ({
  shippingMode,
  getShippingModeIcon,
}) => {
  const { colors } = useAppTheme();

  if (!shippingMode) return null;

  return (
    <View style={[styles.modeRow, { borderBottomColor: colors.border }]}>
      <MaterialCommunityIcons
        name={getShippingModeIcon(shippingMode)}
        size={18}
        color={colors.text.secondary}
      />
      <Text style={[styles.modeText, { color: colors.text.secondary }]}>
        {SHIPPING_MODE_LABELS[shippingMode.toUpperCase() as 'SEA' | 'AIR'] || shippingMode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  modeText: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    marginLeft: 8,
  },
});
