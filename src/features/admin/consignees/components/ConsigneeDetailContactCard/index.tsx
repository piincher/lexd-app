import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Consignee } from "../../api";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ConsigneeDetailContactCardProps {
   consignee: Consignee;
}

export const ConsigneeDetailContactCard: React.FC<ConsigneeDetailContactCardProps> = ({
   consignee,
}) => {
   const { colors } = useAppTheme();

   return (
      <Card style={[styles.infoCard, { backgroundColor: colors.background.card }]}>
         <Card.Content>
            <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
               Informations de contact
            </Text>

            <View style={styles.infoItem}>
               <Ionicons name="call-outline" size={20} color={colors.status.success} />
               <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>Téléphone</Text>
                  <Text style={[styles.infoValue, { color: colors.text.secondary }]}>
                     {consignee.phone}
                  </Text>
               </View>
            </View>

            {consignee.email && (
               <View style={styles.infoItem}>
                  <Ionicons name="mail-outline" size={20} color={colors.status.success} />
                  <View style={styles.infoContent}>
                     <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>Email</Text>
                     <Text style={[styles.infoValue, { color: colors.text.secondary }]}>
                        {consignee.email}
                     </Text>
                  </View>
               </View>
            )}
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
   infoItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16,
   },
   infoContent: {
      marginLeft: 12,
      flex: 1,
   },
   infoLabel: {
      fontSize: 12,
      marginBottom: 2,
   },
   infoValue: {
      fontSize: 16,
      fontWeight: "500",
   },
});
