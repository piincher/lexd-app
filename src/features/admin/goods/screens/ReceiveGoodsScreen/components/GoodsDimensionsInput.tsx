/**
 * GoodsDimensionsInput - Form section for CBM calculation
 * Handles both dimension-based and direct CBM input
 * Conditionally renders based on shipping mode (AIR vs SEA)
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, TouchableRipple } from "react-native-paper";
import { Controller } from "react-hook-form";
import { FormInput } from "../../../components/FormInput";
import { GoodsDimensionsInputProps } from "../../types";
import { COLORS } from "@src/constants/Colors";

export const GoodsDimensionsInput: React.FC<GoodsDimensionsInputProps> = ({
   control,
   errors,
   useDimensions = false,
   onToggleMode,
   calculatedCBM,
   shippingMode,
}) => {
   const isAirShipping = shippingMode === 'AIR';

   return (
      <Card style={styles.card} elevation={2}>
         <Card.Content style={styles.cardContent}>
            {/* Air Shipping - Show info message and disabled CBM field */}
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
                  
                  {/* Optional disabled CBM field for reference */}
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
                              editable={false}
                              disabled
                           />
                        )}
                     />
                  </View>
               </View>
            ) : (
               <>
                  {/* Toggle - Only shown for SEA shipping */}
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
                        {/* Dimension Fields */}
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

                        {/* Calculated CBM Display */}
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

const styles = StyleSheet.create({
   card: {
      marginVertical: 8,
      borderRadius: 12,
      backgroundColor: "#fff",
   },
   cardContent: {
      padding: 16,
   },
   // Air shipping styles
   airShippingContainer: {
      // No additional styles needed
   },
   airMessageContainer: {
      alignItems: "center",
      paddingVertical: 24,
      paddingHorizontal: 16,
      backgroundColor: "#f8f9fa",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#e9ecef",
      borderStyle: "dashed",
   },
   airMessageIcon: {
      fontSize: 32,
      marginBottom: 8,
   },
   airMessageTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#333",
      marginBottom: 4,
   },
   airMessageText: {
      fontSize: 14,
      color: "#666",
      textAlign: "center",
   },
   disabledCbmContainer: {
      marginTop: 16,
   },
   // Toggle styles
   toggleContainer: {
      borderRadius: 12,
      backgroundColor: "#f8f9fa",
      borderWidth: 1,
      borderColor: "#e9ecef",
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
      color: "#333",
   },
   toggleHint: {
      fontSize: 13,
      color: "#666",
      marginTop: 2,
   },
   toggleSwitch: {
      width: 52,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#ccc",
      padding: 4,
      marginLeft: 12,
   },
   toggleSwitchActive: {
      backgroundColor: COLORS.Crimson || "#dc3545",
   },
   toggleThumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
   },
   toggleThumbActive: {
      transform: [{ translateX: 20 }],
   },
   // Dimension styles
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
      backgroundColor: "#fce4ec",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#f8bbd9",
   },
   calculatedLabel: {
      fontSize: 13,
      color: COLORS.Crimson || "#dc3545",
      fontWeight: "600",
      marginRight: 8,
   },
   calculatedValue: {
      fontSize: 15,
      fontWeight: "700",
      color: COLORS.Crimson || "#dc3545",
   },
   directCbmContainer: {
      marginTop: 16,
   },
});
