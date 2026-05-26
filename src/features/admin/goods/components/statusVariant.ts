/* Shared status/payment variant → tint colors.
 * One source of truth so a given status looks identical on the list card and the detail screen. */

export type StatusVariant = 'primary' | 'success' | 'warning' | 'info' | 'neutral';

export const getVariantColors = (
  variant: StatusVariant,
  colors: any,
): { bg: string; fg: string; dot: string } => {
  switch (variant) {
    case 'primary':
      return { bg: colors.primary[100], fg: colors.primary[700], dot: colors.primary.main };
    case 'success':
      return { bg: colors.feedback.successBg, fg: colors.feedback.successDark, dot: colors.status.success };
    case 'warning':
      return { bg: colors.feedback.warningBg, fg: colors.feedback.warningDark, dot: colors.status.warning };
    case 'info':
      return { bg: colors.feedback.infoBg, fg: colors.feedback.infoDark, dot: colors.status.info };
    default:
      return { bg: colors.neutral[100], fg: colors.text.secondary, dot: colors.neutral[400] };
  }
};
