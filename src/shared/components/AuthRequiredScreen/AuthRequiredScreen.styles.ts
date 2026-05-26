/* Hallmark · genre: modern-minimal · macrostructure: Secure Profile Gate · designed-as-app */
import { Platform, StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { lightTheme } from "@src/shared/constants/Theme";

type AppColors = typeof lightTheme.colors;

const shadow = {
   ...Platform.select({
      ios: {
         shadowOffset: { width: 0, height: 10 },
         shadowOpacity: 0.18,
         shadowRadius: 18,
      },
      android: {
         elevation: 5,
      },
      default: {},
   }),
};

export const createAuthRequiredStyles = (colors: AppColors) =>
   StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: colors.background.default,
      },
      backgroundLayer: {
         ...StyleSheet.absoluteFillObject,
         overflow: "hidden",
      },
      topBlock: {
         position: "absolute",
         top: -26,
         right: -34,
         width: 178,
         height: 142,
         borderRadius: 8,
         backgroundColor: colors.primary.main,
         opacity: 0.14,
         transform: [{ rotate: "18deg" }],
      },
      bottomBlock: {
         position: "absolute",
         left: -38,
         bottom: 28,
         width: 162,
         height: 118,
         borderRadius: 8,
         backgroundColor: colors.background.paper,
         borderWidth: 1,
         borderColor: colors.border,
         transform: [{ rotate: "-10deg" }],
      },
      accentRule: {
         position: "absolute",
         left: 24,
         top: 96,
         width: 88,
         height: 4,
         borderRadius: 2,
         backgroundColor: colors.accent.gold,
      },
      scrollContent: {
         flexGrow: 1,
         justifyContent: "space-between",
         paddingHorizontal: 24,
         paddingTop: 42,
         paddingBottom: 28,
         gap: 30,
      },
      content: {
         width: "100%",
         maxWidth: 440,
         alignSelf: "center",
      },
      brandRow: {
         flexDirection: "row",
         alignItems: "center",
         gap: 12,
      },
      brandMark: {
         width: 52,
         height: 52,
         borderRadius: 8,
         alignItems: "center",
         justifyContent: "center",
         backgroundColor: colors.primary.main,
         shadowColor: colors.primary.dark,
         ...shadow,
      },
      brandCopy: {
         flex: 1,
      },
      brandTitle: {
         color: colors.primary.main,
         fontFamily: Fonts.bold,
         fontSize: 14,
         letterSpacing: 2,
      },
      brandSubtitle: {
         marginTop: 3,
         color: colors.text.secondary,
         fontFamily: Fonts.medium,
         fontSize: 12,
      },
      statusPanel: {
         marginTop: 42,
         alignSelf: "flex-start",
         flexDirection: "row",
         alignItems: "center",
         gap: 8,
         minHeight: 44,
         paddingHorizontal: 14,
         borderRadius: 8,
         borderWidth: 1,
         borderColor: colors.border,
         backgroundColor: colors.background.paper,
      },
      statusText: {
         color: colors.text.primary,
         fontFamily: Fonts.bold,
         fontSize: 13,
      },
      heroBlock: {
         marginTop: 24,
      },
      title: {
         color: colors.text.primary,
         fontFamily: Fonts.black,
         fontSize: 34,
         lineHeight: 39,
      },
      subtitle: {
         maxWidth: 340,
         marginTop: 14,
         color: colors.text.secondary,
         fontFamily: Fonts.regular,
         fontSize: 16,
         lineHeight: 24,
      },
      actionBlock: {
         marginTop: 34,
         gap: 12,
      },
      loginButton: {
         minHeight: 60,
         borderRadius: 8,
      },
      loginButtonText: {
         fontFamily: Fonts.bold,
         letterSpacing: 0.2,
      },
      securityNote: {
         flexDirection: "row",
         alignItems: "center",
         gap: 10,
         minHeight: 52,
         paddingHorizontal: 14,
         paddingVertical: 12,
         borderRadius: 8,
         borderWidth: 1,
         borderColor: colors.border,
         backgroundColor: colors.background.card,
      },
      securityText: {
         flex: 1,
         color: colors.text.secondary,
         fontFamily: Fonts.medium,
         fontSize: 13,
         lineHeight: 18,
      },
      footer: {
         width: "100%",
         maxWidth: 440,
         alignSelf: "center",
         alignItems: "center",
         gap: 12,
      },
      termsText: {
         color: colors.text.secondary,
         fontFamily: Fonts.regular,
         fontSize: 12,
         lineHeight: 18,
         textAlign: "center",
      },
      legalRow: {
         minHeight: 48,
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "center",
         borderRadius: 8,
         borderWidth: 1,
         borderColor: colors.border,
         backgroundColor: colors.background.paper,
      },
      legalLink: {
         minHeight: 48,
         justifyContent: "center",
         paddingHorizontal: 16,
      },
      legalLinkPressed: {
         opacity: 0.72,
      },
      legalLinkDisabled: {
         opacity: 0.62,
      },
      legalLinkText: {
         color: colors.accent.gold,
         fontFamily: Fonts.bold,
         fontSize: 13,
      },
      legalDivider: {
         width: 1,
         height: 22,
         backgroundColor: colors.border,
      },
      creditText: {
         color: colors.text.muted,
         fontFamily: Fonts.medium,
         fontSize: 11,
         textAlign: "center",
      },
   });
