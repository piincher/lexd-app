import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const GOLD = "#F4D03F";
export const GOLD_DARK = "#d4a843";
export const CARD_BG = "rgba(255,255,255,0.12)";
export const CARD_BORDER = "rgba(212,168,67,0.3)";
export const WHITE_60 = "rgba(255,255,255,0.6)";
export const WHITE_80 = "rgba(255,255,255,0.8)";

export const createStyles = (inverseTextColor: string) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#1a237e",
    },
    backButton: {
      position: "absolute",
      top: 56,
      left: 16,
      zIndex: 10,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "rgba(255,255,255,0.15)",
      alignItems: "center",
      justifyContent: "center",
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 40,
    },
    trophyContainer: {
      alignItems: "center",
      marginBottom: 16,
    },
    trophyGlow: {
      width: 130,
      height: 130,
      borderRadius: 65,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: CARD_BORDER,
    },
    title: {
      fontSize: 28,
      fontFamily: Fonts.bold,
      color: GOLD,
      textAlign: "center",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: Fonts.meduim,
      color: inverseTextColor,
      textAlign: "center",
      marginBottom: 28,
      letterSpacing: 1,
    },
    infoCard: {
      backgroundColor: CARD_BG,
      borderRadius: 20,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: CARD_BORDER,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
    },
    infoIconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: "rgba(212,168,67,0.12)",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 14,
    },
    infoTextWrapper: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: WHITE_60,
      marginBottom: 4,
    },
    infoValue: {
      fontSize: 15,
      fontFamily: Fonts.meduim,
      color: inverseTextColor,
    },
    codeRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    verificationCode: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: GOLD,
      letterSpacing: 3,
    },
    copyButton: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: "rgba(212,168,67,0.15)",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: CARD_BORDER,
    },
    cardDivider: {
      height: 1,
      backgroundColor: "rgba(255,255,255,0.08)",
    },
    badgeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 2,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 20,
    },
    statusText: {
      fontSize: 12,
      fontFamily: Fonts.bold,
      color: inverseTextColor,
      letterSpacing: 1,
    },
    verificationCard: {
      backgroundColor: CARD_BG,
      borderRadius: 20,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.1)",
    },
    verificationHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 16,
    },
    verificationTitle: {
      fontSize: 14,
      fontFamily: Fonts.meduim,
      color: inverseTextColor,
      flex: 1,
    },
    urlContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: "rgba(255,255,255,0.08)",
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.1)",
    },
    urlText: {
      flex: 1,
      fontSize: 13,
      fontFamily: Fonts.meduim,
      color: WHITE_80,
      letterSpacing: 0.3,
    },
    urlHint: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: WHITE_60,
      textAlign: "center",
      marginTop: 10,
    },
    actionsContainer: {
      gap: 12,
      marginBottom: 24,
    },
    downloadButton: {
      borderRadius: 16,
      overflow: "hidden",
    },
    downloadButtonDisabled: {
      opacity: 0.6,
    },
    downloadGradient: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      paddingVertical: 16,
      borderRadius: 16,
    },
    downloadText: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: "#1a237e",
    },
    downloadTextDisabled: {
      color: WHITE_60,
    },
    shareButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      paddingVertical: 16,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: CARD_BORDER,
      backgroundColor: "rgba(212,168,67,0.08)",
    },
    shareText: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: GOLD,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    footerText: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: WHITE_60,
      textAlign: "center",
      lineHeight: 18,
      flex: 1,
    },
  });
