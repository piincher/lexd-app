import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";

interface OrderTypeSelectorProps {
  value: "standard" | "prebooking";
  onChange: (type: "standard" | "prebooking") => void;
}

export const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type de commande</Text>
      <View style={styles.buttonGroup}>
        <Pressable
          style={[
            styles.button,
            value === "standard" && styles.buttonActive,
          ]}
          onPress={() => onChange("standard")}
        >
          <Text style={styles.buttonTitle}>📦 Standard</Text>
          <Text style={[styles.buttonDesc, value === "standard" && styles.buttonDescActive]}>
            Commande normale
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            value === "prebooking" && styles.buttonActive,
          ]}
          onPress={() => onChange("prebooking")}
        >
          <Text style={styles.buttonTitle}>📅 Pré-réservation</Text>
          <Text style={[styles.buttonDesc, value === "prebooking" && styles.buttonDescActive]}>
            Réserver l&apos;espace
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.black,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  buttonActive: {
    borderColor: COLORS.blue,
    backgroundColor: COLORS.lightBackground,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: COLORS.black,
  },
  buttonDesc: {
    fontSize: 12,
    color: COLORS.grey,
  },
  buttonDescActive: {
    color: COLORS.blue,
  },
});
