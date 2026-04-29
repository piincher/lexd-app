import React from "react";
import { View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { FormInput } from "../../../../components/FormInput";

interface DirectCBMInputProps {
   control: any;
   errors: any;
}

export const DirectCBMInput: React.FC<DirectCBMInputProps> = ({ control, errors }) => {
   const styles = StyleSheet.create({
      directCbmContainer: {
         marginTop: 16,
      },
   });

   return (
      <View style={styles.directCbmContainer}>
         <Controller
            control={control}
            name="cbm"
            render={({ field: { onChange, value } }) => (
               <FormInput
                  label="CBM direct"
                  value={value}
                  onChangeText={onChange}
                  error={errors.cbm?.message}
                  keyboardType="decimal-pad"
                  placeholder="0.0000"
                  suffix="m³"
               />
            )}
         />
      </View>
   );
};
