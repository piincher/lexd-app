import React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";

type FilterStatus = "ALL" | "AWAITING_GOODS" | "PREBOOKING" | "LINKED";

interface FilterTab {
  key: FilterStatus;
  label: string;
  count?: number;
}

interface ManualOrderFilterTabsProps {
  activeFilter: FilterStatus;
  onChange: (filter: FilterStatus) => void;
  counts?: Record<FilterStatus, number>;
}

const TABS: FilterTab[] = [
  { key: "ALL", label: "Tous" },
  { key: "AWAITING_GOODS", label: "En attente" },
  { key: "PREBOOKING", label: "Pré-résa" },
  { key: "LINKED", label: "Liés" },
];

export const ManualOrderFilterTabs: React.FC<ManualOrderFilterTabsProps> = ({
  activeFilter,
  onChange,
  counts,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {TABS.map((tab) => (
        <Pressable
          key={tab.key}
          style={[
            styles.tab,
            activeFilter === tab.key && styles.tabActive,
          ]}
          onPress={() => onChange(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              activeFilter === tab.key && styles.tabTextActive,
            ]}
          >
            {tab.label}
          </Text>
          {counts && counts[tab.key] !== undefined && (
            <View style={[
              styles.badge,
              activeFilter === tab.key && styles.badgeActive,
            ]}>
              <Text style={[
                styles.badgeText,
                activeFilter === tab.key && styles.badgeTextActive,
              ]}>
                {counts[tab.key]}
              </Text>
            </View>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.lightBackground || "#F5F5F5",
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: COLORS.blue,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.darkGrey,
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: "500",
  },
  badge: {
    marginLeft: 6,
    backgroundColor: COLORS.grey + "30",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeActive: {
    backgroundColor: COLORS.white + "30",
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.darkGrey,
  },
  badgeTextActive: {
    color: COLORS.white,
  },
});
