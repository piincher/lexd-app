/**
 * FAQContactButton Component - Sticky footer button for support contact
 * Following SRP: Single purpose - contact support button (< 80 lines)
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers';
import { Fonts } from '@src/constants/Fonts';

interface FAQContactButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const FAQContactButton: React.FC<FAQContactButtonProps> = ({
  onPress,
  style,
}) => {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: colors.primary.main },
        style,
      ]}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel="Contacter le support"
    >
      <MaterialCommunityIcons
        name="whatsapp"
        size={22}
        color="#FFFFFF"
      />
      <Text style={styles.text}>
        Contacter le support
      </Text>
      <MaterialCommunityIcons
        name="arrow-right"
        size={18}
        color="#FFFFFF"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 10,
    minHeight: 48,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: '#FFFFFF',
  },
});

export default FAQContactButton;
