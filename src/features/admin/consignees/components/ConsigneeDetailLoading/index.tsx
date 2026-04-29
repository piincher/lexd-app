import React from "react";
import { StyleSheet } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const ConsigneeDetailLoading: React.FC = () => {
   const { colors } = useAppTheme();

   return (
      <SafeAreaView style={[styles.container, styles.centered, { backgroundColor: colors.background.paper }]}>
         <ActivityIndicator size="large" color={colors.status.success} />
         <Text style={[styles.loadingText, { color: colors.text.secondary }]}>Chargement...</Text>
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
   loadingText: {
      marginTop: 16,
      fontSize: 16,
   },
});
