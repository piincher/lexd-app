import React from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import AppButton from "@src/components/AppButton/AppButton";

interface LoginSectionProps {
   onPress: () => void;
}

export const LoginSection: React.FC<LoginSectionProps> = ({ onPress }) => {
   return (
      <Animated.View
         entering={FadeInUp.duration(600).delay(600).springify()}
         style={styles.buttonContainer}
      >
         <AppButton title="Se connecter" onPress={onPress} style={styles.loginButton} />
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   buttonContainer: {
      width: "100%",
      marginBottom: 24,
   },
   loginButton: {
      width: "100%",
      maxWidth: 320,
   },
});

export default LoginSection;
