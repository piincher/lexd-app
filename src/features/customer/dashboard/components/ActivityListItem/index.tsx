import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RADIUS, RAIL_WIDTH, HAIRLINE } from "@src/shared/ui/designLanguage";
import { ActivityItem } from "../../types";

interface ActivityListItemProps {
  item: ActivityItem;
  index: number;
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const ActivityListItem: React.FC<ActivityListItemProps> = ({
  item,
  index,
}) => {
  const { colors } = useAppTheme();

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 50).duration(400)}
      style={[
        styles.activityItem,
        { backgroundColor: colors.background.card, borderColor: colors.border },
      ]}
    >
      <View style={[styles.rail, { backgroundColor: colors.primary.main }]} pointerEvents="none" />

      <View style={[styles.iconContainer, { backgroundColor: colors.primary.main + "14" }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text.primary }]}>{item.title}</Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          {item.description}
        </Text>
        <Text style={[styles.timestamp, { color: colors.text.disabled }]}>
          {formatTimestamp(item.timestamp)}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Border-first row: the shadow/elevation stack is intentionally gone.
  activityItem: {
    flexDirection: "row",
    padding: 14,
    paddingLeft: 14 + RAIL_WIDTH,
    borderRadius: RADIUS.card,
    borderWidth: HAIRLINE,
    marginBottom: 10,
    overflow: "hidden",
  },
  rail: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: RAIL_WIDTH,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.control,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  timestamp: {
    // Timestamps read as manifest metadata.
    fontSize: 9.5,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
});

export default ActivityListItem;
