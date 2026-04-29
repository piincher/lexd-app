import { StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";

export const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    scrollContent: {
      alignItems: "center",
      paddingHorizontal: 15,
      backgroundColor: colors.background.default,
    },
    keyboardAvoiding: {
      flex: 1,
      justifyContent: "center",
      width: "100%",
      alignItems: "center",
    },
    snackbar: {
      top: -50,
    },
    snackbarContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
    },
    snackbarText: {
      fontFamily: Fonts.black,
      marginRight: 10,
    },
  });
};
