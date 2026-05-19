import { useAppTheme } from '@src/providers/ThemeProvider';
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
  const { colors } = useAppTheme();
  const isActive = sortConfig.field === field;
  const iconName = !sortable || !isActive ? "swap-vertical" : sortConfig.direction === "asc" ? "chevron-up" : "chevron-down";
  const iconColor = !sortable || !isActive ? colors.neutral[400] : colors.primary[600];

  return (
    <TouchableOpacity
      style={{ flex, flexDirection: "row", alignItems: "center", paddingHorizontal: 4 }}
      onPress={() => onSort(field)}
      disabled={!sortable}
      activeOpacity={0.7}
    >
      <Text style={[
        { fontSize: 11, fontWeight: "700", color: colors.primary[700], textTransform: "uppercase", letterSpacing: 0.5 },
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
