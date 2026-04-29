import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import React, { useMemo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ListItemProps {
   label: string;
   value: React.ReactNode;
   icon?: string;
   isCopyable?: boolean;
   onCopy?: () => void;
   style?: StyleProp<ViewStyle>;
}

export const ListItem = ({ label, value, icon, isCopyable, onCopy, style }: ListItemProps) => {
   const { colors } = useAppTheme();
   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
               paddingVertical: 12,
               paddingHorizontal: 16,
            },
            leftSection: {
               flexDirection: "row",
               alignItems: "center",
               gap: 8,
            },
            rightSection: {
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "flex-end",
               gap: 8,
            },
            icon: {
               marginTop: 2,
            },
            label: {
               fontSize: 14,
               fontFamily: Fonts.meduim,
               color: colors.text.secondary,
               fontWeight: "500",
            },
            value: {
               fontSize: 14,
               fontFamily: Fonts.meduim,
               color: colors.text.secondary,
               maxWidth: 200,
               textAlign: "right",
               marginTop: 2,
            },
            copyButton: {
               padding: 4,
            },
         }),
      [colors],
   );
   return (
      <View style={[styles.container, style]}>
         <View style={styles.leftSection}>
            {icon && (
               <MaterialIcons name={icon} size={20} color={colors.primary.main} style={styles.icon} />
            )}
            <Text style={styles.label}>{label}</Text>
         </View>
         <View style={styles.rightSection}>
            <Text style={styles.value}>{value}</Text>
            {isCopyable && (
               <Pressable onPress={() => onCopy()} style={styles.copyButton}>
                  <MaterialIcons name="content-copy" size={16} color={colors.primary.main} />
               </Pressable>
            )}
         </View>
      </View>
   );
};
