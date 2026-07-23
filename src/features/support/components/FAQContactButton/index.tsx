/**
 * FAQContactButton Component - Sticky footer button for support contact
 * Following SRP: Single purpose - contact support button (< 80 lines)
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS } from '@src/shared/ui/designLanguage';

interface FAQContactButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const FAQContactButton: React.FC<FAQContactButtonProps> = ({
  onPress,
  style,
}) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

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
        color={colors.text.inverse}
      />
      <Text style={styles.text}>
        Contacter le support
      </Text>
      <MaterialCommunityIcons
        name="arrow-right"
        size={18}
        color={colors.text.inverse}
      />
    </TouchableOpacity>
  );
};

const getStyles = (colors: { text: { inverse: string } }) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: RADIUS.control,
    gap: 10,
    minHeight: 48,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: colors.text.inverse,
  },
});

export default FAQContactButton;
