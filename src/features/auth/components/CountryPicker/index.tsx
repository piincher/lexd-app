/**
 * CountryPicker Component
 * Dropdown for selecting country
 */

import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CountryCode } from '../types';

interface CountryPickerProps {
  visible: boolean;
  countries: CountryCode[];
  selectedCountry: CountryCode;
  onSelect: (country: CountryCode) => void;
}

export const CountryPicker: React.FC<CountryPickerProps> = ({ visible, countries, selectedCountry, onSelect }) => {
  const { colors, isDark } = useAppTheme();
  if (!visible) return null;

  return (
    <Animated.View entering={FadeIn.duration(200)} style={[styles.container, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F9FAFB', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
      {countries.map((c) => {
        const selected = selectedCountry.code === c.code;
        return (
          <Pressable key={c.code} style={[styles.option, { backgroundColor: selected ? (isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.08)') : 'transparent' }]} onPress={() => onSelect(c)}>
            <Text style={styles.flag}>{c.flag}</Text>
            <Text style={[styles.name, { color: colors.text.primary }]}>{c.country}</Text>
            <Text style={[styles.code, { color: colors.text.secondary }]}>+{c.code}</Text>
            {selected && <MaterialCommunityIcons name="check" size={18} color="#22C55E" />}
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 8, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  option: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 13, minHeight: 44 },
  flag: { fontSize: 22 },
  name: { flex: 1, fontSize: 14, fontFamily: Fonts.medium },
  code: { fontSize: 13, fontFamily: Fonts.medium },
});

export default CountryPicker;
