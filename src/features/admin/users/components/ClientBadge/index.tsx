import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { ClientBadge as BadgeType } from "../../hooks/useClientBadges";

interface ClientBadgeProps {
  badges: BadgeType[];
}

export const ClientBadge: React.FC<ClientBadgeProps> = ({ badges }) => {
  if (badges.length === 0) return null;

  return (
    <View style={styles.container}>
      {badges.map((badge, i) => (
        <Animated.View key={badge.label} entering={FadeIn.delay(i * 100)} style={[styles.badge, { backgroundColor: badge.bgColor }]}>
          <Ionicons name={badge.icon as any} size={10} color={badge.color} />
          <Text style={[styles.text, { color: badge.color }]}>{badge.label}</Text>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 6,
    marginTop: 6,
  },
  badge: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  text: {
    fontSize: 10,
    fontWeight: "700" as const,
  },
};
