import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import AppButton from "@src/components/AppButton/AppButton";

interface BatchUpdateSelectionControlsProps {
   onSelectAll: () => void;
   onClear: () => void;
}

export const BatchUpdateSelectionControls: React.FC<BatchUpdateSelectionControlsProps> = ({
   onSelectAll,
   onClear,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.container}>
         <AppButton
            title="Tout sélectionner"
            onPress={onSelectAll}
            style={[styles.button, styles.selectButton, { backgroundColor: colors.primary.main }]}
         />
         <AppButton
            title="Effacer la sélection"
            onPress={onClear}
            style={[styles.button, styles.clearButton, { backgroundColor: colors.neutral[200] }]}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: 10,
   },
   button: {
      flex: 1,
   },
   selectButton: {
      marginRight: 10,
   },
   clearButton: {
      marginLeft: 10,
   },
});
