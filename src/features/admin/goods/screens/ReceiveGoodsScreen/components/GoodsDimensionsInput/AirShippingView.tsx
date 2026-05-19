import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Controller } from "react-hook-form";
import { FormInput } from "../../../../components/FormInput";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./AirShippingView.styles";

interface AirShippingViewProps {
   control: any;
   errors: any;
}

export const AirShippingView: React.FC<AirShippingViewProps> = ({ control, errors }) => {
   const { colors } = useAppTheme();
   const styles = useMemo(() => createStyles(colors), [colors]);

   return (
      <View>
         <View style={styles.airMessageContainer}>
            <Text style={styles.airMessageIcon}>✈️</Text>
            <Text style={styles.airMessageTitle}>Transport Aérien</Text>
            <Text style={styles.airMessageText}>CBM non requis pour le transport aérien</Text>
         </View>

         <View style={styles.disabledCbmContainer}>
            <Controller
               control={control}
               name="cbm"
               render={({ field: { value } }) => (
                  <FormInput
                     label="CBM (optionnel)"
                     value={value || ""}
                     onChangeText={() => {}}
                     error={errors.cbm?.message}
                     keyboardType="decimal-pad"
                     placeholder="N/A"
                     suffix="m³"
                     disabled
                  />
               )}
            />
         </View>
      </View>
   );
};
