import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Controller } from "react-hook-form";
import { FormInput } from "../../../../components/FormInput";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./DimensionsInputs.styles";

interface DimensionsInputsProps {
   control: any;
   errors: any;
   calculatedCBM: number;
}

export const DimensionsInputs: React.FC<DimensionsInputsProps> = ({ control, errors, calculatedCBM }) => {
   const { colors } = useAppTheme();
   const styles = useMemo(() => createStyles(colors), [colors]);

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
