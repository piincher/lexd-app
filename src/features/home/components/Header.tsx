import React, { useMemo } from 'react';
import { View, Image, Pressable, StyleSheet, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { IMAGES } from "@src/constants/Images";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AppTheme } from '@src/constants/Theme';

export const Header = () => {
   const navigation = useNavigation();
   const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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
               <AntDesign
                  name="search"
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
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      ...Platform.select({
         ios: {
            shadowColor: colors.neutral[900],
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
      width: 134,
      height: 34,
   },
   actions: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
   },
   iconButton: {
      width: 44,
      height: 44,
      borderRadius: 14,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   iconButtonPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.92 }],
   },
});
