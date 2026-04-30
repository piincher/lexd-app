import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGoodsFormStyles } from './GoodsForm.styles';

interface ShippingModeSelectorProps {
  mode: 'AIR' | 'SEA';
  onChange: (mode: 'AIR' | 'SEA') => void;
}

export const ShippingModeSelector: React.FC<ShippingModeSelectorProps> = ({ mode, onChange }) => {
  const { colors } = useAppTheme();
  const styles = useGoodsFormStyles();

  return (
    <View style={styles.shippingRow}>
      <TouchableOpacity
        style={[styles.shippingOption, mode === 'SEA' && styles.shippingOptionActive]}
        onPress={() => onChange('SEA')}
      >
        <MaterialCommunityIcons name="ferry" size={24} color={mode === 'SEA' ? colors.text.inverse : colors.text.secondary} />
        <Text style={[styles.shippingText, mode === 'SEA' && styles.shippingTextActive]}>Maritime</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.shippingOption, mode === 'AIR' && styles.shippingOptionActive]}
        onPress={() => onChange('AIR')}
      >
        <MaterialCommunityIcons name="airplane" size={24} color={mode === 'AIR' ? colors.text.inverse : colors.text.secondary} />
        <Text style={[styles.shippingText, mode === 'AIR' && styles.shippingTextActive]}>Aérien</Text>
      </TouchableOpacity>
    </View>
  );
};
