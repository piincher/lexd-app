import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ConsigneeDetailErrorProps {
   onBack: () => void;
}

export const ConsigneeDetailError: React.FC<ConsigneeDetailErrorProps> = ({ onBack }) => {
   const { colors } = useAppTheme();

   return (
      <SafeAreaView style={[styles.container, styles.centered, { backgroundColor: colors.background.paper }]}>
         <Ionicons name="alert-circle-outline" size={48} color={colors.status.error} />
         <Text style={[styles.errorText, { color: colors.status.error }]}>Erreur lors du chargement</Text>
         <Button mode="contained" onPress={onBack} style={[styles.backButton, { backgroundColor: colors.primary.main }]}>
            Retour
         </Button>
      </SafeAreaView>
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
      marginBottom: 16,
   },
   backButton: {
      borderRadius: 8,
   },
});
