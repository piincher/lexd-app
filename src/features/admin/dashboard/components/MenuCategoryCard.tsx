import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuCategory } from '../constants/menuData';
import { MenuCategoryItem } from './MenuCategoryItem';
import type { createMenuCategoriesStyles } from './MenuCategories.styles';

type MenuCategoryStyles = ReturnType<typeof createMenuCategoriesStyles>;
type MaterialCommunityIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface MenuCategoryCardProps {
  styles: MenuCategoryStyles;
  category: MenuCategory;
  accent: string;
  disabledColor: string;
  onItemPress: (route: string) => void;
  isLastCategory: boolean;
}

export const MenuCategoryCard: React.FC<MenuCategoryCardProps> = ({
  styles,
  category,
  accent,
  disabledColor,
  onItemPress,
  isLastCategory,
}) => (
  <View style={[styles.categoryBlock, !isLastCategory && styles.categoryBlockBorder]}>
    <View style={styles.categoryHeader}>
      <View style={[styles.categoryIconWrap, { backgroundColor: accent + '20' }]}>
        <MaterialCommunityIcons
          name={category.icon as MaterialCommunityIconName}
          size={18}
          color={accent}
        />
      </View>
      <View style={styles.categoryCopy}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categorySubtitle}>{category.items.length} accès</Text>
      </View>
    </View>
    {category.items.map((item, idx) => (
      <MenuCategoryItem
        key={item.id}
        styles={styles}
        item={item}
        accent={accent}
        disabledColor={disabledColor}
        onPress={() => onItemPress(item.route)}
        isLast={idx === category.items.length - 1}
      />
    ))}
  </View>
);
