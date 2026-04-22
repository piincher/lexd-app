import { StyleSheet } from "react-native";

export const createStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden" as const,
  },
  safeArea: {
    flex: 1,
  },
});
