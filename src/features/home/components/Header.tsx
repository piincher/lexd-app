import React from "react";
import { View, Image, Pressable, StyleSheet, Platform } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IMAGES } from "@src/constants/Images";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const Header = () => {
   const navigation = useNavigation();
   const { colors, isDark } = useAppTheme();

   return (
      <View
         style={[
            styles.container,
            {
               backgroundColor: colors.background.default,
               borderBottomColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            },
         ]}
      >
         {/* Logo + Brand */}
         <View style={styles.brandRow}>
            <Image source={IMAGES.flat_logo} style={styles.logo} resizeMode="contain" />
         </View>

         {/* Action Buttons */}
         <View style={styles.actions}>
            <Pressable
               onPress={() => navigation.navigate("faq" as never)}
               style={({ pressed }) => [
                  styles.iconButton,
                  {
                     backgroundColor: isDark
                        ? 'rgba(74,222,128,0.12)'
                        : 'rgba(34,197,94,0.08)',
                  },
                  pressed && styles.iconButtonPressed,
               ]}
               hitSlop={8}
               accessibilityRole="button"
               accessibilityLabel="FAQ"
            >
               <MaterialCommunityIcons
                  name="help-circle-outline"
                  size={20}
                  color={colors.primary.main}
               />
            </Pressable>
            <Pressable
               onPress={() => navigation.navigate("Notifications" as never)}
               style={({ pressed }) => [
                  styles.iconButton,
                  {
                     backgroundColor: isDark
                        ? 'rgba(74,222,128,0.12)'
                        : 'rgba(34,197,94,0.08)',
                  },
                  pressed && styles.iconButtonPressed,
               ]}
               hitSlop={8}
               accessibilityRole="button"
               accessibilityLabel="Notifications"
            >
               <MaterialCommunityIcons
                  name="bell-outline"
                  size={20}
                  color={colors.primary.main}
               />
            </Pressable>
            <Pressable
               onPress={() => navigation.navigate("AboutUs" as never)}
               style={({ pressed }) => [
                  styles.iconButton,
                  {
                     backgroundColor: isDark
                        ? 'rgba(74,222,128,0.12)'
                        : 'rgba(34,197,94,0.08)',
                  },
                  pressed && styles.iconButtonPressed,
               ]}
               hitSlop={8}
               accessibilityRole="button"
               accessibilityLabel="À propos"
            >
               <MaterialCommunityIcons
                  name="information-outline"
                  size={20}
                  color={colors.primary.main}
               />
            </Pressable>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      ...Platform.select({
         ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
         },
         android: {
            elevation: 2,
         },
      }),
   },
   brandRow: {
      flexDirection: "row",
      alignItems: "center",
   },
   logo: {
      width: 140,
      height: 36,
   },
   actions: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
   },
   iconButton: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
   },
   iconButtonPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.92 }],
   },
});
