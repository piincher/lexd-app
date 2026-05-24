import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { hapticLight } from '@src/shared/lib/haptics';

interface CreateOrderCTAProps {
  onPress: () => void;
}

export const CreateOrderCTA: React.FC<CreateOrderCTAProps> = ({ onPress }) => {
  const { colors, isDark } = useAppTheme();
  const buttonBg = isDark ? colors.primary.light : colors.primary.dark;
  const buttonInk = isDark ? colors.neutral[900] : colors.neutral.white;

  const handlePress = () => {
    hapticLight();
    onPress();
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginHorizontal: 16,
          marginTop: 16,
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: 14,
          backgroundColor: buttonBg,
        },
        pressed: {
          opacity: 0.88,
          transform: [{ scale: 0.98 }],
        },
        text: {
          fontFamily: Fonts.bold,
          fontSize: 15,
          color: buttonInk,
        },
      }),
    [buttonBg, buttonInk]
  );

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel="Nouvelle expédition"
    >
      <FontAwesome6 name="plus" size={16} color={buttonInk} />
      <Text style={styles.text}>Nouvelle expédition</Text>
    </Pressable>
  );
};
