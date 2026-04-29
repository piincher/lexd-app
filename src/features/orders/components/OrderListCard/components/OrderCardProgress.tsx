import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface OrderCardProgressProps {
   progress: number;
   fillColor: string;
}

export const OrderCardProgress: React.FC<OrderCardProgressProps> = ({
   progress,
   fillColor,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.progressRow}>
         <View
            style={[
               styles.progressTrack,
               { backgroundColor: colors.border },
            ]}
         >
            <View
               style={[
                  styles.progressFill,
                  {
                     backgroundColor: fillColor,
                     width: `${progress}%`,
                  },
               ]}
            />
         </View>
         <Text style={[styles.progressLabel, { color: colors.text.disabled }]}>
            {progress}%
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   progressRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      gap: 8,
   },
   progressTrack: {
      flex: 1,
      height: 4,
      borderRadius: 2,
      overflow: "hidden",
   },
   progressFill: {
      height: "100%",
      borderRadius: 2,
   },
   progressLabel: {
      fontSize: 10,
      fontWeight: "600",
      width: 28,
      textAlign: "right",
   },
});
