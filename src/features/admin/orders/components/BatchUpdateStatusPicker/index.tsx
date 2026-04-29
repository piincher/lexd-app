import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { Status } from "../../hooks/useBatchUpdate";

interface BatchUpdateStatusPickerProps {
   pickerValue: string;
   onValueChange: (value: string) => void;
}

export const BatchUpdateStatusPicker: React.FC<BatchUpdateStatusPickerProps> = ({
   pickerValue,
   onValueChange,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={[styles.container, { borderColor: colors.border }]}>
         <Text style={styles.valueText}>{pickerValue}</Text>
         <View>
            <Picker
               prompt="Change le trajet"
               mode="dialog"
               style={styles.picker}
               selectedValue={pickerValue}
               onValueChange={onValueChange}
            >
               {Status.map((c) => (
                  <Picker.Item
                     key={c.id}
                     style={{ fontFamily: Fonts.black }}
                     label={c.title}
                     value={c.title}
                  />
               ))}
            </Picker>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      borderWidth: 0.5,
      padding: 10,
      margin: 20,
   },
   valueText: {
      fontFamily: Fonts.bold,
   },
   picker: {
      width: "100%",
      fontFamily: Fonts.bold,
   },
});
