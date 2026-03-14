import { Fonts } from "@src/constants/Fonts";
import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
   StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: colors.background.default,
      },
      scrollContent: {
         paddingBottom: 100,
      },
      section: {
         marginVertical: 24,
         paddingHorizontal: 16,
      },
      sectionTitle: {
         fontFamily: Fonts.bold,
         fontSize: 26,
         color: colors.text.primary,
         marginBottom: 24,
         textAlign: "center",
      },
      // Shipping Solutions styles
      horizontalScroll: {
         paddingHorizontal: 16,
         gap: 16,
      },
      card: {
         width: 200,
         height: 280,
         borderRadius: 24,
         marginRight: 16,
         overflow: "hidden",
      },
      cardGradient: {
         flex: 1,
         padding: 24,
         justifyContent: "center",
         alignItems: "center",
      },
      cardTitle: {
         fontFamily: Fonts.bold,
         fontSize: 24,
         color: "white",
         marginVertical: 12,
         textAlign: "center",
      },
      cardText: {
         fontFamily: Fonts.meduim,
         fontSize: 16,
         color: "rgba(255,255,255,0.9)",
         textAlign: "center",
         lineHeight: 22,
      },
      // Features styles
      featuresGrid: {
         flexDirection: "row",
         flexWrap: "wrap",
         gap: 16,
         justifyContent: "center",
      },
      featureItem: {
         width: "45%",
         backgroundColor: colors.background.card,
         padding: 16,
         borderRadius: 12,
         flexDirection: "row",
         alignItems: "center",
         gap: 8,
         shadowColor: colors.primary.dark,
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.1,
         shadowRadius: 8,
         elevation: 3,
         borderWidth: 1,
         borderColor: colors.border,
      },
      featureText: {
         fontFamily: Fonts.meduim,
         fontSize: 14,
         color: colors.text.primary,
         flexShrink: 1,
      },
      // Workflow styles
      workflowContainer: {
         gap: 16,
      },
      workflowStep: {
         backgroundColor: colors.background.card,
         borderRadius: 12,
         padding: 16,
         flexDirection: "row",
         alignItems: "center",
         shadowColor: colors.primary.dark,
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.1,
         shadowRadius: 8,
         elevation: 3,
         borderWidth: 1,
         borderColor: colors.border,
      },
      workflowIcon: {
         backgroundColor: colors.primary.main,
         borderRadius: 8,
         padding: 12,
         marginRight: 16,
      },
      workflowText: {
         flex: 1,
      },
      workflowStepTitle: {
         fontFamily: Fonts.bold,
         fontSize: 16,
         color: colors.text.primary,
         marginBottom: 4,
      },
      workflowStepDescription: {
         fontFamily: Fonts.meduim,
         fontSize: 14,
         color: colors.text.secondary,
         lineHeight: 20,
      },
      // Why Us Card styles
      whyUsCard: {
         width: 240,
         padding: 20,
         borderRadius: 12,
         marginRight: 16,
      },
      whyUsTitle: {
         fontFamily: Fonts.bold,
         fontSize: 18,
         color: "white",
         marginVertical: 8,
      },
      whyUsDescription: {
         fontFamily: Fonts.meduim,
         fontSize: 14,
         color: "rgba(255,255,255,0.9)",
      },
      // Partners styles
      partnersScroll: {
         paddingHorizontal: 16,
      },
      partnerLogo: {
         width: 70,
         height: 80,
         resizeMode: "contain",
         marginRight: 32,
      },
      // Back to Top Button styles
      backToTop: {
         position: "absolute",
         bottom: 30,
         right: 20,
         zIndex: 100,
      },
      backToTopButton: {
         width: 50,
         height: 50,
         borderRadius: 25,
         justifyContent: "center",
         alignItems: "center",
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.3,
         shadowRadius: 6,
         elevation: 8,
      },
      // WhatsApp Button styles
      whatsappButton: {
         position: "absolute",
         bottom: 30,
         left: 20,
         zIndex: 100,
      },
      whatsappContainer: {
         width: 60,
         height: 60,
         borderRadius: 30,
         justifyContent: "center",
         alignItems: "center",
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.3,
         shadowRadius: 6,
         elevation: 8,
      },
   });
