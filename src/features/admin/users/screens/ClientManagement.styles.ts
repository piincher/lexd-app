import { StyleSheet } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  flex: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
});
