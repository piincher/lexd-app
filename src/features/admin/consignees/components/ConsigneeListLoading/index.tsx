import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const ConsigneeListLoading: React.FC = () => {
   const { colors } = useAppTheme();

   return (
      <View style={[styles.container, styles.centered]}>
         <ActivityIndicator size="large" color={colors.primary.main} />
         <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
            Chargement des destinataires...
         </Text>
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
   loadingText: {
      marginTop: 16,
      fontSize: 16,
   },
});
