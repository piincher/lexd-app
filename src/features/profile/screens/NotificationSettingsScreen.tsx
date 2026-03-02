/**
 * NotificationSettingsScreen
 * Screen for managing notification preferences
 */

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, Card, Divider, Button, List, Portal, Dialog } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";

import { COLORS } from "@src/constants/Colors";
import {
  NotificationType,
  NotificationPreference,
  defaultNotificationPreferences,
  updateNotificationPreferences,
  requestPermissions,
  getPermissionsStatus,
} from "../../../shared/services/notificationService";

// ============================================================================
// Types
// ============================================================================

type QuietHours = {
  enabled: boolean;
  startTime: string;
  endTime: string;
};

// ============================================================================
// Component
// ============================================================================

const NotificationSettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [masterEnabled, setMasterEnabled] = useState(true);
  const [preferences, setPreferences] = useState<NotificationPreference[]>(
    defaultNotificationPreferences
  );
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
  const [quietHours, setQuietHours] = useState<QuietHours>({
    enabled: false,
    startTime: "22:00",
    endTime: "08:00",
  });
  const [showQuietHoursDialog, setShowQuietHoursDialog] = useState(false);

  // ============================================================================
  // Effects
  // ============================================================================

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      // Get current permission status
      const status = await getPermissionsStatus();
      setPermissionStatus(status);
      setMasterEnabled(status === "granted");

      // TODO: Load preferences from backend/storage
      // const savedPreferences = await fetchPreferences();
      // if (savedPreferences) {
      //   setPreferences(savedPreferences);
      // }

      // TODO: Load quiet hours from storage
      // const savedQuietHours = await loadQuietHours();
      // if (savedQuietHours) {
      //   setQuietHours(savedQuietHours);
      // }
    } catch (error) {
      console.error("Error loading notification settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleMasterToggle = async (value: boolean) => {
    if (value) {
      // Request permissions
      const status = await requestPermissions();
      if (status === "granted") {
        setMasterEnabled(true);
        setPermissionStatus("granted");
      } else {
        // Show alert to open settings
        Alert.alert(
          "Permission Required",
          "Please enable notifications in your device settings to receive updates.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => openSettings() },
          ]
        );
      }
    } else {
      // Disable all notifications
      setMasterEnabled(false);
      // TODO: Unregister device from backend
    }
  };

  const handlePreferenceToggle = async (
    type: NotificationType,
    value: boolean
  ) => {
    // Update local state
    setPreferences((prev) =>
      prev.map((pref) => (pref.type === type ? { ...pref, enabled: value } : pref))
    );

    // Update backend
    try {
      const success = await updateNotificationPreferences({ [type]: value });
      if (!success) {
        // Revert on failure
        setPreferences((prev) =>
          prev.map((pref) =>
            pref.type === type ? { ...pref, enabled: !value } : pref
          )
        );
        Alert.alert("Error", "Failed to update preference. Please try again.");
      }
    } catch (error) {
      console.error("Error updating preference:", error);
    }
  };

  const handleQuietHoursToggle = (value: boolean) => {
    setQuietHours((prev) => ({ ...prev, enabled: value }));
    // TODO: Save to storage/backend
  };

  const openSettings = () => {
    // Open device settings
    // Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings();
  };

  const getIconForType = (type: NotificationType): string => {
    const iconMap: Record<NotificationType, string> = {
      ORDER_UPDATE: "package",
      PAYMENT: "credit-card",
      CONTAINER_STATUS: "cube",
      TICKET_REPLY: "message-circle",
      INVOICE: "file-text",
      GENERAL: "bell",
      SYSTEM: "settings",
    };
    return iconMap[type] || "bell";
  };

  const getColorForType = (type: NotificationType): string => {
    const colorMap: Record<NotificationType, string> = {
      ORDER_UPDATE: COLORS.primary,
      PAYMENT: "#10B981",
      CONTAINER_STATUS: "#3B82F6",
      TICKET_REPLY: "#F59E0B",
      INVOICE: "#EF4444",
      GENERAL: "#6B7280",
      SYSTEM: "#8B5CF6",
    };
    return colorMap[type] || COLORS.primary;
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Master Toggle */}
        <Card style={styles.card}>
          <Card.Content style={styles.masterToggle}>
            <View style={styles.masterToggleLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: masterEnabled ? COLORS.primary : "#E5E7EB" },
                ]}
              >
                <Ionicons
                  name={masterEnabled ? "notifications" : "notifications-off"}
                  size={24}
                  color={masterEnabled ? "#FFF" : "#6B7280"}
                />
              </View>
              <View style={styles.masterToggleText}>
                <Text style={styles.masterToggleTitle}>Push Notifications</Text>
                <Text style={styles.masterToggleSubtitle}>
                  {masterEnabled ? "Enabled" : "Disabled"}
                </Text>
              </View>
            </View>
            <Switch
              value={masterEnabled}
              onValueChange={handleMasterToggle}
              trackColor={{ false: "#E5E7EB", true: COLORS.primary + "50" }}
              thumbColor={masterEnabled ? COLORS.primary : "#FFF"}
            />
          </Card.Content>
        </Card>

        {/* Permission Warning */}
        {!masterEnabled && permissionStatus !== "granted" && (
          <View style={styles.warningCard}>
            <MaterialIcons name="info" size={20} color="#F59E0B" />
            <Text style={styles.warningText}>
              Notifications are disabled. Enable them to receive important updates.
            </Text>
          </View>
        )}

        {/* Notification Types */}
        {masterEnabled && (
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
                        onValueChange={(value) =>
                          handlePreferenceToggle(pref.type, value)
                        }
                        trackColor={{ false: "#E5E7EB", true: COLORS.primary + "50" }}
                        thumbColor={pref.enabled ? COLORS.primary : "#FFF"}
                      />
                    )}
                    style={styles.preferenceItem}
                  />
                </React.Fragment>
              ))}
            </Card>

            {/* Quiet Hours */}
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
                    onValueChange={handleQuietHoursToggle}
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
                      onPress={() => setShowQuietHoursDialog(true)}
                      style={styles.editTimeButton}
                    >
                      Edit Times
                    </Button>
                  </View>
                )}
              </Card.Content>
            </Card>
          </>
        )}

        {/* Additional Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            You can customize which notifications you receive at any time.
            Important security alerts will always be delivered.
          </Text>
        </View>
      </ScrollView>

      {/* Quiet Hours Dialog */}
      <Portal>
        <Dialog
          visible={showQuietHoursDialog}
          onDismiss={() => setShowQuietHoursDialog(false)}
        >
          <Dialog.Title>Set Quiet Hours</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Configure the time period when notifications should be silenced.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowQuietHoursDialog(false)}>Cancel</Button>
            <Button
              onPress={() => {
                setShowQuietHoursDialog(false);
                // TODO: Save quiet hours
              }}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.dark,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#FFF",
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
    color: COLORS.dark,
  },
  masterToggleSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  warningCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  warningText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#92400E",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    marginBottom: 8,
    marginLeft: 4,
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
  infoSection: {
    padding: 16,
    marginTop: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 18,
  },
  dialogText: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default NotificationSettingsScreen;
