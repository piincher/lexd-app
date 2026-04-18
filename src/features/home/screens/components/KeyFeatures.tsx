import { FontAwesome6 } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from '@src/providers/ThemeProvider';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const FEATURES = [
   "Expedition rapide",
   "Suivi en temps réel",
   "Assurance complète",
   "Dedouanement inclus",
   "Service client 24/7",
];

export const KeyFeatures: React.FC = () => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.section}>
         <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Pourquoi ChinaLink Express?
         </Text>
         <View style={styles.featuresGrid}>
            {FEATURES.map((feature, index) => (
               <Animated.View
                  key={index}
                  style={[
                     styles.featureItem,
                     {
                        backgroundColor: colors.background.card,
                        shadowColor: colors.primary.dark,
                        borderColor: colors.border,
                     },
                  ]}
                  entering={FadeInDown.delay(index * 100).springify()}
               >
                  <FontAwesome6 name="check-circle" size={20} color="#1ED7B5" />
                  <Text style={[styles.featureText, { color: colors.text.primary }]}>
                     {feature}
                  </Text>
               </Animated.View>
            ))}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   section: {
      marginVertical: 24,
      paddingHorizontal: 16,
   },
   sectionTitle: {
      fontFamily: Fonts.bold,
      fontSize: 26,
      marginBottom: 24,
      textAlign: "center",
   },
   featuresGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      justifyContent: "center",
   },
   featureItem: {
      width: "45%",
      padding: 16,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      borderWidth: 1,
   },
   featureText: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      flexShrink: 1,
   },
});
