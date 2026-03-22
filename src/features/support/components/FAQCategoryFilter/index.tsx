/**
 * FAQCategoryFilter Component - Horizontal scrollable category chips with icons
 * Following SRP: Single purpose - category filter UI (< 100 lines)
 */

import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers';
import { Fonts } from '@src/constants/Fonts';
import { FAQCategory, FAQ_CATEGORY_LABELS, FAQ_CATEGORY_COLORS } from '../../types';

interface FAQCategoryFilterProps {
  categories: (FAQCategory | 'ALL')[];
  selectedCategory: FAQCategory | 'ALL';
  onSelectCategory: (category: FAQCategory | 'ALL') => void;
}

const CATEGORY_ICONS: Record<FAQCategory | 'ALL', string> = {
  ALL: 'view-grid',
  GENERAL: 'information',
  SHIPPING: 'truck-delivery',
  PAYMENT: 'credit-card',
  ACCOUNT: 'account-circle',
  TRACKING: 'map-marker-path',
  CUSTOMS: 'file-document',
};

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
        const isSelected = selectedCategory === category;
        const categoryColor = category === 'ALL'
          ? colors.primary.main
          : FAQ_CATEGORY_COLORS[category];

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
            key={category}
            onPress={() => onSelectCategory(category)}
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
            accessibilityLabel={FAQ_CATEGORY_LABELS[category]}
          >
            <MaterialCommunityIcons
              name={CATEGORY_ICONS[category] as any}
              size={16}
              color={isSelected ? '#FFFFFF' : colors.text.secondary}
              style={styles.icon}
            />
            <Text
              style={[
                styles.chipText,
                {
                  color: isSelected
                    ? '#FFFFFF'
                    : colors.text.secondary,
                  fontFamily: isSelected ? Fonts.bold : Fonts.medium,
                },
              ]}
            >
              {FAQ_CATEGORY_LABELS[category]}
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
