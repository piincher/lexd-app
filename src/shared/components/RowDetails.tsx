import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface RowDetailsProps {
   label: string;
   value: string | number;
   icon?: string;
   style?: StyleProp<ViewStyle>;
}

export const RowDetails = ({ label, value, icon, style }: RowDetailsProps) => {
   return (
      <View style={[styles.rowContainer, style]}>
         {icon && <MaterialIcons name={icon} size={20} color={COLORS.blue} style={styles.icon} />}
         <View style={styles.labelContainer}>
            <Text style={styles.textLabelStyle}>{label}</Text>
         </View>
         <View style={styles.valueContainer}>
            <Text style={styles.textValue}>{value}</Text>
         </View>
      </View>
   );
};

export const styles = StyleSheet.create({
   rowContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
   },
   icon: {
      marginRight: 12,
   },
   labelContainer: {
      flex: 1,
   },
   textLabelStyle: {
      color: COLORS.grey,
      fontFamily: Fonts.meduim,
      fontSize: 14,
   },
   valueContainer: {
      alignItems: "flex-end",
   },
   textValue: {
      color: COLORS.DarkGrey,
      fontFamily: Fonts.bold,
      fontSize: 16,
   },
});
