import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useStyles } from "./AddOrder.styles";

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export const AddOrderSnackbar: React.FC<Props> = ({ visible, onDismiss }) => {
  const styles = useStyles();
  const { colors } = useAppTheme();
  return (
    <Snackbar visible={visible} onDismiss={onDismiss} style={styles.snackbar} duration={3000}>
      <View style={styles.snackbarContent}>
        <Text style={styles.snackbarText}>Woah Product is Added !</Text>
        <AntDesign name="check" size={24} color={colors.status.success} />
      </View>
    </Snackbar>
  );
};
