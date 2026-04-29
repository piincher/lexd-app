import { StyleSheet } from "react-native";
import { lightTheme } from "@src/constants/Theme";
import type { AnnouncementType } from "../../types";

type AppColors = typeof lightTheme.colors;

export const getTone = (type: AnnouncementType) => {
  const tones = {
    INFO: { color: "#2563EB", bg: "#EFF6FF", icon: "information-circle" as const },
    WARNING: { color: "#D97706", bg: "#FFFBEB", icon: "warning" as const },
    SUCCESS: { color: "#059669", bg: "#ECFDF5", icon: "checkmark-circle" as const },
    URGENT: { color: "#DC2626", bg: "#FEF2F2", icon: "alert-circle" as const },
    PROMOTION: { color: "#7C3AED", bg: "#F5F3FF", icon: "gift" as const },
    MAINTENANCE: { color: "#475569", bg: "#F8FAFC", icon: "construct" as const },
  };

  return tones[type] || tones.INFO;
};

export const createStyles = (colors: AppColors, tone: ReturnType<typeof getTone>) =>
  StyleSheet.create({
    shell: {
      position: "absolute",
      top: 8,
      left: 12,
      right: 12,
      zIndex: 1000,
      elevation: 20,
    },
    banner: {
      minHeight: 56,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: colors.background.card,
      borderLeftWidth: 4,
      borderLeftColor: tone.color,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      shadowColor: "#000",
      shadowOpacity: 0.14,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
    },
    pressed: {
      opacity: 0.92,
    },
    content: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      color: colors.text.primary,
      fontSize: 14,
      fontWeight: "700",
      marginBottom: 2,
    },
    message: {
      color: colors.text.secondary,
      fontSize: 12,
      lineHeight: 16,
    },
    closeButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginRight: -8,
    },
  });
