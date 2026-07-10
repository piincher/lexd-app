/**
 * DashboardCollapsibleSection - Reusable collapsible dashboard card
 * Pure UI component with header, icon, and expand/collapse affordance.
 */

import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Card } from "@src/shared/ui/Card";

export interface DashboardCollapsibleSectionProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  testID?: string;
}

export const DashboardCollapsibleSection: React.FC<DashboardCollapsibleSectionProps> = ({
  title,
  icon,
  children,
  defaultExpanded = true,
  testID,
}) => {
  const { colors } = useAppTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Card variant="elevated" padding="medium" style={styles.card} testID={testID}>
      <Pressable
        onPress={() => setExpanded((prev) => !prev)}
        style={styles.header}
        accessibilityLabel={`${title}, ${expanded ? "Réduire" : "Développer"}`}
        accessibilityRole="button"
      >
        <View style={styles.titleRow}>
          <Ionicons name={icon} size={18} color={colors.primary.main} style={styles.icon} />
          <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
        </View>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.text.secondary}
        />
      </Pressable>
      {expanded && <View style={styles.content}>{children}</View>}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    marginTop: 14,
  },
});

export default DashboardCollapsibleSection;
