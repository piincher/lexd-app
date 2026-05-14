import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStyles = (colors: any) => {
  const gold = colors.accent.goldLight;
  const cardBg = hexToRgba(colors.text.inverse, 0.12);
  const cardBorder = hexToRgba(colors.accent.gold, 0.3);
  const white60 = hexToRgba(colors.text.inverse, 0.6);
  const white80 = hexToRgba(colors.text.inverse, 0.8);

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    backButton: {
      position: "absolute",
      top: 56,
      left: 16,
      zIndex: 10,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: hexToRgba(colors.text.inverse, 0.15),
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
      borderColor: cardBorder,
    },
    title: {
      fontSize: 28,
      fontFamily: Fonts.bold,
      color: gold,
      textAlign: "center",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: Fonts.meduim,
      color: colors.text.inverse,
      textAlign: "center",
      marginBottom: 28,
      letterSpacing: 1,
    },
    infoCard: {
      backgroundColor: cardBg,
      borderRadius: 20,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: cardBorder,
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
      backgroundColor: hexToRgba(colors.accent.gold, 0.12),
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
      color: white60,
      marginBottom: 4,
    },
    infoValue: {
      fontSize: 15,
      fontFamily: Fonts.meduim,
      color: colors.text.inverse,
    },
    codeRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    verificationCode: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: gold,
      letterSpacing: 3,
    },
    copyButton: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: hexToRgba(colors.accent.gold, 0.15),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: cardBorder,
    },
    cardDivider: {
      height: 1,
      backgroundColor: hexToRgba(colors.text.inverse, 0.08),
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
      color: colors.text.inverse,
      letterSpacing: 1,
    },
    verificationCard: {
      backgroundColor: cardBg,
      borderRadius: 20,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: hexToRgba(colors.text.inverse, 0.1),
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
      color: colors.text.inverse,
      flex: 1,
    },
    urlContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: hexToRgba(colors.text.inverse, 0.08),
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: hexToRgba(colors.text.inverse, 0.1),
    },
    urlText: {
      flex: 1,
      fontSize: 13,
      fontFamily: Fonts.meduim,
      color: white80,
      letterSpacing: 0.3,
    },
    urlHint: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: white60,
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
      color: colors.text.inverse,
    },
    downloadTextDisabled: {
      color: white60,
    },
    shareButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      paddingVertical: 16,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: cardBorder,
      backgroundColor: hexToRgba(colors.accent.gold, 0.08),
    },
    shareText: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: gold,
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
      color: white60,
      textAlign: "center",
      lineHeight: 18,
      flex: 1,
    },
  });
};
