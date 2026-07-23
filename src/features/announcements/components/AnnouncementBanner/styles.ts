import { StyleSheet } from "react-native";
import { lightTheme, Theme } from "@src/constants/Theme";
import type { AnnouncementType } from "../../types";
import { HAIRLINE } from "@src/shared/ui/designLanguage";

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
    shell: {
      // Floating toast: it sits above the screen's own content, so it keeps a
      // shadow. The bordered surface is `banner` inside it.
      elevation: 6,
      shadowColor: '#000',
      shadowOpacity: 0.16,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 3 },
      position: "absolute",
      top: 8,
      left: 12,
      right: 12,
      zIndex: 1000,
    },
    banner: {
      borderWidth: HAIRLINE,
      borderColor: colors.border,
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
