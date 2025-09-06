import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DetailRowProps {
   label: string;
   value: string;
   icon?: string;
   isLast?: boolean;
   onPress?: () => void;
}

export const DetailRow = ({ label, value, icon, isLast, onPress }: DetailRowProps) => (
   <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={[styles.container, !isLast && styles.borderBottom]}
   >
      <View style={styles.content}>
         <View style={styles.leftSection}>
            {icon && (
               <MaterialCommunityIcons
                  name={icon}
                  size={22}
                  color={COLORS.DarkGrey}
                  style={styles.icon}
               />
            )}
            <Text style={styles.label}>{label}</Text>
         </View>

         <View style={styles.valueContainer}>
            <Text style={styles.value} numberOfLines={5} ellipsizeMode="tail">
               {value}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.SlateGray} />
         </View>
      </View>
   </TouchableOpacity>
);

const styles = StyleSheet.create({
   container: {
      paddingVertical: 18,
      backgroundColor: COLORS.FeatherWhite,
      marginHorizontal: 16,
      marginVertical: 6,
      borderRadius: 12,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
   },
   content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   leftSection: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
   },
   label: {
      fontFamily: Fonts.meduim,
      fontSize: 12,
      color: COLORS.DimGray,
      marginLeft: 16,
   },
   value: {
      fontFamily: Fonts.regular,
      fontSize: 10,
      color: COLORS.DarkGrey,
      maxWidth: "80%",
   },
   icon: {
      backgroundColor: COLORS.lightergray,
      borderRadius: 8,
      padding: 6,
   },
   valueContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      justifyContent: "flex-end",
   },
   borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: COLORS.Silver,
   },
});
