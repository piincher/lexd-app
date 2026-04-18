/**
 * UnassignedGoodsAlert - Alert card for unassigned goods
 * SRP: Display unassigned goods summary with shipping mode and age breakdown ONLY
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { styles } from "./UnassignedGoodsAlert.styles";

interface UnassignedGoodsAlertProps {
  total: number;
  byShippingMode: { AIR: number; SEA: number };
  byAge: { "0-3": number; "4-7": number; "8+": number };
  onPress: () => void;
}

export const UnassignedGoodsAlert: React.FC<UnassignedGoodsAlertProps> = ({
  total,
  byShippingMode,
  byAge,
  onPress,
}) => {
  const hasUnassigned = total > 0;
  const accentColor = hasUnassigned ? COLORS.orange : COLORS.success;
  const backgroundColor = accentColor + "20";

  const shippingModes = [
    {
      key: "AIR" as const,
      label: "Air",
      icon: "airplane-outline" as const,
      value: byShippingMode.AIR,
    },
    {
      key: "SEA" as const,
      label: "Sea",
      icon: "boat-outline" as const,
      value: byShippingMode.SEA,
    },
  ];

  const ageRanges = [
    { key: "0-3" as const, label: "0-3d", value: byAge["0-3"], critical: false },
    { key: "4-7" as const, label: "4-7d", value: byAge["4-7"], critical: false },
    { key: "8+" as const, label: "8+d", value: byAge["8+"], critical: true },
  ];

  return (
    <Card style={[styles.card, { borderLeftColor: accentColor }]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.touchable}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor }]}>
            <Ionicons name="cube-outline" size={24} color={accentColor} />
          </View>
          <Text style={styles.title}>
            {hasUnassigned ? "Unassigned Goods" : "All Goods Assigned"}
          </Text>
        </View>

        {hasUnassigned ? (
          <>
            {/* Total Count */}
            <View style={styles.countContainer}>
              <Text style={[styles.count, { color: accentColor }]}>{total}</Text>
              <Text style={styles.countLabel}>Unassigned Items</Text>
            </View>

            {/* Breakdown */}
            <View style={styles.breakdownContainer}>
              {/* Shipping Mode Breakdown */}
              <View style={styles.breakdownRow}>
                {shippingModes.map((mode) => (
                  <View key={mode.key} style={styles.breakdownItem}>
                    <View
                      style={[
                        styles.breakdownIconContainer,
                        { backgroundColor: COLORS.FeatherWhite },
                      ]}
                    >
                      <Ionicons name={mode.icon} size={14} color={COLORS.grey} />
                    </View>
                    <View style={styles.breakdownTextContainer}>
                      <Text style={styles.breakdownValue}>{mode.value}</Text>
                      <Text style={styles.breakdownLabel}>{mode.label}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Age Breakdown */}
              <View style={styles.ageContainer}>
                {ageRanges.map((age) => (
                  <View key={age.key} style={styles.ageItem}>
                    <Text
                      style={[
                        styles.ageValue,
                        age.critical && age.value > 0 && styles.ageValueCritical,
                      ]}
                    >
                      {age.value}
                    </Text>
                    <Text
                      style={[
                        styles.ageLabel,
                        age.critical && age.value > 0 && styles.ageLabelCritical,
                      ]}
                    >
                      {age.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>View All</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.grey} />
            </View>
          </>
        ) : (
          <>
            {/* Success State */}
            <View style={styles.successBanner}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.successText}>No unassigned goods pending</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Voir les marchandises</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.grey} />
            </View>
          </>
        )}
      </TouchableOpacity>
    </Card>
  );
};

export default UnassignedGoodsAlert;
