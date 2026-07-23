import React, { useMemo } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";

interface MasterToggleProps {
   enabled: boolean;
   onToggle: (value: boolean) => void;
}

export const MasterToggle: React.FC<MasterToggleProps> = ({ enabled, onToggle }) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            card: {
               marginBottom: 16,
               borderRadius: RADIUS.card,
               borderWidth: HAIRLINE,
               borderColor: colors.border,
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
               borderRadius: RADIUS.control,
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
         }),
      [colors],
   );

   return (
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
                  <Text style={styles.masterToggleTitle}>Notifications push</Text>
                  <Text style={styles.masterToggleSubtitle}>
                     {enabled ? "Activees" : "Desactivees"}
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
   );
};
