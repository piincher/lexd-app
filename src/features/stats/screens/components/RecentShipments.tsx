import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { createStyles } from "../Stats.styles";

interface Order {
  code: string;
  createdAt: string;
  status: string;
}

interface RecentShipmentsProps {
  shipments: Order[];
}

export const RecentShipments: React.FC<RecentShipmentsProps> = ({ shipments }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const StatusBadge = ({ status }: { status: string }) => {
    let badgeColor = colors.text.muted;
    let displayText = status;

    if (status === "Active") {
      badgeColor = colors.status.warning;
      displayText = "Chargé";
    } else if (status === "In Transit") {
      badgeColor = colors.status.success;
      displayText = "En Transit";
    } else if (status === "Delivered") {
      badgeColor = colors.status.error;
      displayText = "Livré";
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor: badgeColor }]}>
        <Text style={styles.statusText}>{displayText}</Text>
      </View>
    );
  };

  return (
    <Card style={[styles.recentCard, { backgroundColor: colors.background.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.primary.main }]}>
        Les expeditions recentes
      </Text>
      {shipments.length > 0 ? (
        shipments.map((order) => (
          <View key={order.code} style={styles.shipmentRow}>
            <View style={styles.shipmentInfo}>
              <Text style={[styles.shipmentId, { color: colors.primary.main }]}>
                #{order.code}
              </Text>
              <Text style={[styles.shipmentDate, { color: colors.text.primary }]}>
                {new Date(order.createdAt).toDateString()}
              </Text>
            </View>
            <StatusBadge status={order.status} />
          </View>
        ))
      ) : (
        <Text style={[styles.emptyText, { color: colors.status.error, marginTop: 8 }]}>
          Pas d'expeditions
        </Text>
      )}
    </Card>
  );
};

export default RecentShipments;
