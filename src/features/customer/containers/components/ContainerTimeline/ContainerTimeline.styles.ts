import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createTimelineStyles = (colors: { neutral: Record<string, string>; status: { success: string }; background: { card: string; paper: string }; text: { primary: string; secondary: string }; border: string }, primaryColor: string) =>
  StyleSheet.create({
    container: { marginVertical: 16 },
    progressBarContainer: { height: 4, marginHorizontal: 24, marginBottom: -14, position: "relative" },
    progressBarBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.neutral[200], borderRadius: 2 },
    progressBarFill: { height: "100%", borderRadius: 2 },
    stepsContainer: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16 },
    stepWrapper: { alignItems: "center", flex: 1 },
    stepDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.neutral[200], justifyContent: "center", alignItems: "center", marginBottom: 8 },
    stepDotCompleted: { backgroundColor: colors.status.success },
    stepDotCurrent: { backgroundColor: colors.background.card, borderWidth: 3, transform: [{ scale: 1.1 }] },
    stepDotFuture: { backgroundColor: colors.background.paper, borderWidth: 1, borderColor: colors.border },
    stepLabel: { fontSize: 11, fontFamily: Fonts.meduim, color: colors.text.primary, textAlign: "center", marginBottom: 4 },
    stepLabelCurrent: { fontFamily: Fonts.bold },
    stepLabelFuture: { color: colors.text.secondary },
    stepDate: { fontSize: 10, fontFamily: Fonts.regular, textAlign: "center" },
    stepDateCompleted: { color: colors.text.primary },
    stepDateFuture: { color: colors.text.secondary },
    estimatedText: { fontSize: 9, fontFamily: Fonts.meduim, marginTop: 4, textAlign: "center" },
  });
