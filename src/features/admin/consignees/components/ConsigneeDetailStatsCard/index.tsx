import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { Consignee } from "../../api";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ConsigneeDetailStatsCardProps {
   consignee: Consignee;
}

export const ConsigneeDetailStatsCard: React.FC<ConsigneeDetailStatsCardProps> = ({
   consignee,
}) => {
   const { colors } = useAppTheme();

   return (
      <Card style={[styles.infoCard, { backgroundColor: colors.background.card }]}>
         <Card.Content>
            <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>Statistiques</Text>
            <View style={styles.statsContainer}>
               <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.status.success }]}>
                     {consignee.assignedContainersCount}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
                     Conteneurs assignés
                  </Text>
               </View>
            </View>
         </Card.Content>
      </Card>
   );
};

const styles = StyleSheet.create({
   infoCard: {
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 12,
   },
   sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 16,
   },
   statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
   },
   statItem: {
      alignItems: "center",
   },
   statNumber: {
      fontSize: 32,
      fontWeight: "700",
   },
   statLabel: {
      fontSize: 14,
      marginTop: 4,
   },
});
