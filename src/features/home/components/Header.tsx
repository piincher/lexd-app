import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { IMAGES } from "@src/constants/Images";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers";

export const Header = () => {
   const navigation = useNavigation();
   const { colors } = useAppTheme();

   return (
      <View
         style={[
            styles.container,
            {
               backgroundColor: colors.background.default,
               borderBottomColor: colors.border,
            },
         ]}
      >
         <Image source={IMAGES.flat_logo} style={styles.logo} resizeMode="contain" />
         <View style={styles.actions}>
            <Pressable
               onPress={() => navigation.navigate("faq" as never)}
               style={({ pressed }) => [
                  styles.iconButton,
                  { opacity: pressed ? 0.7 : 1 },
               ]}
               hitSlop={8}
               accessibilityRole="button"
               accessibilityLabel="FAQ"
            >
               <FontAwesome6 name="question" size={18} color={colors.primary.main} />
            </Pressable>
            <Pressable
               onPress={() => navigation.navigate("AboutUs" as never)}
               style={({ pressed }) => [
                  styles.iconButton,
                  { opacity: pressed ? 0.7 : 1 },
               ]}
               hitSlop={8}
               accessibilityRole="button"
               accessibilityLabel="À propos"
            >
               <FontAwesome6 name="info" size={18} color={colors.primary.main} />
            </Pressable>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
   },
   logo: {
      width: 140,
      height: 40,
   },
   actions: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
   },
   iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(34,197,94,0.1)",
      justifyContent: "center",
      alignItems: "center",
   },
});
