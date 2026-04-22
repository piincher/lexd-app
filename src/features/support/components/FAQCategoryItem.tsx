/**
 * FAQCategoryItem Component
 * Displays a single FAQ category button
 */

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
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
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: isSelected ? colors.primary.main : colors.background.paper,
      marginRight: 8,
    },
    title: {
      fontSize: 14,
      fontFamily: Fonts.medium,
      color: isSelected ? colors.text.inverse : colors.primary.main,
      marginLeft: 8,
    },
  }), [colors, isDark, isSelected]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons
        name={category.icon as any}
        size={24}
        color={isSelected ? colors.text.inverse : colors.primary.main}
      />
      <Text style={styles.title}>
        {category.title}
      </Text>
    </TouchableOpacity>
  );
};

export default FAQCategoryItem;
