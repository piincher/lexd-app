import { FontAwesome6 } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WORKFLOW_STEPS = [
   {
      icon: "headset",
      title: "1. Contactez & Choisissez la Méthode",
      description:
         "Contactez-nous et choisissez votre méthode d'expédition préférée",
   },
   {
      icon: "map-location-dot",
      title: "2. Recevez l'adresse de l'entrepôt",
      description:
         "Nous fournissons notre adresse d'entrepôt chinois pour la consolidation des colis",
   },
   {
      icon: "box-archive",
      title: "3. Arrivée des colis",
      description:
         "Nous vous informons de l'arrivée de tous les articles à notre dépôt",
   },
   {
      icon: "earth-africa",
      title: "4. Expédition vers le Mali",
      description:
         "Nous nous occupons du dédouanement et du transport vers le Mali",
   },
   {
      icon: "hand-holding-hand",
      title: "5. Collecte du colis",
      description:
         "Récupérez votre envoi dans notre centre de distribution au Mali",
   },
];

export const WorkflowSteps: React.FC = () => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.section}>
         <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Comment ça marche ?
         </Text>
         <View style={styles.workflowContainer}>
            {WORKFLOW_STEPS.map((step, index) => (
               <View
                  key={index}
                  style={[
                     styles.workflowStep,
                     {
                        backgroundColor: colors.background.card,
                        shadowColor: colors.primary.dark,
                        borderColor: colors.border,
                     },
                  ]}
               >
                  <View
                     style={[styles.workflowIcon, { backgroundColor: colors.primary.main }]}
                  >
                     <FontAwesome6 name={step.icon} size={24} color="white" />
                  </View>
                  <View style={styles.workflowText}>
                     <Text
                        style={[styles.workflowStepTitle, { color: colors.text.primary }]}
                     >
                        {step.title}
                     </Text>
                     <Text
                        style={[
                           styles.workflowStepDescription,
                           { color: colors.text.secondary },
                        ]}
                     >
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
      marginVertical: 24,
      paddingHorizontal: 16,
   },
   sectionTitle: {
      fontFamily: Fonts.bold,
      fontSize: 26,
      marginBottom: 24,
      textAlign: "center",
   },
   workflowContainer: {
      gap: 16,
   },
   workflowStep: {
      borderRadius: 12,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      borderWidth: 1,
   },
   workflowIcon: {
      borderRadius: 8,
      padding: 12,
      marginRight: 16,
   },
   workflowText: {
      flex: 1,
   },
   workflowStepTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      marginBottom: 4,
   },
   workflowStepDescription: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      lineHeight: 20,
   },
});
