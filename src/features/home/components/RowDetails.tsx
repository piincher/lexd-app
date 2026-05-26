import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";

import { StyleSheet, Text, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface RowDetailsProps {
   label: string;
   value: string | number;
   icon?: string;
   style?: StyleProp<ViewStyle>;
}

export const RowDetails = ({ label, value, icon, style }: RowDetailsProps) => {
   const { colors } = useAppTheme();
   const styles = StyleSheet.create({
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
         color: colors.text.secondary,
         fontFamily: Fonts.meduim,
         fontSize: 14,
      },
      valueContainer: {
         alignItems: "flex-end",
      },
      textValue: {
         color: colors.text.primary,
         fontFamily: Fonts.bold,
         fontSize: 16,
      },
   });

   return (
      <View style={[styles.rowContainer, style]}>
         {icon && <MaterialIcons name={icon} size={20} color={colors.primary.main} style={styles.icon} />}
         <View style={styles.labelContainer}>
            <Text style={styles.textLabelStyle}>{label}</Text>
         </View>
         <View style={styles.valueContainer}>
            <Text style={styles.textValue}>{value}</Text>
         </View>
      </View>
   );
};
