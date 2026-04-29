import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Text } from "react-native-paper";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from '@src/providers/ThemeProvider';

export const TextSection: React.FC = () => {
   const { colors } = useAppTheme();

   return (
      <Animated.View
         entering={FadeInUp.duration(600).delay(200).springify()}
         style={styles.textContainer}
      >
         <Title style={[styles.title, { color: colors.text.primary }]}>
            Connectez-vous pour continuer
         </Title>
         <Text variant="bodyMedium" style={[styles.subtitle, { color: colors.text.secondary }]}>
            Accédez à toutes vos commandes, suivez vos marchandises et restez informé en temps
            réel.
         </Text>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   textContainer: {
      alignItems: "center",
      marginBottom: 32,
   },
   title: {
      fontFamily: Fonts.bold,
      fontSize: 28,
      textAlign: "center",
      marginBottom: 12,
      lineHeight: 36,
   },
   subtitle: {
      fontFamily: Fonts.regular,
      fontSize: 16,
      textAlign: "center",
      lineHeight: 24,
      paddingHorizontal: 20,
   },
});

export default TextSection;
