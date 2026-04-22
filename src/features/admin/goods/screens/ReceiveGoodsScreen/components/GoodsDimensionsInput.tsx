/**
 * GoodsDimensionsInput - Form section for CBM calculation
 * Handles both dimension-based and direct CBM input
 * Conditionally renders based on shipping mode (AIR vs SEA)
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, TouchableRipple } from "react-native-paper";
import { Controller } from "react-hook-form";
import { FormInput } from "../../../components/FormInput";
import { GoodsDimensionsInputProps } from "../../types";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const GoodsDimensionsInput: React.FC<GoodsDimensionsInputProps> = ({
   control,
   errors,
   useDimensions = false,
   onToggleMode,
   calculatedCBM,
   shippingMode,
}) => {
   const { colors, isDark } = useAppTheme();
   const isAirShipping = shippingMode === 'AIR';

   const styles = useMemo(() => StyleSheet.create({
      card: {
         marginVertical: 8,
         borderRadius: 12,
         backgroundColor: colors.background.card,
      },
      cardContent: {
         padding: 16,
      },
      airShippingContainer: {
         // No additional styles needed
      },
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
      toggleContainer: {
         borderRadius: 12,
         backgroundColor: colors.background.paper,
         borderWidth: 1,
         borderColor: colors.border,
      },
      toggleRow: {
         flexDirection: "row",
         justifyContent: "space-between",
         alignItems: "center",
         padding: 16,
      },
      toggleInfo: {
         flex: 1,
      },
      toggleLabel: {
         fontSize: 15,
         fontWeight: "700",
         color: colors.text.primary,
      },
      toggleHint: {
         fontSize: 13,
         color: colors.text.secondary,
         marginTop: 2,
      },
      toggleSwitch: {
         width: 52,
         height: 32,
         borderRadius: 16,
         backgroundColor: colors.neutral[200],
         padding: 4,
         marginLeft: 12,
      },
      toggleSwitchActive: {
         backgroundColor: colors.status.success,
      },
      toggleThumb: {
         width: 24,
         height: 24,
         borderRadius: 12,
         backgroundColor: colors.background.card,
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.2,
         shadowRadius: 2,
         elevation: 2,
      },
      toggleThumbActive: {
         transform: [{ translateX: 20 }],
      },
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
      directCbmContainer: {
         marginTop: 16,
      },
   }), [colors, isDark]);

   return (
      <Card style={styles.card} elevation={2}>
         <Card.Content style={styles.cardContent}>
            {isAirShipping ? (
               <View style={styles.airShippingContainer}>
                  <View style={styles.airMessageContainer}>
                     <Text style={styles.airMessageIcon}>✈️</Text>
                     <Text style={styles.airMessageTitle}>
                        Transport Aérien
                     </Text>
                     <Text style={styles.airMessageText}>
                        CBM non requis pour le transport aérien
                     </Text>
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
            ) : (
               <>
                  <TouchableRipple
                     onPress={() => onToggleMode(!useDimensions)}
                     style={styles.toggleContainer}
                  >
                     <View style={styles.toggleRow}>
                        <View style={styles.toggleInfo}>
                           <Text style={styles.toggleLabel}>Utiliser les dimensions</Text>
                           <Text style={styles.toggleHint}>
                              {useDimensions ? "Calcul automatique du CBM" : "Saisie manuelle du CBM"}
                           </Text>
                        </View>
                        <View style={[styles.toggleSwitch, useDimensions && styles.toggleSwitchActive]}>
                           <View
                              style={[styles.toggleThumb, useDimensions && styles.toggleThumbActive]}
                           />
                        </View>
                     </View>
                  </TouchableRipple>

                  {useDimensions ? (
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
                  ) : (
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
                  )}
               </>
            )}
         </Card.Content>
      </Card>
   );
};

export default GoodsDimensionsInput;
