import React, { useCallback } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Title, Paragraph, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

import { COLORS } from "@src/constants/Colors";
import { IMAGES } from "@src/constants/Images";
import { Fonts } from "@src/constants/Fonts";
import CircleUI from "@src/components/CircleUI/CircleUi";
import AppButton from "@src/components/AppButton/AppButton";

interface AuthRequiredScreenProps {
   onLoginPress?: () => void;
}

export const AuthRequiredScreen: React.FC<AuthRequiredScreenProps> = ({
   onLoginPress,
}) => {
   const navigation = useNavigation();

   const handleLogin = useCallback(() => {
      if (onLoginPress) {
         onLoginPress();
      } else {
         navigation.navigate("Login" as never);
      }
   }, [onLoginPress, navigation]);

   const openURL = useCallback((url: string) => {
      WebBrowser.openBrowserAsync(url);
   }, []);

   return (
      <View style={styles.container}>
         <CircleUI size={200} position="top-left" />
         <CircleUI size={100} position="top-right" />
         <CircleUI size={200} position="bottom-right" />
         <CircleUI size={100} position="bottom-left" />

         <Image source={IMAGES.logo} style={styles.logo} />

         <Title style={styles.title}>Connectez vous pour continuer</Title>

         <Paragraph style={styles.paragraph}>
            Pour utiliser l'application, vous devez vous connecter
         </Paragraph>

         <AppButton title="Login" onPress={handleLogin} />

         <View style={styles.footer}>
            <Paragraph style={styles.footerText}>
               En vous connectant à l'application, vous acceptez nos{" "}
               <Text style={styles.link}>conditions d'utilisation</Text> et notre{" "}
               <Text
                  style={styles.link}
                  onPress={() =>
                     openURL(
                        "https://www.freeprivacypolicy.com/live/0bd3fa39-d9c1-41d0-8073-5800d4d7c40d"
                     )
                  }
               >
                  politique de confidentialité
               </Text>
               .
            </Paragraph>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      padding: 16,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.white,
   },
   logo: {
      height: 150,
      width: 150,
      marginBottom: 16,
   },
   title: {
      marginBottom: 50,
      fontFamily: Fonts.bold,
      fontSize: 24,
   },
   paragraph: {
      marginBottom: 30,
      textAlign: "center",
      fontSize: 16,
      fontFamily: Fonts.regular,
   },
   footer: {
      marginTop: 20,
   },
   footerText: {
      fontSize: 12,
      textAlign: "center",
   },
   link: {
      color: COLORS.blue,
   },
});

export default AuthRequiredScreen;
