/**
 * QuietHoursSettings Component
 * Do not disturb hours configuration
 */

import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@src/constants/Colors";
import { QuietHours } from "../../hooks/useNotificationSettings";

interface QuietHoursSettingsProps {
  quietHours: QuietHours;
  onToggle: (value: boolean) => void;
  onEditPress: () => void;
}

export const QuietHoursSettings: React.FC<QuietHoursSettingsProps> = ({
  quietHours,
  onToggle,
  onEditPress,
}) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Quiet Hours</Text>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.quietHoursHeader}>
            <View style={styles.quietHoursLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#E0E7FF" }]}>
                <Ionicons name="moon" size={24} color="#6366F1" />
              </View>
              <View>
                <Text style={styles.quietHoursTitle}>Quiet Hours</Text>
                <Text style={styles.quietHoursSubtitle}>
                  {quietHours.enabled
                    ? `${quietHours.startTime} - ${quietHours.endTime}`
                    : "Disabled"}
                </Text>
              </View>
            </View>
            <Switch
              value={quietHours.enabled}
              onValueChange={onToggle}
              trackColor={{ false: "#E5E7EB", true: COLORS.primary + "50" }}
              thumbColor={quietHours.enabled ? COLORS.primary : "#FFF"}
            />
          </View>

          {quietHours.enabled && (
            <View style={styles.quietHoursDetails}>
              <Text style={styles.quietHoursDescription}>
                Notifications will be silenced during these hours. Emergency
                alerts may still come through.
              </Text>
              <Button
                mode="outlined"
                onPress={onEditPress}
                style={styles.editTimeButton}
                textColor={COLORS.primary}
              >
                Edit Times
              </Button>
            </View>
          )}
        </Card.Content>
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
  quietHoursHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quietHoursLeft: {
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
  quietHoursTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
  },
  quietHoursSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  quietHoursDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  quietHoursDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
    lineHeight: 20,
  },
  editTimeButton: {
    borderColor: COLORS.primary,
  },
});
