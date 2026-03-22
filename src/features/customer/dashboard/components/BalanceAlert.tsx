/**
 * BalanceAlert
 * Alert card shown when user has balance due
 */

import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";

export interface BalanceAlertProps {
   balanceDue: number;
   onPress: () => void;
}

const formatCurrency = (amount: number): string => {
   return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(amount);
};

export const BalanceAlert: React.FC<BalanceAlertProps> = ({ balanceDue, onPress }) => {
   const theme = useTheme();

   if (balanceDue <= 0) return null;

   return (
      <Pressable
         style={[styles.container, { backgroundColor: `${Theme.status.error}15` }]}
         onPress={onPress}
      >
         <MaterialCommunityIcons name="alert-circle" size={24} color={Theme.status.error} />
         <View style={styles.content}>
            <Text style={[styles.title, { color: Theme.status.error }]}>Paiement Requis</Text>
            <Text style={[styles.text, { color: theme.colors.onSurfaceVariant }]}>
               Vous avez {formatCurrency(balanceDue)} à payer
            </Text>
         </View>
         <MaterialCommunityIcons name="chevron-right" size={24} color={Theme.status.error} />
      </Pressable>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: Theme.spacing.lg,
      marginTop: Theme.spacing.lg,
      padding: Theme.spacing.lg,
      borderRadius: Theme.radius.lg,
   },
   content: {
      flex: 1,
      marginLeft: Theme.spacing.md,
   },
   title: {
      fontSize: 15,
      fontWeight: "700",
   },
   text: {
      fontSize: 13,
      marginTop: 2,
   },
});

export default BalanceAlert;
