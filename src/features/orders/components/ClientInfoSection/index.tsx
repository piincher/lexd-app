import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import AuthInputField from "@src/components/AuthInput/AuthInput";
import { COLORS } from "@src/constants/Colors";

interface ClientInfoSectionProps {
  // Formik will handle the field values via name prop
}

export const ClientInfoSection: React.FC<ClientInfoSectionProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>👤 Informations client</Text>
      
      <AuthInputField
        label="Nom du client"
        name="clientName"
        autoCapitalize="words"
        containerStyle={styles.input}
      />
      
      <AuthInputField
        label="Numéro de téléphone"
        name="clientPhone"
        keyboardType="phone-pad"
        maxLength={8}
        containerStyle={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: COLORS.black,
  },
  input: {
    marginBottom: 12,
  },
});
