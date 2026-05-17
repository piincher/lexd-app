/**
 * FAQCategoryFilter Component - Horizontal scrollable category chips with icons
 * Following SRP: Single purpose - category filter UI (< 100 lines)
 */

import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { FAQ_CATEGORY_COLORS } from '../../types';

interface FAQCategoryChip {
  id: string;
  label: string;
  icon: string;
}

interface FAQCategoryFilterProps {
  categories: FAQCategoryChip[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const FAQCategoryFilter: React.FC<FAQCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { colors, isDark } = useAppTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        const categoryColor = category.id === 'all'
          ? colors.primary.main
          : FAQ_CATEGORY_COLORS[category.id as keyof typeof FAQ_CATEGORY_COLORS];

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
            key={category.id}
            onPress={() => onSelectCategory(category.id)}
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
              name={category.icon as any}
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
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
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

export default FAQCategoryFilter;
