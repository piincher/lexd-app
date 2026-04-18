import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@src/store/Auth";
import { useAppTheme } from '@src/providers/ThemeProvider';

const getGreeting = (): string => {
   const hour = new Date().getHours();
   if (hour >= 5 && hour < 12) return "Bonjour";
   if (hour >= 12 && hour < 18) return "Bonjour";
   return "Bonsoir";
};

export const GreetingHeader: React.FC = () => {
   const firstName = useAuth((state) => state.user.firstName);
   const { colors } = useAppTheme();

   return (
      <View style={styles.container}>
         <Text style={[styles.greeting, { color: colors.text.secondary }]}>
            {getGreeting()}
         </Text>
         <Text style={[styles.name, { color: colors.text.primary }]}>
            {firstName || "Utilisateur"}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 8,
   },
   greeting: {
      fontSize: 14,
      fontWeight: "400",
   },
   name: {
      fontSize: 24,
      fontWeight: "700",
      marginTop: 2,
   },
});
