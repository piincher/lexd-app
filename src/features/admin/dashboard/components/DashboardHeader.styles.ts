import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeContextType } from "@src/constants/Theme";

type AppThemeColors = ThemeContextType["colors"];

export const createDashboardHeaderStyles = (colors: AppThemeColors, isDark?: boolean) => StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
    ...Theme.shadows.sm,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: isDark ? colors.action.hover : colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border,
    flexShrink: 1,
  },
  dateText: {
    color: colors.text.secondary,
    fontSize: 11,
    fontFamily: Fonts.bold,
    textTransform: "capitalize",
    flexShrink: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: isDark ? colors.action.hover : colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.94 }],
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greetingBlock: {
    flex: 1,
    paddingRight: 12,
  },
  greeting: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: colors.primary.main,
    textTransform: "uppercase",
  },
  name: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: colors.text.primary,
    marginTop: 3,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
    marginTop: 4,
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: isDark ? colors.primary.main + "20" : colors.primary[50],
    borderWidth: 1,
    borderColor: isDark ? colors.primary.main + "38" : colors.primary[200],
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInner: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary.main,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: colors.text.inverse,
  },
});
