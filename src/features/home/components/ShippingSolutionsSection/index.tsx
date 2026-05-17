import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

interface ShippingSolutionsSectionProps {
   onPressAir: () => void;
   onPressSea: () => void;
   colors: any;
}

export const ShippingSolutionsSection: React.FC<ShippingSolutionsSectionProps> = ({
   onPressAir,
   onPressSea,
   colors,
}) => {
   return (
      <View style={styles.section}>
         <Text style={[styles.sectionTitle, { color: colors.text?.primary ?? colors.text }]}>
            Nos Solutions d'Expédition
         </Text>
         <View style={styles.cardsRow}>
            <Pressable
               onPress={onPressAir}
               style={({ pressed }) => [styles.card, { opacity: pressed ? 0.9 : 1 }]}
            >
               <LinearGradient
                  colors={[Theme.gradients.ocean[2], Theme.gradients.ocean[0]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
               >
                  <View style={styles.iconCircle}>
                     <FontAwesome6 name="plane" size={24} color={Theme.colors.status.info} />
                  </View>
                  <Text style={styles.cardTitle}>Fret Aérien</Text>
                  <Text style={styles.cardText}>2 à 3 semaines</Text>
                  <Text style={styles.cardSubtext}>Suivi en temps réel</Text>
               </LinearGradient>
            </Pressable>

            <Pressable
               onPress={onPressSea}
               style={({ pressed }) => [styles.card, { opacity: pressed ? 0.9 : 1 }]}
            >
               <LinearGradient
                  colors={[Theme.gradients.ocean[0], Theme.gradients.ocean[2]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
               >
                  <View style={styles.iconCircle}>
                     <FontAwesome6 name="ship" size={24} color={Theme.colors.accent.mint} />
                  </View>
                  <Text style={styles.cardTitle}>Fret Maritime</Text>
                  <Text style={styles.cardText}>6 à 8 semaines</Text>
                  <Text style={styles.cardSubtext}>Expédition économique</Text>
               </LinearGradient>
            </Pressable>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   section: {
      marginTop: 24,
      paddingHorizontal: 16,
   },
   sectionTitle: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      marginBottom: 14,
   },
   cardsRow: {
      flexDirection: "row",
      gap: 12,
   },
   card: {
      flex: 1,
      borderRadius: 20,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
   },
   cardGradient: {
      padding: 20,
      alignItems: "flex-start",
      minHeight: 170,
      justifyContent: "space-between",
   },
   iconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: Theme.colors.background.card,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
   },
   cardTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: Theme.neutral.white,
   },
   cardText: {
      fontSize: 15,
      fontFamily: Fonts.meduim,
      color: `${Theme.neutral.white}F2`,
      marginTop: 4,
   },
   cardSubtext: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: `${Theme.neutral.white}CC`,
      marginTop: 2,
   },
});

export default ShippingSolutionsSection;
