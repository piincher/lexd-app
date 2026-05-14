import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { hapticMedium } from "@src/shared/lib/haptics";

export interface Step {
   id: string;
   title: string;
}

interface BatchUpdateStatusStepperProps {
   steps: Step[];
   selected: string | null;
   onSelect: (title: string) => void;
}

export const BatchUpdateStatusStepper: React.FC<BatchUpdateStatusStepperProps> = ({
   steps,
   selected,
   onSelect,
}) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               marginHorizontal: 16,
               marginBottom: 20,
            },
            label: {
               fontSize: 13,
               fontWeight: "700",
               color: colors.text.secondary,
               marginBottom: 12,
            },
            stepRow: {
               flexDirection: "row",
               minHeight: 64,
            },
            trackColumn: {
               width: 36,
               alignItems: "center",
            },
            dot: {
               width: 24,
               height: 24,
               borderRadius: 12,
               borderWidth: 2,
               alignItems: "center",
               justifyContent: "center",
            },
            dotActive: {
               backgroundColor: colors.primary.main,
               borderColor: colors.primary.main,
            },
            dotInactive: {
               backgroundColor: colors.background.card,
               borderColor: colors.border,
            },
            line: {
               width: 2,
               flex: 1,
            },
            card: {
               flex: 1,
               borderRadius: 14,
               borderWidth: 1.5,
               padding: 14,
               marginBottom: 8,
               minHeight: 56,
               justifyContent: "center",
            },
            cardText: {
               fontSize: 14,
               fontWeight: "700",
               lineHeight: 20,
            },
         }),
      [colors]
   );

   return (
      <View style={styles.container}>
         <Text style={styles.label}>Nouveau statut</Text>
         {steps.map((step, index) => {
            const isActive = selected === step.title;
            const isLast = index === steps.length - 1;

            return (
               <Pressable
                  key={step.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                  onPress={() => {
                     hapticMedium();
                     onSelect(step.title);
                  }}
                  style={({ pressed }) => [
                     styles.stepRow,
                     { opacity: pressed ? 0.78 : 1 },
                  ]}
               >
                  <View style={styles.trackColumn}>
                     <View
                        style={[
                           styles.dot,
                           isActive ? styles.dotActive : styles.dotInactive,
                        ]}
                     >
                        {isActive && (
                           <Ionicons name="checkmark" size={14} color={colors.text.inverse} />
                        )}
                     </View>
                     {!isLast && (
                        <View
                           style={[
                              styles.line,
                              { backgroundColor: isActive ? colors.primary.main : colors.border },
                           ]}
                        />
                     )}
                  </View>
                  <View
                     style={[
                        styles.card,
                        {
                           backgroundColor: isActive ? colors.primary[50] : colors.background.card,
                           borderColor: isActive ? colors.primary.main : colors.border,
                        },
                     ]}
                  >
                     <Text
                        style={[
                           styles.cardText,
                           { color: isActive ? colors.primary.dark : colors.text.primary },
                        ]}
                     >
                        {step.title}
                     </Text>
                  </View>
               </Pressable>
            );
         })}
      </View>
   );
};
