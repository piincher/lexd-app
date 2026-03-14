/**
 * FilterPanelModal - Slide-in filter panel modal
 * Contains SearchFilters component with animation
 */

import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { SearchFilters } from "./SearchFilters";
import { SearchFilters as SearchFiltersType, FilterPreset } from "../api/searchApi";
import { EntityType } from "../hooks/useGlobalSearch";

const { width } = Dimensions.get("window");

interface FilterPanelModalProps {
  visible: boolean;
  onClose: () => void;
  slideAnim: Animated.Value;
  entity: EntityType;
  filters: SearchFiltersType;
  presets: FilterPreset[] | undefined;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onReset: () => void;
  onPresetSelect: (preset: FilterPreset) => void;
}

export const FilterPanelModal: React.FC<FilterPanelModalProps> = ({
  visible,
  onClose,
  slideAnim,
  entity,
  filters,
  presets,
  onFiltersChange,
  onReset,
  onPresetSelect,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <Animated.View
          style={[
            styles.panel,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <SearchFilters
            entity={entity}
            filters={filters}
            onFiltersChange={onFiltersChange}
            onReset={onReset}
            presets={presets || []}
            onPresetSelect={onPresetSelect}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={Theme.neutral[600]} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  panel: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.85,
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    ...Theme.shadows.xl,
  },
  closeButton: {
    position: "absolute",
    top: Theme.spacing.lg,
    right: Theme.spacing.lg,
    width: 40,
    height: 40,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral[100],
    justifyContent: "center",
    alignItems: "center",
  },
});
