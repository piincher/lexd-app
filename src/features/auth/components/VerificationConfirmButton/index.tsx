import React from "react";
import { Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "@src/constants/Fonts";

interface VerificationConfirmButtonProps {
  isComplete: boolean;
  isPending: boolean;
  onConfirm: () => void;
}

export const VerificationConfirmButton: React.FC<VerificationConfirmButtonProps> = ({
  isComplete,
  isPending,
  onConfirm,
}) => {
  return (
    <Pressable
      onPress={onConfirm}
      disabled={!isComplete || isPending}
      style={({ pressed }) => [
        styles.confirmBtn,
        (!isComplete || isPending) && styles.confirmBtnDisabled,
        pressed && isComplete && !isPending && styles.confirmBtnPressed,
      ]}
    >
      <LinearGradient
        colors={isComplete && !isPending ? ["#22C55E", "#16A34A"] : ["#9CA3AF", "#9CA3AF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.confirmGradient}
      >
        {isPending ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <>
            <Text style={styles.confirmText}>Valider</Text>
            <MaterialCommunityIcons name="check" size={20} color="#FFF" />
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  confirmBtn: {
    marginTop: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  confirmBtnDisabled: {
    opacity: 0.6,
  },
  confirmBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  confirmGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  confirmText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "#FFF",
    letterSpacing: 0.3,
  },
});

export default VerificationConfirmButton;
