import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Consignee } from "../../api";

interface ConsigneeCardProps {
   consignee: Consignee;
   onPress: () => void;
   onToggleStatus: () => void;
}

export const ConsigneeCard: React.FC<ConsigneeCardProps> = ({ consignee, onPress, onToggleStatus }) => {
   const { colors } = useAppTheme();

   return (
      <Card style={[styles.card, { backgroundColor: colors.background.card }]} onPress={onPress}>
         <Card.Content>
            <View style={styles.cardHeader}>
               <View style={styles.nameContainer}>
                  <Text style={[styles.name, { color: colors.text.primary }]}>{consignee.name}</Text>
                  <Chip
                     style={[
                        styles.statusChip,
                        { backgroundColor: consignee.isActive ? colors.status.success : colors.text.disabled },
                     ]}
                     textStyle={[styles.statusChipText, { color: colors.background.default }]}
                  >
                     {consignee.isActive ? "Actif" : "Inactif"}
                  </Chip>
               </View>
               <TouchableOpacity onPress={onToggleStatus}>
                  <Ionicons
                     name={consignee.isActive ? "toggle" : "toggle-outline"}
                     size={28}
                     color={consignee.isActive ? colors.status.success : colors.text.disabled}
                  />
               </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
               <Ionicons name="call-outline" size={16} color={colors.text.secondary} />
               <Text style={[styles.infoText, { color: colors.text.secondary }]}>{consignee.phone}</Text>
            </View>

            {consignee.email && (
               <View style={styles.infoRow}>
                  <Ionicons name="mail-outline" size={16} color={colors.text.secondary} />
                  <Text style={[styles.infoText, { color: colors.text.secondary }]}>{consignee.email}</Text>
               </View>
            )}

            <View style={styles.infoRow}>
               <Ionicons name="cube-outline" size={16} color={colors.text.secondary} />
               <Text style={[styles.infoText, { color: colors.text.secondary }]}>
                  {consignee.assignedContainersCount} conteneur(s) assigné(s)
               </Text>
            </View>
         </Card.Content>
      </Card>
   );
};

const styles = StyleSheet.create({
   card: {
      marginBottom: 12,
      borderRadius: 12,
      elevation: 2,
   },
   cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
   },
   nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
   },
   name: {
      fontSize: 18,
      fontWeight: "600",
      flex: 1,
   },
   statusChip: {
      marginLeft: 8,
      height: 24,
   },
   statusChipText: {
      fontSize: 12,
      fontWeight: "500",
   },
   infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
   },
   infoText: {
      marginLeft: 8,
      fontSize: 14,
   },
});
