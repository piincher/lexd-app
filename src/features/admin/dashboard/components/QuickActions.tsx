/**
 * QuickActions - Quick action buttons grid
 * SRP: Display quick action buttons ONLY
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  color: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "qa1",
    title: "Receive Goods",
    subtitle: "New merchandise",
    icon: "package",
    route: "ReceiveGoods",
    color: "#4CAF50",
  },
  {
    id: "qa2",
    title: "Add Order",
    subtitle: "Create new order",
    icon: "plus-circle",
    route: "ChooseShippingMethod",
    color: "#2196F3",
  },
  {
    id: "qa3",
    title: "Containers",
    subtitle: "Manage containers",
    icon: "truck-delivery",
    route: "ContainerList",
    color: "#FF9800",
  },
  {
    id: "qa4",
    title: "Scan QR",
    subtitle: "Quick scan",
    icon: "qrcode-scan",
    route: "ScanQRCode",
    color: "#9C27B0",
  },
];

export const QuickActions: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.item}
            onPress={() => navigation.navigate(action.route as never)}
          >
            <View style={[styles.icon, { backgroundColor: action.color + "20" }]}>
              <MaterialCommunityIcons name={action.icon as any} size={28} color={action.color} />
            </View>
            <Text style={styles.title}>{action.title}</Text>
            <Text style={styles.subtitle}>{action.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "23%",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    elevation: 2,
    marginBottom: 8,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 9,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 2,
  },
});

export default QuickActions;
