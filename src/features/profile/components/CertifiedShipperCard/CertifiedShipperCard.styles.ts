/**
 * CertifiedShipperCard Styles
 */

import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark: boolean) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16, padding: 16, marginBottom: 12,
    },
    certifiedCard: {
      backgroundColor: colors.background.card,
      borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.accent.gold + '4D',
    },
    loadingContainer: {
      flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 8,
    },
    loadingText: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular, fontSize: 13,
    },
    errorContainer: {
      alignItems: "center", justifyContent: "center", paddingVertical: 16, gap: 8,
    },
    errorText: {
      color: colors.text.secondary,
      fontFamily: Fonts.meduim, fontSize: 13,
    },
    retryButton: {
      marginTop: 8, paddingHorizontal: 16, paddingVertical: 8,
      backgroundColor: colors.accent.gold + '26', borderRadius: 8,
      borderWidth: 1, borderColor: colors.accent.gold + '4D',
    },
    retryText: {
      color: colors.accent.gold, fontFamily: Fonts.meduim, fontSize: 13,
    },
    titleRow: {
      flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12,
    },
    title: {
      color: colors.text.primary, fontFamily: Fonts.bold, fontSize: 16,
    },
    progressBarTrack: {
      height: 8,
      backgroundColor: colors.background.overlay,
      borderRadius: 4, overflow: "hidden", marginBottom: 8,
    },
    progressBarFill: {
      height: "100%", backgroundColor: colors.accent.gold, borderRadius: 4,
    },
    progressInfo: {
      flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4,
    },
    progressText: {
      color: colors.text.secondary,
      fontFamily: Fonts.meduim, fontSize: 13,
    },
    progressPercentage: {
      color: colors.accent.gold, fontFamily: Fonts.bold, fontSize: 13,
    },
    subtitle: {
      color: colors.text.disabled,
      fontFamily: Fonts.regular, fontSize: 12, marginTop: 4,
    },
    certifiedHeader: {
      flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8,
    },
    certifiedTitle: {
      color: colors.accent.goldLight, fontFamily: Fonts.bold, fontSize: 16,
    },
    issuedDate: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular, fontSize: 12, marginBottom: 14,
    },
    buttonRow: {
      flexDirection: "row", gap: 10,
    },
    actionButton: {
      flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
      backgroundColor: colors.accent.gold + '26', borderRadius: 10, paddingVertical: 10,
      borderWidth: 1, borderColor: colors.accent.gold + '4D',
    },
    actionButtonDisabled: {
      opacity: 0.6,
    },
    actionButtonText: {
      color: colors.accent.gold, fontFamily: Fonts.meduim, fontSize: 13,
    },
    newBadge: {
      backgroundColor: colors.accent.gold, paddingHorizontal: 8, paddingVertical: 2,
      borderRadius: 10, marginLeft: 8,
    },
    newBadgeText: {
      color: colors.text.inverse, fontFamily: Fonts.bold, fontSize: 10,
    },
    chevronHint: {
      position: "absolute", top: 16, right: 16,
    },
  });
  return {
    ...styles,
    chevronHintColor: colors.text.disabled,
  };
};
