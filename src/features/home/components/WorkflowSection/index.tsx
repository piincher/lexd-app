import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";

interface WorkflowSectionProps {
  colors: any;
}

const workflowSteps = [
  {
    icon: "headset" as const,
    title: "1. Contactez & Choisissez la Méthode",
    description:
      "Contactez-nous et choisissez votre méthode d'expédition préférée",
  },
  {
    icon: "map-location-dot" as const,
    title: "2. Recevez l'adresse de l'entrepôt",
    description:
      "Nous fournissons notre adresse d'entrepôt chinois pour la consolidation des colis",
  },
  {
    icon: "box-archive" as const,
    title: "3. Arrivée des colis",
    description:
      "Nous vous informons de l'arrivée de tous les articles à notre dépôt",
  },
  {
    icon: "earth-africa" as const,
    title: "4. Expédition vers le Mali",
    description:
      "Nous nous occupons du dédouanement et du transport vers le Mali",
  },
  {
    icon: "hand-holding-hand" as const,
    title: "5. Collecte du colis",
    description:
      "Récupérez votre envoi dans notre centre de distribution au Mali",
  },
];

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ colors }) => {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Comment ça marche ?
      </Text>
      <View style={styles.workflowContainer}>
        {workflowSteps.map((step, index) => (
          <View key={index} style={styles.workflowStep}>
            <View style={[styles.workflowIcon, { backgroundColor: colors.primary }]}>
              <FontAwesome6 name={step.icon} size={24} color="white" />
            </View>
            <View style={styles.workflowText}>
              <Text style={[styles.workflowStepTitle, { color: colors.text }]}>
                {step.title}
              </Text>
              <Text
                style={[
                  styles.workflowStepDescription,
                  { color: colors.textSecondary || colors.text + "99" },
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
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    marginBottom: 16,
  },
  workflowContainer: {
    gap: 16,
  },
  workflowStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  workflowIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  workflowText: {
    flex: 1,
  },
  workflowStepTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    marginBottom: 4,
  },
  workflowStepDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    lineHeight: 20,
  },
});
