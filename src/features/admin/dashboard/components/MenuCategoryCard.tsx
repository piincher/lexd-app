import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuCategory } from '../constants/menuData';
import { MenuCategoryItem } from './MenuCategoryItem';

interface MenuCategoryCardProps {
  styles: any;
  category: MenuCategory;
  accent: string;
  isDark: boolean;
  disabledColor: string;
  onItemPress: (route: string) => void;
}

export const MenuCategoryCard: React.FC<MenuCategoryCardProps> = ({
  styles,
  category,
  accent,
  isDark,
  disabledColor,
  onItemPress,
}) => (
  <View style={styles.card}>
    <View style={styles.categoryHeader}>
      <View style={[styles.categoryIconWrap, { backgroundColor: accent + '20' }]}>
        <MaterialCommunityIcons name={category.icon as any} size={18} color={accent} />
      </View>
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <Text style={styles.itemCount}>{category.items.length}</Text>
    </View>
    <View style={styles.divider} />
    {category.items.map((item, idx) => (
      <MenuCategoryItem
        key={item.id}
        styles={styles}
        item={item}
        accent={accent}
        isDark={isDark}
        disabledColor={disabledColor}
        onPress={() => onItemPress(item.route)}
        isLast={idx === category.items.length - 1}
      />
    ))}
  </View>
);
