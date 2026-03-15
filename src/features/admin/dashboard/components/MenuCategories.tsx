/**
 * MenuCategories - Menu categories list component
 * SRP: Display menu categories ONLY
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Card, Badge, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { MENU_CATEGORIES } from "../constants/menuData";

export const MenuCategories: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>All Features</Text>
      {MENU_CATEGORIES.map((category) => (
        <Card key={category.id} style={styles.card}>
          <View style={styles.header}>
            <MaterialCommunityIcons name={category.icon as any} size={24} color={COLORS.blue} />
            <Text style={styles.title}>{category.title}</Text>
          </View>
          <Divider />
          {category.items.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              isLast={index === category.items.length - 1}
              onPress={() => navigation.navigate(item.route as never)}
            />
          ))}
        </Card>
      ))}
    </View>
  );
};

interface MenuItemProps {
  item: { id: string; title: string; route: string; badge?: number };
  isLast: boolean;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isLast, onPress }) => (
  <>
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.itemText}>{item.title}</Text>
      <View style={styles.itemRight}>
        {item.badge ? (
          <Badge style={styles.badge} size={20}>
            {item.badge}
          </Badge>
        ) : null}
        <MaterialIcons name="chevron-right" size={24} color={COLORS.grey} />
      </View>
    </TouchableOpacity>
    {!isLast && <Divider style={{ marginLeft: 16 }} />}
  </>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginBottom: 12,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    paddingVertical: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginLeft: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DarkGrey,
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    backgroundColor: COLORS.danger,
    marginRight: 8,
  },
});

export default MenuCategories;
