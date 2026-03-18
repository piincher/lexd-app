import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, HelperText } from "react-native-paper";
import AuthInputField from "@src/components/AuthInput/AuthInput";
import { COLORS } from "@src/constants/Colors";

interface EstimatedCbmInputProps {
  visible: boolean; // Only show for pre-booking
}

export const EstimatedCbmInput: React.FC<EstimatedCbmInputProps> = ({
  visible,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>📦 Volume estimé (CBM)</Text>
      <AuthInputField
        label="CBM estimé"
        name="estimatedCbm"
        keyboardType="decimal-pad"
        placeholder="Ex: 2.5"
        containerStyle={styles.input}
      />
      <HelperText type="info" visible={true}>
        Estimation du volume pour la pré-réservation. Le montant final sera calculé 
        lors de la réception des marchandises.
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: COLORS.lightGrey + "30",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.blue,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: COLORS.black,
  },
  input: {
    marginBottom: 8,
  },
});
