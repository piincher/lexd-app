/**
 * UnassignedGoodsCard - Card component for unassigned goods item
 * SRP: Display single goods info with days waiting highlight
 */

import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Theme, lightTheme } from "@src/constants/Theme";
import { UnassignedGoodsItem } from "../hooks/useUnassignedGoods";

interface UnassignedGoodsCardProps {
  goods: UnassignedGoodsItem;
  index: number;
  onPress: () => void;
}

export const UnassignedGoodsCard: React.FC<UnassignedGoodsCardProps> = ({
  goods,
  index,
  onPress,
}) => {
  const clientName = (() => {
    if (typeof goods.clientId === "object" && goods.clientId) {
      return `${goods.clientId.firstName} ${goods.clientId.lastName}`;
    }
    return "Unknown Client";
  })();

  const receivedDate = goods.receivedAt
    ? new Date(goods.receivedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Unknown";

  const hasPhoto = goods.photos && goods.photos.length > 0;

  // Warning color for items waiting too long
  const getWaitingColor = () => {
    if (goods.daysWaiting >= 14) return lightTheme.colors.status.error;
    if (goods.daysWaiting >= 7) return lightTheme.colors.status.warning;
    return lightTheme.colors.status.success;
  };

  return (
    <Animated.View entering={FadeInUp.delay(index * 50).springify()}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
        {/* Goods Image */}
        <View style={styles.imageContainer}>
          {hasPhoto ? (
            <Image source={{ uri: goods.photos[0] }} style={styles.image} />
          ) : (
            <LinearGradient colors={["#F3F0FF", "#E8E4F3"]} style={styles.placeholderImage}>
              <Ionicons name="cube" size={24} color={Theme.primary[400]} />
            </LinearGradient>
          )}
        </View>

        {/* Goods Info */}
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.goodsId}>{goods.goodsId}</Text>
            <View style={[styles.waitingBadge, { backgroundColor: getWaitingColor() + "20" }]}>
              <Ionicons name="time-outline" size={12} color={getWaitingColor()} />
              <Text style={[styles.waitingText, { color: getWaitingColor() }]}>
                {goods.daysWaiting}d
              </Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={1}>
            {goods.description || "No description"}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="person-outline" size={12} color={Theme.neutral[400]} />
              <Text style={styles.metaText} numberOfLines={1}>
                {clientName}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={12} color={Theme.neutral[400]} />
              <Text style={styles.metaText}>{receivedDate}</Text>
            </View>
          </View>
        </View>

        {/* Arrow */}
        <Ionicons name="chevron-forward" size={20} color={Theme.neutral[300]} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: Theme.radius.lg,
    overflow: "hidden",
    marginRight: Theme.spacing.md,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  goodsId: {
    fontSize: 14,
    fontWeight: "700",
    color: Theme.neutral[800],
  },
  waitingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
  },
  waitingText: {
    fontSize: 12,
    fontWeight: "700",
  },
  description: {
    fontSize: 13,
    color: Theme.neutral[600],
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Theme.neutral[500],
    maxWidth: 100,
  },
});
