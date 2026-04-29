import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Controller } from "react-hook-form";
import { FormInput } from "../../../../components/FormInput";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface DimensionsInputsProps {
   control: any;
   errors: any;
   calculatedCBM: number;
}

export const DimensionsInputs: React.FC<DimensionsInputsProps> = ({ control, errors, calculatedCBM }) => {
   const { colors } = useAppTheme();

   const styles = StyleSheet.create({
      dimensionsContainer: {
         marginTop: 20,
      },
      row: {
         flexDirection: "row",
         justifyContent: "space-between",
         marginHorizontal: -6,
      },
      dimensionColumn: {
         flex: 1,
         marginHorizontal: 6,
      },
      calculatedContainer: {
         marginTop: 16,
         alignItems: "center",
      },
      calculatedBadge: {
         flexDirection: "row",
         alignItems: "center",
         backgroundColor: colors.background.paper,
         paddingHorizontal: 16,
         paddingVertical: 8,
         borderRadius: 20,
         borderWidth: 1,
         borderColor: colors.border,
      },
      calculatedLabel: {
         fontSize: 13,
         color: colors.status.success,
         fontWeight: "600",
         marginRight: 8,
      },
      calculatedValue: {
         fontSize: 15,
         fontWeight: "700",
         color: colors.status.success,
      },
   });

   return (
      <View style={styles.dimensionsContainer}>
         <View style={styles.row}>
            <View style={styles.dimensionColumn}>
               <Controller
                  control={control}
                  name="length"
                  render={({ field: { onChange, value } }) => (
                     <FormInput
                        label="Longueur"
                        value={value}
                        onChangeText={onChange}
                        error={errors.length?.message}
                        keyboardType="decimal-pad"
                        placeholder="0"
                        suffix="cm"
                     />
                  )}
               />
            </View>
            <View style={styles.dimensionColumn}>
               <Controller
                  control={control}
                  name="width"
                  render={({ field: { onChange, value } }) => (
                     <FormInput
                        label="Largeur"
                        value={value}
                        onChangeText={onChange}
                        error={errors.width?.message}
                        keyboardType="decimal-pad"
                        placeholder="0"
                        suffix="cm"
                     />
                  )}
               />
            </View>
            <View style={styles.dimensionColumn}>
               <Controller
                  control={control}
                  name="height"
                  render={({ field: { onChange, value } }) => (
                     <FormInput
                        label="Hauteur"
                        value={value}
                        onChangeText={onChange}
                        error={errors.height?.message}
                        keyboardType="decimal-pad"
                        placeholder="0"
                        suffix="cm"
                     />
                  )}
               />
            </View>
         </View>

         {calculatedCBM > 0 && (
            <View style={styles.calculatedContainer}>
               <View style={styles.calculatedBadge}>
                  <Text style={styles.calculatedLabel}>CBM calculé</Text>
                  <Text style={styles.calculatedValue}>{calculatedCBM.toFixed(4)} m³</Text>
               </View>
            </View>
         )}
      </View>
   );
};
