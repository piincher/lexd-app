import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useAppTheme } from "@src/providers";
import { Fonts } from "@src/constants/Fonts";

interface ShippingSolutionsProps {
   onPressAir: () => void;
   onPressSea: () => void;
}

export const ShippingSolutions: React.FC<ShippingSolutionsProps> = ({
   onPressAir,
   onPressSea,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.section}>
         <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Nos Solutions d&apos;Expédition
         </Text>
         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
         >
            <Animated.View entering={FadeInRight.delay(200)}>
               <Pressable onPress={onPressAir} style={styles.card}>
                  <LinearGradient
                     colors={["#4A90E2", "#1ED7B5"]}
                     style={styles.cardGradient}
                  >
                     <FontAwesome6 name="plane" size={48} color="white" />
                     <Text style={styles.cardTitle}>Fret Aérien</Text>
                     <Text style={styles.cardText}>
                        Livraison rapide en 2 à 3 semaines avec suivi en temps réel
                     </Text>
                  </LinearGradient>
               </Pressable>
            </Animated.View>

            <Animated.View entering={FadeInRight.delay(400)}>
               <Pressable onPress={onPressSea} style={styles.card}>
                  <LinearGradient
                     colors={["#1ED7B5", "#4A90E2"]}
                     style={styles.cardGradient}
                  >
                     <FontAwesome6 name="ship" size={48} color="white" />
                     <Text style={styles.cardTitle}>Sea Freight</Text>
                     <Text style={styles.cardText}>
                        Expédition économique en vrac (6 à 8 semaines)
                     </Text>
                  </LinearGradient>
               </Pressable>
            </Animated.View>
         </ScrollView>
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
   horizontalScroll: {
      paddingHorizontal: 16,
      gap: 16,
   },
   card: {
      width: 200,
      height: 280,
      borderRadius: 24,
      marginRight: 16,
      overflow: "hidden",
   },
   cardGradient: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
      alignItems: "center",
   },
   cardTitle: {
      fontFamily: Fonts.bold,
      fontSize: 24,
      color: "white",
      marginVertical: 12,
      textAlign: "center",
   },
   cardText: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: "rgba(255,255,255,0.9)",
      textAlign: "center",
      lineHeight: 22,
   },
});
