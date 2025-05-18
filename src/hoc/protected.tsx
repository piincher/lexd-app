import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet } from "react-native";
import { Button, Title, Paragraph, Snackbar, Text } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";
import { IMAGES } from "@src/constants/Images";
import { Fonts } from "@src/constants/Fonts";
import CircleUI from "@src/components/CircleUI/CircleUi";
import AppButton from "@src/components/AppButton/AppButton";
import { useAuth } from "@src/store/Auth";
import * as WebBrowser from "expo-web-browser";

export const useAuthCheck = () => {
   const { token } = useAuth((state) => state);
   const isAuthenticated = !!token;

   return { isAuthenticated, token };
};
const withProtectedRoute = (Component: React.ComponentType<any>) => (props: any) => {
   const { isAuthenticated } = useAuthCheck();
   const [visible, setVisible] = React.useState(false);
   const navigation = useNavigation();

   const openURL = (url: string) => {
      WebBrowser.openBrowserAsync(url);
   };

   useEffect(() => {
      if (!isAuthenticated) {
         setVisible(true);
         setTimeout(() => setVisible(false), 3000);
      }
   }, [isAuthenticated, navigation]);

   if (!isAuthenticated) {
      return (
         <View style={styles.container}>
            <CircleUI size={200} position="top-left" />
            <CircleUI size={100} position="top-right" />
            <CircleUI size={200} position="bottom-right" />
            <CircleUI size={100} position="bottom-left" />
            <Snackbar
               visible={visible}
               onDismiss={() => setVisible(false)}
               style={{
                  backgroundColor: "#FFF",
               }}
               duration={3000}
            >
               <Text style={styles.snackBarText}>Connectez vous pour continuer</Text>
            </Snackbar>
            <Image
               source={IMAGES.logo} // Replace with your logo URL
               style={styles.logo}
            />
            <Title style={styles.title}>Connectez vous pour continuer</Title>
            <Paragraph style={styles.paragraph}>
               Pour utiliser l'application, vous devez vous connecter
            </Paragraph>
            <AppButton title="Login" onPress={() => navigation.navigate("Login")} />

            {/* by login into the app you agreed on our term and privacy policy  */}
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
   }

   return <Component {...props} />;
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
   button: {
      borderRadius: 0,
      width: "50%",
      backgroundColor: COLORS.blue,
      fontFamily: Fonts.bold,
   },
   snackBarText: {
      fontFamily: Fonts.bold,
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

export default withProtectedRoute;
