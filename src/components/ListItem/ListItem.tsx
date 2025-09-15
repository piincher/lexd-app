import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import React from "react";
import { StyleSheet, Text, View, Pressable, StyleProp, ViewStyle } from "react-native";
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
   return (
      <View style={[styles.container, style]}>
         <View style={styles.leftSection}>
            {icon && (
               <MaterialIcons name={icon} size={20} color={COLORS.blue} style={styles.icon} />
            )}
            <Text style={styles.label}>{label}</Text>
         </View>
         <View style={styles.rightSection}>
            <Text style={styles.value}>{value}</Text>
            {isCopyable && (
               <Pressable onPress={onCopy} style={styles.copyButton}>
                  <MaterialIcons name="content-copy" size={16} color={COLORS.blue} />
               </Pressable>
            )}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
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
      color: COLORS.DarkGrey,
      fontWeight: "500",
   },
   value: {
      fontSize: 14,
      fontFamily: Fonts.meduim,
      color: COLORS.grey,
      maxWidth: 200,
      textAlign: "right",
      marginTop: 2,
   },
   copyButton: {
      padding: 4,
   },
});
