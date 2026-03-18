import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";

interface ShippingModeSelectorProps {
  value: "air" | "sea";
  onChange: (mode: "air" | "sea") => void;
}

export const ShippingModeSelector: React.FC<ShippingModeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mode d&apos;expédition</Text>
      <View style={styles.buttonGroup}>
        <Pressable
          style={[
            styles.button,
            value === "air" && styles.buttonActive,
          ]}
          onPress={() => onChange("air")}
        >
          <Text style={[styles.buttonText, value === "air" && styles.buttonTextActive]}>
            ✈️ Air
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            value === "sea" && styles.buttonActive,
          ]}
          onPress={() => onChange("sea")}
        >
          <Text style={[styles.buttonText, value === "sea" && styles.buttonTextActive]}>
            🚢 Sea
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  buttonActive: {
    borderColor: COLORS.blue,
    backgroundColor: COLORS.lightBackground,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.grey,
  },
  buttonTextActive: {
    color: COLORS.blue,
    fontWeight: "600",
  },
});
