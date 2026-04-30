import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import type { NavigationProp } from "@react-navigation/native";

interface HeaderProps {
   navigation: NavigationProp<any>;
}

export const Header: React.FC<HeaderProps> = ({ navigation }) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            header: {
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
               paddingHorizontal: 16,
               paddingVertical: 12,
               backgroundColor: colors.background.default,
               borderBottomWidth: 1,
               borderBottomColor: colors.border,
            },
            backButton: {
               padding: 8,
            },
            headerTitle: {
               fontSize: 18,
               fontWeight: "600",
               color: colors.text.primary,
            },
            placeholder: {
               width: 40,
            },
         }),
      [colors],
   );

   return (
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color={colors.text.primary} />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>Parametres de notification</Text>
         <NotificationBell
            onPress={() => navigation.navigate("Notifications" as never)}
            size={24}
            color={colors.text.primary}
         />
      </View>
   );
};
