import React from 'react';
import { View, Image, Pressable, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { IMAGES } from "@src/constants/Images";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';
import type { AppTheme } from '@src/constants/Theme';

export const Header = () => {
   const navigation = useNavigation();
   const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors);

   return (
      <View
         style={[
            styles.container,
            {
               backgroundColor: colors.background.default,
               borderBottomColor: colors.border,
            },
         ]}
      >
         {/* Logo + Brand */}
         <View style={styles.brandRow}>
            <Image source={isDark ? IMAGES.logo : IMAGES.flat_logo} style={styles.logo} resizeMode="contain" />
         </View>

         {/* Action Buttons */}
         <View style={styles.actions}>
            <Pressable
               onPress={() => navigation.navigate("CheckRoute" as never)}
               style={({ pressed }) => [
                  styles.iconButton,
                  {
                     backgroundColor: isDark
                        ? `${colors.primary.light}1E`
                        : colors.background.paper,
                     borderColor: isDark ? `${colors.primary.light}24` : colors.border,
                  },
                  pressed && styles.iconButtonPressed,
               ]}
               hitSlop={10}
               accessibilityRole="button"
               accessibilityLabel="Suivre un envoi"
            >
               <Ionicons
                  name="search-outline"
                  size={20}
                  color={colors.primary.main}
               />
            </Pressable>
            <View
               style={[
                  styles.iconButton,
                  {
                     backgroundColor: isDark
                        ? `${colors.primary.light}1E`
                        : colors.background.paper,
                     borderColor: isDark ? `${colors.primary.light}24` : colors.border,
                  },
               ]}
            >
               <NotificationBell
                  onPress={() => navigation.navigate("Notifications" as never)}
                  size={20}
                  color={colors.primary.main}
               />
            </View>
         </View>
      </View>
   );
};

const createStyles = (colors: AppTheme['colors']) => StyleSheet.create({
   container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderBottomWidth: HAIRLINE,
   },
   brandRow: {
      flexDirection: "row",
      alignItems: "center",
   },
   logo: {
      // Matches the LEXD wordmark's 2.74:1 aspect so `contain` does not
      // letterbox it inside an over-wide box.
      width: 96,
      height: 35,
   },
   actions: {
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
   },
   iconButton: {
      width: 44,
      height: 44,
      // LEXD geometry: squarer controls than the previous 14px.
      borderRadius: RADIUS.control,
      borderWidth: 0,
      justifyContent: "center",
      alignItems: "center",
   },
   iconButtonPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.92 }],
   },
});
