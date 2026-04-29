import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from '@src/providers/ThemeProvider';

import BackgroundDecoration from "./components/BackgroundDecoration";
import LogoSection from "./components/LogoSection";
import TextSection from "./components/TextSection";
import FeaturesSection from "./components/FeaturesSection";
import LoginSection from "./components/LoginSection";
import TermsSection from "./components/TermsSection";
import FooterSection from "./components/FooterSection";

interface AuthRequiredContentProps {
   onLoginPress?: () => void;
}

export const AuthRequiredContent: React.FC<AuthRequiredContentProps> = ({ onLoginPress }) => {
   const navigation = useNavigation();
   const { colors } = useAppTheme();

   const handleLogin = useCallback(() => {
      if (onLoginPress) {
         onLoginPress();
      } else {
         navigation.navigate("Login" as never);
      }
   }, [onLoginPress, navigation]);

   return (
      <View style={[styles.container, { backgroundColor: colors.background.default }]}>
         <BackgroundDecoration />
         <View style={styles.content}>
            <LogoSection />
            <TextSection />
            <FeaturesSection />
            <LoginSection onPress={handleLogin} />
            <TermsSection />
         </View>
         <FooterSection />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      position: "relative",
   },
   content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 20,
      justifyContent: "center",
      alignItems: "center",
   },
});

export default AuthRequiredContent;
