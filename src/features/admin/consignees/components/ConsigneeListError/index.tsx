import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ConsigneeListErrorProps {
   onRetry: () => void;
}

export const ConsigneeListError: React.FC<ConsigneeListErrorProps> = ({ onRetry }) => {
   const { colors } = useAppTheme();

   return (
      <View style={[styles.container, styles.centered]}>
         <Ionicons name="alert-circle-outline" size={48} color={colors.status.error} />
         <Text style={[styles.errorText, { color: colors.status.error }]}>
            Erreur lors du chargement
         </Text>
         <Button
            mode="contained"
            onPress={onRetry}
            style={[styles.retryButton, { backgroundColor: colors.primary.main }]}
         >
            Réessayer
         </Button>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   centered: {
      justifyContent: "center",
      alignItems: "center",
   },
   errorText: {
      marginTop: 16,
      fontSize: 16,
   },
   retryButton: {
      marginTop: 16,
   },
});
