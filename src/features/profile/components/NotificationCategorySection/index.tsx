/**
 * NotificationCategorySection Component
 * Category toggles for notification types
 */

import React, { useMemo } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { Card, Text, Divider, List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import {
  NotificationType,
  NotificationPreference,
} from "@src/shared/services/notificationService";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface NotificationCategorySectionProps {
  preferences: NotificationPreference[];
  onToggle: (type: NotificationType, value: boolean) => void;
}

const getIconForType = (type: NotificationType): IoniconsName => {
  const iconMap: Record<NotificationType, IoniconsName> = {
    ORDER_UPDATE: "cube",
    PAYMENT: "card",
    CONTAINER_STATUS: "archive",
    TICKET_REPLY: "chatbubble-ellipses",
    TICKET_CREATED: "ticket",
    INVOICE: "document-text",
    CERTIFICATE_ISSUED: "trophy",
    GENERAL: "notifications",
    SYSTEM: "settings",
  };
  return iconMap[type] || "notifications";
};

export const NotificationCategorySection: React.FC<NotificationCategorySectionProps> = ({
  preferences,
  onToggle,
}) => {
  const { colors } = useAppTheme();

  const getColorForType = (type: NotificationType): string => {
    const colorMap: Record<NotificationType, string> = {
      ORDER_UPDATE: colors.primary.main,
      PAYMENT: colors.status.success,
      CONTAINER_STATUS: colors.status.info,
      TICKET_REPLY: colors.status.warning,
      TICKET_CREATED: colors.status.warning,
      INVOICE: colors.status.error,
      CERTIFICATE_ISSUED: colors.accent.gold,
      GENERAL: colors.text.secondary,
      SYSTEM: colors.primary.main,
    };
    return colorMap[type] || colors.primary.main;
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        sectionTitle: {
          fontSize: 14,
          fontWeight: "600",
          color: colors.text.secondary,
          textTransform: "uppercase",
          marginBottom: 8,
          marginLeft: 4,
        },
        card: {
          marginBottom: 16,
          borderRadius: 12,
          elevation: 2,
          backgroundColor: colors.background.default,
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
      }),
    [colors]
  );

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
                  <Ionicons
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
                  trackColor={{ false: colors.neutral[200], true: colors.primary.main + "50" }}
                  thumbColor={pref.enabled ? colors.primary.main : colors.background.default}
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
