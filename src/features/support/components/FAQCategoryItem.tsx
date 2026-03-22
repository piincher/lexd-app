/**
 * FAQCategoryItem Component
 * Displays a single FAQ category button
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { FAQCategory } from '../types/faq.types';

interface FAQCategoryItemProps {
  category: FAQCategory;
  isSelected: boolean;
  onPress: () => void;
}

export const FAQCategoryItem: React.FC<FAQCategoryItemProps> = ({
  category,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons
        name={category.icon as any}
        size={24}
        color={isSelected ? COLORS.white : COLORS.primary}
      />
      <Text style={[styles.title, isSelected && styles.selectedTitle]}>
        {category.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray + '30',
    marginRight: 8,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: COLORS.primary,
    marginLeft: 8,
  },
  selectedTitle: {
    color: COLORS.white,
  },
});

export default FAQCategoryItem;
