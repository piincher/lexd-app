import { StyleSheet, Platform } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/shared/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const createStyles = (colors: ThemeColors, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 12 : 20,
    paddingBottom: 16,
    backgroundColor: colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.neutral[100],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: colors.text.secondary,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.text.primary,
  },
  sectionCount: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.text.secondary,
  },
  loadingBox: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loadingText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.text.secondary,
  },
});
