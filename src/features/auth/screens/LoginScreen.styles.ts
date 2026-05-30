import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  form: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    marginBottom: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    letterSpacing: 0.5,
  },
  demoLink: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  demoLinkText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    letterSpacing: 0.2,
  },
});
