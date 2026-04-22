/**
 * DimensionsInput - Component for entering dimensions or direct CBM
 * Improved with fixed layout for dimension fields and better toggle styling
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, TouchableRipple } from "react-native-paper";
import { FormInput } from "./FormInput";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface DimensionsInputProps {
   useDimensions: boolean;
   onToggleMode: (use: boolean) => void;
   length: string;
   width: string;
   height: string;
   cbm: string;
   onChangeLength: (value: string) => void;
   onChangeWidth: (value: string) => void;
   onChangeHeight: (value: string) => void;
   onChangeCBM: (value: string) => void;
   errors: {
      length?: string;
      width?: string;
      height?: string;
      cbm?: string;
   };
   calculatedCBM: number;
}

export const DimensionsInput: React.FC<DimensionsInputProps> = ({
   useDimensions = false,
   onToggleMode,
   length,
   width,
   height,
   cbm,
   onChangeLength,
   onChangeWidth,
   onChangeHeight,
   onChangeCBM,
   errors,
   calculatedCBM,
}) => {
   const { colors, isDark } = useAppTheme();

   const styles = useMemo(() => StyleSheet.create({
      card: {
         marginVertical: 8,
         borderRadius: 12,
         backgroundColor: colors.background.card,
      },
      cardContent: {
         padding: 16,
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
            {/* Toggle - Improved visual feedback */}
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
                  {/* Dimension Fields - Fixed equal-width layout */}
                  <View style={styles.row}>
                     <View style={styles.dimensionColumn}>
                        <FormInput
                           label="Longueur"
                           value={length}
                           onChangeText={onChangeLength}
                           error={errors.length}
                           keyboardType="decimal-pad"
                           placeholder="0"
                           suffix="cm"
                        />
                     </View>
                     <View style={styles.dimensionColumn}>
                        <FormInput
                           label="Largeur"
                           value={width}
                           onChangeText={onChangeWidth}
                           error={errors.width}
                           keyboardType="decimal-pad"
                           placeholder="0"
                           suffix="cm"
                        />
                     </View>
                     <View style={styles.dimensionColumn}>
                        <FormInput
                           label="Hauteur"
                           value={height}
                           onChangeText={onChangeHeight}
                           error={errors.height}
                           keyboardType="decimal-pad"
                           placeholder="0"
                           suffix="cm"
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
                  <FormInput
                     label="CBM direct"
                     value={cbm}
                     onChangeText={onChangeCBM}
                     error={errors.cbm}
                     keyboardType="phone-pad"
                     placeholder="0.0000"
                     suffix="m³"
                  />
               </View>
            )}
         </Card.Content>
      </Card>
   );
};

export default DimensionsInput;
