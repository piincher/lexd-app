import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "@src/constants/Dimensions";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
    imageContainer: {
      width: "100%",
      height: 200,
      borderStyle: "solid",
      borderWidth: 8,
      padding: 0,
      justifyContent: "center",
      borderColor: colors.border,
      elevation: 10,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imagePicker: {
      backgroundColor: colors.text.secondary,
      padding: 8,
      borderRadius: 100,
      elevation: 20,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 10,
      width: "100%",
    },
    thumbnailContainer: {
      alignContent: "center",
      marginHorizontal: SCREEN_WIDTH * 0.02,
    },
  });
};
