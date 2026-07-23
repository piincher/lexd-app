/**
 * QuietHoursSettings Component
 * Do not disturb hours configuration
 */

import React, { useMemo } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "@src/providers/ThemeProvider";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";
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
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            sectionTitle: {
               fontSize: 11,
               fontWeight: "700",
               letterSpacing: 0.8,
               color: colors.text.secondary,
               textTransform: "uppercase",
               marginBottom: 8,
               marginLeft: 4,
            },
            card: {
               marginBottom: 16,
               borderRadius: RADIUS.card,
               borderWidth: HAIRLINE,
               borderColor: colors.border,
               backgroundColor: colors.background.default,
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
               borderRadius: RADIUS.control,
               justifyContent: "center",
               alignItems: "center",
            },
            quietHoursTitle: {
               fontSize: 16,
               fontWeight: "600",
               color: colors.text.primary,
            },
            quietHoursSubtitle: {
               fontSize: 14,
               color: colors.text.secondary,
               marginTop: 2,
            },
            quietHoursDetails: {
               marginTop: 16,
               paddingTop: 16,
               borderTopWidth: HAIRLINE,
               borderTopColor: colors.border,
            },
            quietHoursDescription: {
               fontSize: 14,
               color: colors.text.secondary,
               marginBottom: 12,
               lineHeight: 20,
            },
            editTimeButton: {
               borderColor: colors.primary.main,
            },
         }),
      [colors]
   );

   return (
      <>
         <Text style={styles.sectionTitle}>Quiet Hours</Text>
         <Card style={styles.card}>
            <Card.Content>
               <View style={styles.quietHoursHeader}>
                  <View style={styles.quietHoursLeft}>
                     <View style={[styles.iconContainer, { backgroundColor: colors.status.info + '15' }]}>
                        <Ionicons name="moon" size={24} color={colors.status.info} />
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
                     trackColor={{ false: colors.neutral[200], true: colors.primary.main + "50" }}
                     thumbColor={quietHours.enabled ? colors.primary.main : colors.background.default}
                  />
               </View>

               {quietHours.enabled && (
                  <View style={styles.quietHoursDetails}>
                     <Text style={styles.quietHoursDescription}>
                        Notifications will be silenced during these hours.
                     </Text>
                     <Button
                        mode="outlined"
                        onPress={onEditPress}
                        style={styles.editTimeButton}
                        textColor={colors.primary.main}
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
