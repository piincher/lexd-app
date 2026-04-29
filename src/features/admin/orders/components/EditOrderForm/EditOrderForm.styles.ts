import { StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
    formContainer: { width: "100%" },
    containerStyle: {
      marginBottom: 20,
    },
    shippingModeContainer: {
      width: "100%",
      marginVertical: 20,
      borderColor: colors.border,
      borderWidth: 1,
    },
    pickerStyle: { width: "100%", height: 50 },
    dateButton: { marginVertical: 50 },
    dateText: { marginBottom: 50 },
  });
};
