import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Badge } from "@src/shared/ui/Badge";
import { AirwayBill, AirwayBillStatus } from "../../types";
import { styles } from "./AirwayBillCard.styles";
import { AirwayBillRoute } from "./AirwayBillRoute";
import { AirwayBillCapacityBar } from "./AirwayBillCapacityBar";

interface AirwayBillCardProps {
  item: AirwayBill;
  onPress: (id: string) => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
};

export const AirwayBillCard: React.FC<AirwayBillCardProps> = ({ item, onPress }) => {
  const { colors } = useAppTheme();
  const STATUS_CONFIG = useMemo<Record<
    AirwayBillStatus,
    { label: string; variant: "default" | "primary" | "success" | "warning" | "error" | "info" | "custom"; color: string }
  >>(() => ({
    CREATED: { label: "Créé", variant: "custom", color: colors.text.secondary },
    PACKING: { label: "Préparation", variant: "custom", color: colors.status.info },
    READY_FOR_DEPARTURE: { label: "Prêt au départ", variant: "custom", color: colors.status.warning },
    IN_TRANSIT: { label: "En transit", variant: "info", color: colors.status.info },
    ARRIVED: { label: "Arrivé", variant: "success", color: colors.status.success },
    READY_FOR_PICKUP: { label: "Prêt", variant: "custom", color: colors.accent.mint },
    DELIVERED: { label: "Livré", variant: "custom", color: colors.text.disabled },
  }), [colors]);
  const statusConfig = STATUS_CONFIG[item.status];
  const departureDate = formatDate(item.departureDate);
  const flightLabel = [item.airline, item.flightNumber].filter(Boolean).join(" · ") || "Vol à confirmer";

  const capacityPercentage = item.capacityWeight > 0 ? (item.totalWeight / item.capacityWeight) * 100 : 0;
  const capacityColor =
    capacityPercentage > 100
      ? colors.status.error
      : capacityPercentage >= 80
      ? colors.status.warning
      : colors.status.success;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(item._id)}
      style={[styles.container, { backgroundColor: colors.background.card, borderLeftColor: statusConfig.color, shadowColor: colors.neutral[900] }]}
      accessibilityLabel={`Lettre de transport ${item.awbNumber}, statut ${statusConfig.label}`}
    >
      <View style={styles.headerRow}>
        <View style={styles.awbContainer}>
          <MaterialCommunityIcons name="file-document-outline" size={18} color={colors.primary.main} />
          <Text style={[styles.awbNumber, { color: colors.text.primary }]}>{item.awbNumber}</Text>
        </View>
        <Badge
          label={statusConfig.label}
          variant={statusConfig.variant}
          backgroundColor={`${statusConfig.color}18`}
          textColor={statusConfig.color}
        />
      </View>

      <AirwayBillRoute
        departureAirport={item.departureAirport || "---"}
        arrivalAirport={item.arrivalAirport || "---"}
        flightLabel={flightLabel}
        colors={colors}
      />

      <View style={styles.footerRow}>
        <View style={styles.statPills}>
          <View style={[styles.statPill, { backgroundColor: colors.background.paper }]}>
            <MaterialCommunityIcons name="package-variant" size={13} color={colors.primary.main} />
            <Text style={[styles.statPillText, { color: colors.text.secondary }]}>{item.totalPackages} colis</Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: colors.background.paper }]}>
            <MaterialCommunityIcons name="weight-kilogram" size={13} color={colors.primary.main} />
            <Text style={[styles.statPillText, { color: colors.text.secondary }]}>{item.totalWeight.toFixed(1)} kg</Text>
          </View>
        </View>
        {departureDate && (
          <View style={styles.dateContainer}>
            <MaterialCommunityIcons name="calendar-outline" size={12} color={colors.text.muted} />
            <Text style={[styles.dateText, { color: colors.text.muted }]}>{departureDate}</Text>
          </View>
        )}
      </View>

      {item.capacityWeight > 0 && (
        <AirwayBillCapacityBar
          totalWeight={item.totalWeight}
          capacityWeight={item.capacityWeight}
          capacityPercentage={capacityPercentage}
          capacityColor={capacityColor}
          colors={colors}
        />
      )}
    </TouchableOpacity>
  );
};

export default AirwayBillCard;
