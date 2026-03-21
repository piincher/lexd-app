/**
 * NotificationCategorySection Component
 * Category toggles for notification types
 */

import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import { Card, Text, Divider, List } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

import { COLORS } from "@src/constants/Colors";
import {
  NotificationType,
  NotificationPreference,
} from "@src/shared/services/notificationService";

interface NotificationCategorySectionProps {
  preferences: NotificationPreference[];
  onToggle: (type: NotificationType, value: boolean) => void;
}

const getIconForType = (type: NotificationType): string => {
  const iconMap: Record<NotificationType, string> = {
    ORDER_UPDATE: "package",
    PAYMENT: "creditcard",
    CONTAINER_STATUS: "box",
    TICKET_REPLY: "message1",
    INVOICE: "filetext1",
    CERTIFICATE_ISSUED: "trophy",
    GENERAL: "bells",
    SYSTEM: "setting",
  };
  return iconMap[type] || "bells";
};

const getColorForType = (type: NotificationType): string => {
  const colorMap: Record<NotificationType, string> = {
    ORDER_UPDATE: COLORS.primary,
    PAYMENT: "#10B981",
    CONTAINER_STATUS: "#3B82F6",
    TICKET_REPLY: "#F59E0B",
    INVOICE: "#EF4444",
    CERTIFICATE_ISSUED: "#F4D03F",
    GENERAL: "#6B7280",
    SYSTEM: "#8B5CF6",
  };
  return colorMap[type] || COLORS.primary;
};

export const NotificationCategorySection: React.FC<NotificationCategorySectionProps> = ({
  preferences,
  onToggle,
}) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Notification Types</Text>
      <Card style={styles.card}>
        {preferences.map((pref, index) => (
          <React.Fragment key={pref.type}>
            {index > 0 && <Divider />}
            <List.Item
              title={pref.label}
              description={pref.description}
              left={() => (
                <View
                  style={[
                    styles.typeIcon,
                    { backgroundColor: getColorForType(pref.type) + "20" },
                  ]}
                >
                  <AntDesign
                    name={getIconForType(pref.type)}
                    size={20}
                    color={getColorForType(pref.type)}
                  />
                </View>
              )}
              right={() => (
                <Switch
                  value={pref.enabled}
                  onValueChange={(value) => onToggle(pref.type, value)}
                  trackColor={{ false: "#E5E7EB", true: COLORS.primary + "50" }}
                  thumbColor={pref.enabled ? COLORS.primary : "#FFF"}
                />
              )}
              style={styles.preferenceItem}
            />
          </React.Fragment>
        ))}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#FFF",
  },
  preferenceItem: {
    paddingVertical: 12,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
