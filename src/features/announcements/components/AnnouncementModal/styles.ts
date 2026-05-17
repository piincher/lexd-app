import { StyleSheet } from "react-native";
import { lightTheme, Theme } from "@src/constants/Theme";
import type { AnnouncementType } from "../../types";

type AppColors = typeof lightTheme.colors;

export const getTone = (type: AnnouncementType) => {
  const tones = {
    INFO: { color: Theme.status.info, bg: Theme.feedback.infoBg, icon: "information-circle" as const },
    WARNING: { color: Theme.status.warning, bg: Theme.feedback.warningBg, icon: "warning" as const },
    SUCCESS: { color: Theme.status.success, bg: Theme.feedback.successBg, icon: "checkmark-circle" as const },
    URGENT: { color: Theme.status.error, bg: Theme.feedback.errorBg, icon: "alert-circle" as const },
    PROMOTION: { color: Theme.primary.main, bg: Theme.primary[50], icon: "gift" as const },
    MAINTENANCE: { color: Theme.neutral[500], bg: Theme.neutral[100], icon: "construct" as const },
  };
  return tones[type] || tones.INFO;
};

export const createStyles = (colors: AppColors, tone: ReturnType<typeof getTone>) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.48)",
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 8,
      padding: 20,
      gap: 14,
      shadowColor: "#000",
      shadowOpacity: 0.18,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 10,
    },
    closeButton: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
    iconCircle: {
      width: 58,
      height: 58,
      borderRadius: 29,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tone.bg,
      alignSelf: "center",
    },
    title: {
      color: colors.text.primary,
      fontSize: 20,
      fontWeight: "800",
      textAlign: "center",
    },
    message: {
      color: colors.text.secondary,
      fontSize: 15,
      lineHeight: 22,
      textAlign: "center",
    },
  });
