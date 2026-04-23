import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

interface WorkflowSectionProps {
   colors: any;
}

const STEP_COLORS = ["#4A90E2", "#1ED7B5", "#F59E0B", "#8B5CF6", "#22C55E"];

const WORKFLOW_STEPS = [
   {
      icon: "headset" as const,
      title: "1. Contactez-nous",
      description: "Choisissez votre méthode d'expédition préférée",
   },
   {
      icon: "map-location-dot" as const,
      title: "2. Adresse entrepôt",
      description: "Recevez notre adresse d'entrepôt chinois pour la consolidation",
   },
   {
      icon: "box-archive" as const,
      title: "3. Arrivée des colis",
      description: "Nous vous informons de l'arrivée de vos articles à notre dépôt",
   },
   {
      icon: "earth-africa" as const,
      title: "4. Expédition",
      description: "Dédouanement et transport vers le Mali",
   },
   {
      icon: "hand-holding-hand" as const,
      title: "5. Collecte",
      description: "Récupérez votre envoi dans notre centre de distribution",
   },
];

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ colors }) => {
   const textColor = colors.text?.primary ?? colors.text;
   const textSecondary = colors.text?.secondary ?? (colors.textSecondary || Theme.colors.text.secondary);
   const cardBg = colors.background?.card ?? Theme.colors.background.card;

   return (
      <View style={styles.section}>
         <Text style={[styles.sectionTitle, { color: textColor }]}>
            Comment ça marche ?
         </Text>
         <View style={styles.stepsContainer}>
            {WORKFLOW_STEPS.map((step, index) => (
               <View key={index} style={[styles.step, { backgroundColor: cardBg }]}>
                  <View style={[styles.stepIcon, { backgroundColor: STEP_COLORS[index] + "15" }]}>
                     <FontAwesome6 name={step.icon} size={20} color={STEP_COLORS[index]} />
                  </View>
                  <View style={styles.stepContent}>
                     <Text style={[styles.stepTitle, { color: textColor }]}>
                        {step.title}
                     </Text>
                     <Text style={[styles.stepDescription, { color: textSecondary }]}>
                        {step.description}
                     </Text>
                  </View>
               </View>
            ))}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   section: {
      marginVertical: 20,
      paddingHorizontal: 16,
   },
   sectionTitle: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      marginBottom: 16,
   },
   stepsContainer: {
      gap: 10,
   },
   step: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      padding: 16,
      borderRadius: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
   },
   stepIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
   },
   stepContent: {
      flex: 1,
   },
   stepTitle: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      marginBottom: 2,
   },
   stepDescription: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      lineHeight: 18,
   },
});
