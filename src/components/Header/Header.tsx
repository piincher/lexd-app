import { Text, View, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { navigationProps, RootStackParamList } from "@src/navigations/type";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
   title: string;
   rightIcon?: React.ReactNode;
   navigation: navigationProps;
   rightIconHandler?: () => void;
   rightIconAccessibilityLabel?: string;
   style?: StyleProp<ViewStyle>;
}

export const Header = ({
   title,
   rightIcon,
   navigation,
   rightIconHandler,
   rightIconAccessibilityLabel = "Action",
   style,
}: HeaderProps) => {
   return (
      <SafeAreaView edges={["top"]} style={[styles.safeArea, style]}>
         <View style={styles.container}>
            <Pressable
               onPress={() => navigation.goBack()}
               style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
               accessibilityRole="button"
               accessibilityLabel="Retour"
            >
               <MaterialIcons name="arrow-back" size={28} color={COLORS.blue} />
            </Pressable>

            <Text style={styles.title}>{title}</Text>

            {rightIcon && (
               <Pressable
                  onPress={rightIconHandler}
                  style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityLabel={rightIconAccessibilityLabel}
               >
                  {rightIcon}
               </Pressable>
            )}
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   safeArea: {
      flex: 0,
      backgroundColor: COLORS.white,
   },
   container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
   },
   backButton: {
      padding: 8,
   },
   iconButton: {
      padding: 8,
   },
   pressed: {
      opacity: 0.7,
   },
   title: {
      flex: 1,
      textAlign: "center",
      color: COLORS.DarkGrey,
      fontSize: 20,
      fontFamily: Fonts.bold,
      fontWeight: "700",
   },
});
