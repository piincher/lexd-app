/**
 * UnassignedGoodsSection - Section component for grouping unassigned goods by shipping mode
 * SRP: Display a group of goods with section header
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme } from "@src/constants/Theme";
import { GroupedUnassignedGoods, UnassignedGoodsItem } from "../hooks/useUnassignedGoods";
import { UnassignedGoodsCard } from "./UnassignedGoodsCard";

interface UnassignedGoodsSectionProps {
  section: GroupedUnassignedGoods;
  onGoodsPress: (goodsId: string) => void;
}

export const UnassignedGoodsSection: React.FC<UnassignedGoodsSectionProps> = ({
  section,
  onGoodsPress,
}) => {
  const getModeIcon = () => {
    return section.mode === "AIR" ? "airplane" : "boat";
  };

  const getModeColor = () => {
    return section.mode === "AIR" ? lightTheme.colors.status.info : lightTheme.colors.status.warning;
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={[styles.modeIcon, { backgroundColor: getModeColor() + "20" }]}>
          <Ionicons name={getModeIcon() as any} size={18} color={getModeColor()} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>{section.label}</Text>
          <Text style={styles.headerCount}>{section.goods.length} items</Text>
        </View>
      </View>

      {/* Goods List */}
      <View style={styles.goodsList}>
        {section.goods.map((goods, index) => (
          <UnassignedGoodsCard
            key={goods._id}
            goods={goods}
            index={index}
            onPress={() => onGoodsPress(goods._id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  modeIcon: {
    width: 36,
    height: 36,
    borderRadius: Theme.radius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Theme.spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Theme.neutral[800],
  },
  headerCount: {
    fontSize: 13,
    fontWeight: "500",
    color: Theme.neutral[500],
  },
  goodsList: {
    gap: Theme.spacing.sm,
  },
});
