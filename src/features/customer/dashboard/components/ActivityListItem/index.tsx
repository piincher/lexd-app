import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
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
      style={[styles.activityItem, { backgroundColor: colors.background.card }]}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.primary.light + "20" }]}>
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
  activityItem: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
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
    fontSize: 12,
  },
});

export default ActivityListItem;
