/**
 * SearchInputHeader - Search bar with entity tabs and export button
 * Composes: Header title, entity tabs, search bar
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "@src/constants/Theme";
import { GlobalSearchBar } from "./GlobalSearchBar";
import { EntityType, ENTITY_TABS } from "../hooks/useGlobalSearch";

interface SearchInputHeaderProps {
  selectedEntity: EntityType;
  onEntityChange: (entity: EntityType) => void;
  onSearch: (query: string) => void;
  onExport: () => void;
}

export const SearchInputHeader: React.FC<SearchInputHeaderProps> = ({
  selectedEntity,
  onEntityChange,
  onSearch,
  onExport,
}) => {
  return (
    <>
      {/* Header */}
      <LinearGradient colors={Theme.gradients.glass} style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Recherche globale</Text>
          <TouchableOpacity style={styles.exportButton} onPress={onExport}>
            <Ionicons name="download-outline" size={20} color={Theme.primary[500]} />
          </TouchableOpacity>
        </View>

        {/* Entity Tabs */}
        <View style={styles.tabsContainer}>
          {ENTITY_TABS.map((tab) => {
            const isActive = selectedEntity === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => onEntityChange(tab.key)}
              >
                {isActive && (
                  <LinearGradient
                    colors={Theme.gradients.primary}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                )}
                <Ionicons
                  name={tab.icon as any}
                  size={16}
                  color={isActive ? "#FFF" : Theme.neutral[500]}
                  style={styles.tabIcon}
                />
                <Text
                  style={[styles.tabText, isActive && styles.tabTextActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <GlobalSearchBar
          onSearch={onSearch}
          placeholder={`Rechercher ${selectedEntity}...`}
          showSuggestions={true}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.lg,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Theme.neutral[800],
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.colors.background.card,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.sm,
  },
  tabsContainer: {
    flexDirection: "row",
    gap: Theme.spacing.sm,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.colors.background.card,
    ...Theme.shadows.sm,
    overflow: "hidden",
  },
  tabActive: {
    ...Theme.shadows.md,
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.neutral[600],
  },
  tabTextActive: {
    color: "#FFF",
  },
  searchContainer: {
    marginTop: -Theme.spacing.lg,
    zIndex: 100,
  },
});
