import React from "react";
import { View } from "react-native";
import { Text, Divider } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createPaymentInfoCardStyles } from "./PaymentInfoCard.styles";

interface PaymentNotesSectionProps {
  notes: string;
}

export const PaymentNotesSection: React.FC<PaymentNotesSectionProps> = ({
  notes,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentInfoCardStyles(colors);

  return (
    <>
      <Divider style={styles.divider} />
      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>Notes</Text>
        <Text style={styles.notesText}>{notes}</Text>
      </View>
    </>
  );
};
