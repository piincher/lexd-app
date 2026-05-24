import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuItem } from '../constants/menuData';
import type { createMenuCategoriesStyles } from './MenuCategories.styles';

type MenuCategoryStyles = ReturnType<typeof createMenuCategoriesStyles>;
type MaterialCommunityIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface MenuCategoryItemProps {
  styles: MenuCategoryStyles;
  item: MenuItem;
  accent: string;
  disabledColor: string;
  onPress: () => void;
  isLast: boolean;
}

export const MenuCategoryItem: React.FC<MenuCategoryItemProps> = ({
  styles,
  item,
  accent,
  disabledColor,
  onPress,
  isLast,
}) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.item,
          pressed && styles.itemPressed,
        ]}
        accessibilityLabel={item.title}
      >
        <View style={styles.itemLeft}>
          <View style={[styles.itemIconWrap, { backgroundColor: accent + "16" }]}>
            <MaterialCommunityIcons
              name={item.icon as MaterialCommunityIconName}
              size={18}
              color={accent}
            />
          </View>
          <View style={styles.itemTextBlock}>
            <Text style={styles.itemText} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.itemDescription} numberOfLines={1}>
              {item.description}
            </Text>
          </View>
        </View>
        <View style={styles.itemRight}>
          {item.badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          ) : null}
          <MaterialCommunityIcons name="chevron-right" size={18} color={disabledColor} />
        </View>
      </Pressable>
      {!isLast && <View style={styles.divider} />}
    </View>
  );
};
