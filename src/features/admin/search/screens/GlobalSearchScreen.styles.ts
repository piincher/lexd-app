import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background.default },
  searchContainer: { marginTop: -Theme.spacing.lg, zIndex: 100 },
  resultsContainer: { flex: 1, marginTop: Theme.spacing.md },
});
