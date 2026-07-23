import { Dimensions, StyleSheet } from "react-native";
import { lightTheme, Theme } from "@src/constants/Theme";
import type { AnnouncementType } from "../../types";
import { HAIRLINE } from "@src/shared/ui/designLanguage";

type AppColors = typeof lightTheme.colors;

const SCREEN = Dimensions.get("window");
const CARD_MAX_HEIGHT = Math.min(SCREEN.height * 0.82, 660);
const CAROUSEL_HEIGHT = Math.min(SCREEN.height * 0.5, 440);

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
    // Full-screen, in-tree overlay. Sits above the navigator via z-index/elevation.
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.48)",
    },
    card: {
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      width: "100%",
      maxWidth: 420,
      maxHeight: CARD_MAX_HEIGHT,
      backgroundColor: colors.background.card,
      borderRadius: 8,
      padding: 20,
      gap: 14,
    },
    carousel: {
      height: CAROUSEL_HEIGHT,
    },
    slideContent: {
      gap: 12,
      paddingHorizontal: 2,
      paddingBottom: 6,
    },
    slideImage: {
      width: "100%",
      height: 170,
      borderRadius: 10,
      backgroundColor: colors.neutral[100],
    },
    dots: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 6,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
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
