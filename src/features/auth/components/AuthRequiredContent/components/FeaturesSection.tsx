import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from '@src/providers/ThemeProvider';

interface FeatureItemProps {
   icon: string;
   text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.featureItem}>
         <Text style={styles.featureIcon}>{icon}</Text>
         <Text style={[styles.featureText, { color: colors.text.secondary }]}>{text}</Text>
      </View>
   );
};

export const FeaturesSection: React.FC = () => {
   return (
      <Animated.View
         entering={FadeInUp.duration(600).delay(400).springify()}
         style={styles.featuresContainer}
      >
         <FeatureItem icon="📦" text="Suivi de marchandises" />
         <FeatureItem icon="🚢" text="Containers en temps réel" />
         <FeatureItem icon="🔔" text="Notifications instantanées" />
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   featuresContainer: {
      width: "100%",
      marginBottom: 40,
      gap: 12,
   },
   featureItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
   },
   featureIcon: {
      fontSize: 18,
   },
   featureText: {
      fontFamily: Fonts.medium,
      fontSize: 14,
   },
});

export default FeaturesSection;
