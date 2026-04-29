import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ConsigneeListEmptyProps {
   searchQuery: string;
}

export const ConsigneeListEmpty: React.FC<ConsigneeListEmptyProps> = ({ searchQuery }) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.emptyContainer}>
         <Ionicons name="people-outline" size={64} color={colors.text.disabled} />
         <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            {searchQuery
               ? "Aucun destinataire ne correspond à votre recherche"
               : "Aucun destinataire enregistré"}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 64,
   },
   emptyText: {
      marginTop: 16,
      fontSize: 16,
      textAlign: "center",
   },
});
