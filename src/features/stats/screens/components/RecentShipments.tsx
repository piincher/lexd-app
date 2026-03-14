import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import styles from "../Stats.styles";

interface Order {
  code: string;
  createdAt: string;
  status: string;
}

interface RecentShipmentsProps {
  shipments: Order[];
}

const StatusBadge = ({ status }: { status: string }) => {
  let badgeColor = COLORS.placeHolder;
  let displayText = status;

  if (status === "Active") {
    badgeColor = COLORS.orange;
    displayText = "Chargé";
  } else if (status === "In Transit") {
    badgeColor = COLORS.green;
    displayText = "En Transit";
  } else if (status === "Delivered") {
    badgeColor = COLORS.redShade;
    displayText = "Livré";
  }

  return (
    <View style={[styles.statusBadge, { backgroundColor: badgeColor }]}>
      <Text style={styles.statusText}>{displayText}</Text>
    </View>
  );
};

export const RecentShipments: React.FC<RecentShipmentsProps> = ({ shipments }) => {
  return (
    <Card style={[styles.recentCard, { backgroundColor: COLORS.white }]}>
      <Text style={[styles.sectionTitle, { color: COLORS.blue }]}>
        Les expeditions recentes
      </Text>
      {shipments.length > 0 ? (
        shipments.map((order) => (
          <View key={order.code} style={styles.shipmentRow}>
            <View style={styles.shipmentInfo}>
              <Text style={[styles.shipmentId, { color: COLORS.blue }]}>
                #{order.code}
              </Text>
              <Text style={[styles.shipmentDate, { color: COLORS.black }]}>
                {new Date(order.createdAt).toDateString()}
              </Text>
            </View>
            <StatusBadge status={order.status} />
          </View>
        ))
      ) : (
        <Text style={[styles.emptyText, { color: COLORS.redShade, marginTop: 8 }]}>
          Pas d'expeditions
        </Text>
      )}
    </Card>
  );
};

export default RecentShipments;
