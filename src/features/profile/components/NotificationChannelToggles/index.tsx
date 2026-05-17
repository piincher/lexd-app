/**
 * NotificationChannelToggles Component
 * Master toggle for push notifications with permission warning
 */

import React, { useMemo } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { Card, Text } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { useAppTheme } from "@src/providers/ThemeProvider";

interface NotificationChannelTogglesProps {
  enabled: boolean;
  permissionStatus: string | null;
  onToggle: (value: boolean) => void;
}

export const NotificationChannelToggles: React.FC<NotificationChannelTogglesProps> = ({
  enabled,
  permissionStatus,
  onToggle,
}) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginBottom: 16,
          borderRadius: 12,
          elevation: 2,
          backgroundColor: colors.background.default,
        },
        masterToggle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        masterToggleLeft: {
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        },
        iconContainer: {
          width: 48,
          height: 48,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
        },
        masterToggleText: {
          marginLeft: 16,
        },
        masterToggleTitle: {
          fontSize: 16,
          fontWeight: "600",
          color: colors.text.primary,
        },
        masterToggleSubtitle: {
          fontSize: 14,
          color: colors.text.secondary,
          marginTop: 2,
        },
        warningCard: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.background.paper,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: colors.status.warning,
        },
        warningText: {
          flex: 1,
          marginLeft: 8,
          fontSize: 14,
          color: colors.feedback.warningDark,
        },
      }),
    [colors]
  );

  return (
    <>
      <Card style={styles.card}>
        <Card.Content style={styles.masterToggle}>
          <View style={styles.masterToggleLeft}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: enabled ? colors.primary.main : colors.neutral[200] },
              ]}
            >
              <Ionicons
                name={enabled ? "notifications" : "notifications-off"}
                size={24}
                color={enabled ? colors.background.default : colors.text.secondary}
              />
            </View>
            <View style={styles.masterToggleText}>
              <Text style={styles.masterToggleTitle}>Push Notifications</Text>
              <Text style={styles.masterToggleSubtitle}>
                {enabled ? "Enabled" : "Disabled"}
              </Text>
            </View>
          </View>
          <Switch
            value={enabled}
            onValueChange={onToggle}
            trackColor={{ false: colors.neutral[200], true: colors.primary.main + "50" }}
            thumbColor={enabled ? colors.primary.main : colors.background.default}
          />
        </Card.Content>
      </Card>

      {!enabled && permissionStatus !== "granted" && (
        <View style={styles.warningCard}>
          <MaterialIcons name="info" size={20} color={colors.status.warning} />
          <Text style={styles.warningText}>
            Notifications are disabled. Enable them to receive important updates.
          </Text>
        </View>
      )}
    </>
  );
};
