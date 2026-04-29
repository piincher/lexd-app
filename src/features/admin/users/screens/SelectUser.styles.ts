import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },
  buttonContainer: {
    width: "50%",
    alignSelf: "center",
    marginBottom: 50,
  },
});
