/**
 * BadgeCircle Sub-component
 * Displays individual milestone badge
 */

import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Milestone } from "../../api/milestoneApi";
import { getStyles, iconMap } from "./MilestoneBadges.styles";

interface BadgeCircleProps {
  milestone: Milestone;
  isCurrent: boolean;
  isDark: boolean;
  colors: any;
}

export const BadgeCircle: React.FC<BadgeCircleProps> = ({ milestone, isCurrent, isDark, colors }) => {
  const styles = getStyles(colors);
  const iconName = iconMap[milestone.icon] || "help-circle";
  const alpha = isDark ? "rgba(255,255," : "rgba(0,0,";
  return (
    <View style={styles.badgeWrapper}>
      <View
        style={[
          styles.badgeCircle,
          {
            backgroundColor: milestone.unlocked
              ? `${milestone.color}20`
              : isDark ? `${alpha}0.05)` : colors.background.paper,
            borderColor: milestone.unlocked
              ? milestone.color
              : isDark ? `${alpha}0.15)` : colors.border,
          },
          isCurrent && {
            borderWidth: 2.5,
            shadowColor: milestone.color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 10,
            elevation: 6,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={milestone.unlocked ? iconName : "lock"}
          size={milestone.unlocked ? 22 : 18}
          color={milestone.unlocked ? milestone.color : isDark ? `${alpha}0.25)` : colors.text.disabled}
        />
      </View>
      <Text
        style={[
          styles.badgeLabel,
          {
            color: milestone.unlocked
              ? isDark ? `${alpha}0.8)` : colors.text.primary
              : isDark ? `${alpha}0.3)` : colors.text.disabled,
          },
        ]}
        numberOfLines={1}
      >
        {milestone.name}
      </Text>
    </View>
  );
};
