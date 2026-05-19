import { StyleSheet } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  buttonContainer: {
    width: "50%",
    alignSelf: "center",
    marginBottom: 50,
  },
});
