import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SummaryStats {
   total: number;
   warehouse: number;
   transit: number;
   delivered: number;
}

interface ShipmentSummaryProps {
   stats: SummaryStats;
   onViewAll?: () => void;
}

const STAT_CARDS = [
   {
      key: "total" as const,
      label: "Total",
      icon: "package-variant" as const,
      lib: "mci" as const,
      color: "#1B365D",
   },
   {
      key: "warehouse" as const,
      label: "Entrepôt",
      icon: "home" as const,
      lib: "feather" as const,
      color: "#E88D2A",
   },
   {
      key: "transit" as const,
      label: "Transit",
      icon: "airplane" as const,
      lib: "mci" as const,
      color: "#2D8FDB",
   },
   {
      key: "delivered" as const,
      label: "Livrés",
      icon: "check-circle" as const,
      lib: "feather" as const,
      color: "#1AAE7E",
   },
];

export const ShipmentSummary: React.FC<ShipmentSummaryProps> = ({
   stats,
   onViewAll,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.container}>
         {/* Section header */}
         <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
               Résumé
            </Text>
            {onViewAll && (
               <Pressable onPress={onViewAll} style={styles.viewAllBtn}>
                  <Text
                     style={[
                        styles.viewAllText,
                        { color: colors.text.secondary },
                     ]}
                  >
                     Voir tout
                  </Text>
                  <Feather
                     name="chevron-right"
                     size={16}
                     color={colors.text.secondary}
                  />
               </Pressable>
            )}
         </View>

         {/* Stats cards row */}
         <View style={styles.cardsRow}>
            {STAT_CARDS.map((card) => (
               <View
                  key={card.key}
                  style={[styles.statCard, { backgroundColor: card.color }]}
               >
                  <View style={styles.iconCircle}>
                     {card.lib === "mci" ? (
                        <MaterialCommunityIcons
                           name={card.icon}
                           size={22}
                           color="#FFFFFF"
                        />
                     ) : (
                        <Feather
                           name={card.icon}
                           size={22}
                           color="#FFFFFF"
                        />
                     )}
                  </View>
                  <Text style={styles.statNumber}>{stats[card.key]}</Text>
                  <Text style={styles.statLabel}>{card.label}</Text>
               </View>
            ))}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      marginTop: 24,
      paddingHorizontal: 20,
   },
   sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
   },
   sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
   },
   viewAllBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
   },
   viewAllText: {
      fontSize: 14,
      fontWeight: "500",
   },
   cardsRow: {
      flexDirection: "row",
      gap: 10,
   },
   statCard: {
      flex: 1,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 8,
      alignItems: "center",
      gap: 6,
   },
   iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      justifyContent: "center",
      alignItems: "center",
   },
   statNumber: {
      fontSize: 22,
      fontWeight: "800",
      color: "#FFFFFF",
   },
   statLabel: {
      fontSize: 11,
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.85)",
   },
});
