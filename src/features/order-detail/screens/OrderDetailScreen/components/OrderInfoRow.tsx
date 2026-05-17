import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface OrderInfoRowProps {
  icon: string;
  label: string;
  value?: string | null;
  trailing?: React.ReactNode;
  optional?: boolean;
}

export const OrderInfoRow: React.FC<OrderInfoRowProps> = ({
  icon,
  label,
  value,
  trailing,
  optional,
}) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        },
        rowLeft: {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        },
        label: {
          fontSize: 13,
          color: colors.text.secondary,
        },
        value: {
          fontSize: 14,
          fontWeight: "600",
          color: colors.text.primary,
          maxWidth: "50%",
          textAlign: "right",
        },
        divider: {
          backgroundColor: colors.border,
        },
      }),
    [colors]
  );

  if (optional && !value && !trailing) return null;
  return (
    <>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <MaterialCommunityIcons name={icon as any} size={18} color={colors.text.secondary} />
          <Text style={styles.label}>{label}</Text>
        </View>
        {trailing || (
          <Text style={styles.value} numberOfLines={1}>
            {value || "—"}
          </Text>
        )}
      </View>
      <Divider style={styles.divider} />
    </>
  );
};
