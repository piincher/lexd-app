import { StyleSheet, Platform } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 12 : 20,
    paddingBottom: 16,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Theme.colors.neutral[100],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.secondary,
  },
});
