import { useCallback } from "react";
import * as Haptics from "expo-haptics";

type HapticType = "light" | "medium" | "heavy" | "success" | "warning" | "error";

const HAPTIC_MAP: Record<HapticType, () => Promise<void>> = {
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
};

/**
 * Hook providing typed haptic feedback.
 * Use 'light' for taps, 'medium' for actions, 'heavy' for destructive.
 * Use 'success'/'warning'/'error' for outcomes.
 */
export const useHaptics = () => {
  const trigger = useCallback((type: HapticType = "light") => {
    HAPTIC_MAP[type]().catch(() => {
      // Haptics may fail on unsupported devices; silently ignore
    });
  }, []);

  return { trigger };
};
