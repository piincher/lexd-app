import { StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { SCREEN_WIDTH } from "@src/constants/Dimensions";

export const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: 15,
      backgroundColor: colors.background.default,
    },
    keyboardAvoidingView: {
      flex: 1,
      justifyContent: "center",
      width: "100%",
      alignItems: "center",
    },
    formContainer: {
      width: "100%",
    },
    containerStyle: {
      marginBottom: 20,
    },
    imageContainer: {
      width: 200,
      height: 200,
      borderStyle: "solid",
      borderWidth: 8,
      padding: 0,
      justifyContent: "center",
      borderRadius: 100,
      borderColor: colors.border,
      elevation: 10,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 100,
    },
    imagePicker: {
      backgroundColor: colors.text.secondary,
      padding: 8,
      borderRadius: 100,
      elevation: 20,
    },
    imageActionsRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 10,
      width: "100%",
    },
    thumbnailPressable: {
      alignContent: "center",
      marginHorizontal: SCREEN_WIDTH * 0.02,
    },
    shippingModeContainer: {
      width: "100%",
      marginVertical: 20,
      borderColor: colors.border,
      borderWidth: 1,
    },
    pickerStyle: {
      width: "100%",
      height: 50,
    },
    categoryPickerContainer: {
      borderColor: colors.border,
      borderWidth: 1,
    },
    dateButton: {
      marginVertical: 50,
    },
    dateText: {
      marginBottom: 50,
    },
    snackbar: {
      backgroundColor: colors.background.card,
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
