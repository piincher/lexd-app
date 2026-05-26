import React from "react";
import { View } from "react-native";
import { Controller } from "react-hook-form";
import { FormInput } from "../../../../components/FormInput";
import { styles } from "./DirectCBMInput.styles";
import type { ReceiveGoodsFormSectionProps } from "../../types";

type DirectCBMInputProps = Pick<ReceiveGoodsFormSectionProps, "control" | "errors">;

export const DirectCBMInput: React.FC<DirectCBMInputProps> = ({ control, errors }) => {
   return (
      <View style={styles.directCbmContainer}>
         <Controller
            control={control}
            name="cbm"
            render={({ field: { onChange, value } }) => (
               <FormInput
                  label="CBM direct"
                  value={value || ""}
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
