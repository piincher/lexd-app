/**
 * CertifiedShipperCard Styles
 */

import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : colors.background.paper || "#f5f5f5",
      borderRadius: 16, padding: 16, marginBottom: 12,
    },
    certifiedCard: {
      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : colors.background.paper || "#f5f5f5",
      borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "rgba(212,168,67,0.3)",
    },
    loadingContainer: {
      flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 8,
    },
    loadingText: {
      color: isDark ? "rgba(255,255,255,0.6)" : colors.text.secondary,
      fontFamily: Fonts.regular, fontSize: 13,
    },
    errorContainer: {
      alignItems: "center", justifyContent: "center", paddingVertical: 16, gap: 8,
    },
    errorText: {
      color: isDark ? "rgba(255,255,255,0.7)" : colors.text.secondary,
      fontFamily: Fonts.meduim, fontSize: 13,
    },
    retryButton: {
      marginTop: 8, paddingHorizontal: 16, paddingVertical: 8,
      backgroundColor: "rgba(212,168,67,0.15)", borderRadius: 8,
      borderWidth: 1, borderColor: "rgba(212,168,67,0.3)",
    },
    retryText: {
      color: "#d4a843", fontFamily: Fonts.meduim, fontSize: 13,
    },
    titleRow: {
      flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12,
    },
    title: {
      color: colors.text.primary, fontFamily: Fonts.bold, fontSize: 16,
    },
    progressBarTrack: {
      height: 8,
      backgroundColor: isDark ? "rgba(255,255,255,0.15)" : colors.action.disabledBackground || "#e0e0e0",
      borderRadius: 4, overflow: "hidden", marginBottom: 8,
    },
    progressBarFill: {
      height: "100%", backgroundColor: "#d4a843", borderRadius: 4,
    },
    progressInfo: {
      flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4,
    },
    progressText: {
      color: isDark ? "rgba(255,255,255,0.8)" : colors.text.secondary,
      fontFamily: Fonts.meduim, fontSize: 13,
    },
    progressPercentage: {
      color: "#d4a843", fontFamily: Fonts.bold, fontSize: 13,
    },
    subtitle: {
      color: isDark ? "rgba(255,255,255,0.5)" : colors.text.hint,
      fontFamily: Fonts.regular, fontSize: 12, marginTop: 4,
    },
    certifiedHeader: {
      flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8,
    },
    certifiedTitle: {
      color: "#F4D03F", fontFamily: Fonts.bold, fontSize: 16,
    },
    issuedDate: {
      color: isDark ? "rgba(255,255,255,0.6)" : colors.text.secondary,
      fontFamily: Fonts.regular, fontSize: 12, marginBottom: 14,
    },
    buttonRow: {
      flexDirection: "row", gap: 10,
    },
    actionButton: {
      flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
      backgroundColor: "rgba(212,168,67,0.15)", borderRadius: 10, paddingVertical: 10,
      borderWidth: 1, borderColor: "rgba(212,168,67,0.3)",
    },
    actionButtonDisabled: {
      opacity: 0.6,
    },
    actionButtonText: {
      color: "#d4a843", fontFamily: Fonts.meduim, fontSize: 13,
    },
    newBadge: {
      backgroundColor: "#d4a843", paddingHorizontal: 8, paddingVertical: 2,
      borderRadius: 10, marginLeft: 8,
    },
    newBadgeText: {
      color: "#FFF", fontFamily: Fonts.bold, fontSize: 10,
    },
    chevronHint: {
      position: "absolute", top: 16, right: 16,
    },
    chevronHintColor: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
  });
