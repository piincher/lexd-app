import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface SubmitButtonProps {
   isPending: boolean;
   onPress: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
   isPending,
   onPress,
}) => {
   const { colors } = useAppTheme();

   return (
      <Button
         mode="contained"
         onPress={onPress}
         style={[styles.submitButton, { backgroundColor: colors.status.success }]}
         contentStyle={styles.submitButtonContent}
         loading={isPending}
         disabled={isPending}
      >
         {isPending ? "Création en cours..." : "Créer le destinataire"}
      </Button>
   );
};

const styles = StyleSheet.create({
   submitButton: {
      marginHorizontal: 16,
      marginBottom: 32,
      borderRadius: 12,
   },
   submitButtonContent: {
      paddingVertical: 8,
   },
});
