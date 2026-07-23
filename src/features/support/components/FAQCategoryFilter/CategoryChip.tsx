import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';
import type { AppTheme } from '@src/constants/Theme';

type ThemeColors = AppTheme['colors'];

interface CategoryChipProps {
  category: { id: string; label: string; icon: string };
  isSelected: boolean;
  categoryColor: string;
  onPress: () => void;
  colors: ThemeColors;
  isDark: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  isSelected,
  categoryColor,
  onPress,
  colors,
  isDark,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(isSelected ? 1.05 : 1, {
          damping: 15,
          stiffness: 200,
        }),
      },
    ],
  }));

  return (
    <AnimatedTouchable
      onPress={onPress}
      style={[
        styles.chip,
        animatedStyle,
        {
          backgroundColor: isSelected
            ? categoryColor
            : isDark
            ? colors.background.paper
            : colors.neutral[100],
          borderColor: isSelected
            ? categoryColor
            : isDark
            ? colors.border
            : colors.neutral[200],
        },
      ]}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={category.label}
    >
      <MaterialCommunityIcons
        name={category.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
        size={16}
        color={isSelected ? colors.text.inverse : colors.text.secondary}
        style={styles.icon}
      />
      <Text
        style={[
          styles.chipText,
          {
            color: isSelected
              ? colors.text.inverse
              : colors.text.secondary,
            fontFamily: isSelected ? Fonts.bold : Fonts.medium,
          },
        ]}
      >
        {category.label}
      </Text>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.badge,
    borderWidth: HAIRLINE,
    marginRight: 8,
    minHeight: 44,
  },
  icon: {
    marginRight: 6,
  },
  chipText: {
    fontSize: 13,
  },
});
