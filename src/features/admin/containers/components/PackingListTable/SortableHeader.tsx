import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import type { SortField, SortConfig } from "./usePackingListSort";

interface SortableHeaderProps {
  field: SortField;
  label: string;
  flex: number;
  align?: "left" | "center" | "right";
  sortConfig: SortConfig;
  sortable?: boolean;
  onSort: (field: SortField) => void;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  field, label, flex, align = "left", sortConfig, sortable = true, onSort,
}) => {
  const isActive = sortConfig.field === field;
  const iconName = !sortable || !isActive ? "swap-vertical" : sortConfig.direction === "asc" ? "chevron-up" : "chevron-down";
  const iconColor = !sortable || !isActive ? Theme.neutral[400] : Theme.primary[600];

  return (
    <TouchableOpacity
      style={{ flex, flexDirection: "row", alignItems: "center", paddingHorizontal: 4 }}
      onPress={() => onSort(field)}
      disabled={!sortable}
      activeOpacity={0.7}
    >
      <Text style={[
        { fontSize: 11, fontWeight: "700", color: Theme.primary[700], textTransform: "uppercase", letterSpacing: 0.5 },
        align === "center" && { textAlign: "center" },
        align === "right" && { textAlign: "right" },
      ]}>
        {label}
      </Text>
      <View style={{ marginLeft: 2 }}>
        <Ionicons name={iconName} size={14} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
};
