import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuItem } from '../constants/menuData';

interface MenuCategoryItemProps {
  styles: any;
  item: MenuItem;
  accent: string;
  isDark: boolean;
  disabledColor: string;
  onPress: () => void;
  isLast: boolean;
}

export const MenuCategoryItem: React.FC<MenuCategoryItemProps> = ({
  styles,
  item,
  accent,
  isDark,
  disabledColor,
  onPress,
  isLast,
}) => (
  <View>
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && {
          backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        },
      ]}
    >
      <View style={styles.itemLeft}>
        <View style={[styles.itemBullet, { backgroundColor: accent }]} />
        <Text style={styles.itemText} numberOfLines={1}>
          {item.title}
        </Text>
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
