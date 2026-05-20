import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeColors } from "@src/constants/Theme";

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    container: {
      backgroundColor: colors.background.paper,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "85%",
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
    },
    headerTitle: {
      flex: 1,
      fontFamily: Fonts.BOLD,
      fontSize: 18,
      color: colors.text.primary,
    },
    closeButton: {
      padding: 4,
    },
    loadingContainer: {
      paddingVertical: 60,
      alignItems: "center",
    },
    loadingText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 12,
    },
    errorContainer: {
      paddingVertical: 60,
      alignItems: "center",
      paddingHorizontal: 20,
    },
    errorText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 8,
    },
    retryButton: {
      marginTop: 16,
      paddingHorizontal: 24,
      paddingVertical: 10,
      backgroundColor: colors.primary.main,
      borderRadius: 8,
    },
    retryText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 14,
      color: colors.primary.contrast,
    },
    content: {
      padding: 16,
      paddingBottom: 32,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    statBox: {
      width: "47%",
      padding: 14,
      borderRadius: 12,
      backgroundColor: colors.background.default,
      borderLeftWidth: 4,
      alignItems: "flex-start",
    },
    statValue: {
      fontFamily: Fonts.BOLD,
      fontSize: 20,
      marginTop: 6,
    },
    statLabel: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
    timelineContainer: {
      marginTop: 20,
      backgroundColor: colors.background.default,
      borderRadius: 12,
      padding: 14,
    },
    timelineTitle: {
      fontFamily: Fonts.BOLD,
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 10,
    },
    timelineScroll: {
      paddingVertical: 4,
      paddingRight: 8,
    },
    timelineItem: {
      alignItems: "center",
      marginRight: 10,
      width: 40,
    },
    barWrapper: {
      height: 160,
      justifyContent: "flex-end",
    },
    bar: {
      width: 24,
      borderRadius: 4,
      minHeight: 2,
    },
    barCount: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 11,
      color: colors.text.primary,
      marginTop: 4,
    },
    barDate: {
      fontFamily: Fonts.REGULAR,
      fontSize: 10,
      color: colors.text.disabled,
      marginTop: 2,
    },
    emptyTimeline: {
      paddingVertical: 24,
      alignItems: "center",
    },
    emptyText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 13,
      color: colors.text.disabled,
    },
    promoInfo: {
      marginTop: 20,
      backgroundColor: colors.background.default,
      borderRadius: 12,
      padding: 14,
    },
    promoInfoTitle: {
      fontFamily: Fonts.BOLD,
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 10,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
    },
    infoLabel: {
      fontFamily: Fonts.REGULAR,
      fontSize: 13,
      color: colors.text.secondary,
    },
    infoValue: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 13,
      color: colors.text.primary,
    },
  });
