import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Chip } from "react-native-paper";
import { Consignee } from "../../api";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ConsigneeDetailMainCardProps {
   consignee: Consignee;
}

export const ConsigneeDetailMainCard: React.FC<ConsigneeDetailMainCardProps> = ({ consignee }) => {
   const { colors } = useAppTheme();

   return (
      <Card style={[styles.mainCard, { backgroundColor: colors.background.card }]}>
         <Card.Content>
            <View style={styles.nameSection}>
               <Text style={[styles.name, { color: colors.text.secondary }]}>{consignee.name}</Text>
               <Chip
                  style={[
                     styles.statusChip,
                     {
                        backgroundColor: consignee.isActive
                           ? colors.status.success
                           : colors.text.secondary,
                     },
                  ]}
                  textStyle={styles.statusChipText}
               >
                  {consignee.isActive ? "Actif" : "Inactif"}
               </Chip>
            </View>
         </Card.Content>
      </Card>
   );
};

const styles = StyleSheet.create({
   mainCard: {
      margin: 16,
      marginBottom: 8,
      borderRadius: 12,
   },
   nameSection: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   name: {
      fontSize: 24,
      fontWeight: "700",
      flex: 1,
   },
   statusChip: {
      height: 28,
   },
   statusChipText: {
      fontWeight: "600",
   },
});
