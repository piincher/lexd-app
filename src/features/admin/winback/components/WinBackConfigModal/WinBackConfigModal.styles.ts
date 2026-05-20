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
      maxHeight: "90%",
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
    content: {
      padding: 20,
      paddingBottom: 8,
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    label: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 14,
      color: colors.text.primary,
    },
    grid2: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 14,
    },
    field: {
      width: "47%",
    },
    input: {
      backgroundColor: colors.background.default,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.primary,
      marginTop: 6,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    textArea: {
      height: 80,
      textAlignVertical: "top",
    },
    sectionTitle: {
      fontFamily: Fonts.BOLD,
      fontSize: 14,
      color: colors.text.primary,
      marginTop: 8,
      marginBottom: 10,
    },
    channelsRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 14,
    },
    channelChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    channelChipActive: {
      backgroundColor: colors.primary.main,
      borderColor: colors.primary.main,
    },
    channelText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 13,
      color: colors.text.secondary,
    },
    channelTextActive: {
      color: colors.text.inverse,
    },
    segmentRow: {
      flexDirection: "row",
      marginTop: 6,
    },
    segment: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    segmentActive: {
      backgroundColor: colors.primary.main,
      borderColor: colors.primary.main,
    },
    segmentText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 13,
      color: colors.text.secondary,
    },
    segmentTextActive: {
      color: colors.text.inverse,
    },
    footer: {
      flexDirection: "row",
      padding: 16,
      gap: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border.light,
    },
    cancelButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: colors.neutral[100],
      alignItems: "center",
    },
    saveButton: {
      flex: 2,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
    },
    footerText: {
      fontFamily: Fonts.BOLD,
      fontSize: 15,
    },
  });
