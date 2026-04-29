import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Controller } from "react-hook-form";
import { FormInput } from "../../../../components/FormInput";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface AirShippingViewProps {
   control: any;
   errors: any;
}

export const AirShippingView: React.FC<AirShippingViewProps> = ({ control, errors }) => {
   const { colors } = useAppTheme();

   const styles = StyleSheet.create({
      airMessageContainer: {
         alignItems: "center",
         paddingVertical: 24,
         paddingHorizontal: 16,
         backgroundColor: colors.background.paper,
         borderRadius: 12,
         borderWidth: 1,
         borderColor: colors.border,
         borderStyle: "dashed",
      },
      airMessageIcon: {
         fontSize: 32,
         marginBottom: 8,
      },
      airMessageTitle: {
         fontSize: 16,
         fontWeight: "700",
         color: colors.text.primary,
         marginBottom: 4,
      },
      airMessageText: {
         fontSize: 14,
         color: colors.text.secondary,
         textAlign: "center",
      },
      disabledCbmContainer: {
         marginTop: 16,
      },
   });

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
