import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface BatchUpdateSummaryCardProps {
   orderCount: number;
}

export const BatchUpdateSummaryCard: React.FC<BatchUpdateSummaryCardProps> = ({
   orderCount,
}) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               marginHorizontal: 16,
               marginBottom: 20,
               borderRadius: 16,
               padding: 16,
               backgroundColor: colors.background.card,
               borderWidth: 1,
               borderColor: colors.border,
            },
            header: {
               flexDirection: "row",
               alignItems: "center",
               gap: 12,
               marginBottom: 12,
            },
            iconWrap: {
               width: 48,
               height: 48,
               borderRadius: 14,
               backgroundColor: colors.primary[50],
               alignItems: "center",
               justifyContent: "center",
            },
            title: {
               fontSize: 16,
               fontWeight: "800",
               color: colors.text.primary,
            },
            subtitle: {
               fontSize: 13,
               fontWeight: "500",
               color: colors.text.secondary,
               marginTop: 2,
            },
            divider: {
               height: 1,
               backgroundColor: colors.border,
               marginVertical: 12,
            },
            row: {
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
            },
            label: {
               fontSize: 13,
               fontWeight: "600",
               color: colors.text.secondary,
            },
            value: {
               fontSize: 15,
               fontWeight: "800",
               color: colors.primary.main,
            },
         }),
      [colors]
   );

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <View style={styles.iconWrap}>
               <Ionicons name="layers-outline" size={24} color={colors.primary.main} />
            </View>
            <View>
               <Text style={styles.title}>Récapitulatif</Text>
               <Text style={styles.subtitle}>Mise à jour en lot</Text>
            </View>
         </View>
         <View style={styles.divider} />
         <View style={styles.row}>
            <Text style={styles.label}>Commandes sélectionnées</Text>
            <Text style={styles.value}>{orderCount}</Text>
         </View>
      </View>
   );
};
