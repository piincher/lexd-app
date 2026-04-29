import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Consignee } from "../../api";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ConsigneeDetailAddressCardProps {
   consignee: Consignee;
}

export const ConsigneeDetailAddressCard: React.FC<ConsigneeDetailAddressCardProps> = ({
   consignee,
}) => {
   const { colors } = useAppTheme();

   return (
      <Card style={[styles.infoCard, { backgroundColor: colors.background.card }]}>
         <Card.Content>
            <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
               Adresse de l&apos;entrepôt
            </Text>
            <View style={styles.infoItem}>
               <Ionicons name="location-outline" size={20} color={colors.status.success} />
               <Text style={[styles.addressText, { color: colors.text.secondary }]}>
                  {consignee.warehouseAddress}
               </Text>
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
   infoItem: {
      flexDirection: "row",
      alignItems: "flex-start",
   },
   addressText: {
      marginLeft: 12,
      fontSize: 16,
      flex: 1,
      lineHeight: 22,
   },
});
