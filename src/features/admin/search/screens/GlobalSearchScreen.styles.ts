import { StyleSheet } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  searchContainer: { marginTop: -16, zIndex: 100 },
  resultsContainer: { flex: 1, marginTop: 12 },
});
