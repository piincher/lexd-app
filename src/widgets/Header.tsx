import { Text, View, StyleSheet, Pressable } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import type { navigationProps } from "@src/navigations/type";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useMemo } from "react";

interface HeaderProps {
   title: string;
   rightIcon?: React.ReactNode;
   navigation: Pick<navigationProps, "goBack" | "navigate">;
   rightIconHandler?: () => void;
   rightIconAccessibilityLabel?: string;
   showNotificationBell?: boolean;
   style?: StyleProp<ViewStyle>;
}

export const Header = ({
   title,
   rightIcon,
   navigation,
   rightIconHandler,
   rightIconAccessibilityLabel = "Action",
   showNotificationBell = false,
   style,
}: HeaderProps) => {
   const { colors } = useAppTheme();
   const styles = useMemo(
      () =>
         StyleSheet.create({
            safeArea: {
               flex: 0,
               backgroundColor: colors.background.card,
            },
            container: {
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
               paddingVertical: 16,
               paddingHorizontal: 16,
               backgroundColor: colors.background.card,
               borderBottomWidth: 1,
               borderBottomColor: colors.border,
            },
            backButton: {
               padding: 8,
               minWidth: 44,
            },
            iconButton: {
               padding: 8,
            },
            pressed: {
               opacity: 0.7,
            },
            title: {
               flex: 1,
               textAlign: "center",
               color: colors.text.primary,
               fontSize: 20,
               fontFamily: Fonts.bold,
               fontWeight: "700",
            },
            placeholder: {
               minWidth: 44,
            },
         }),
      [colors],
   );

   return (
      <SafeAreaView edges={["top"]} style={[styles.safeArea, style]}>
         <View style={styles.container}>
            <Pressable
               onPress={() => navigation.goBack()}
               style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
               accessibilityRole="button"
               accessibilityLabel="Retour"
            >
               <MaterialIcons name="arrow-back" size={28} color={colors.primary.main} />
            </Pressable>

            <Text style={styles.title}>{title}</Text>

            {showNotificationBell ? (
               <NotificationBell
                  onPress={() => navigation.navigate("Notifications" as never)}
                  size={24}
                  color={colors.text.secondary}
               />
            ) : rightIcon ? (
               <Pressable
                  onPress={rightIconHandler}
                  style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityLabel={rightIconAccessibilityLabel}
               >
                  {rightIcon}
               </Pressable>
            ) : (
               <View style={styles.placeholder} />
            )}
         </View>
      </SafeAreaView>
   );
};
