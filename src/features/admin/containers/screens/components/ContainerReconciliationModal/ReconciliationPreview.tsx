import React from "react";
import { View, Text } from "react-native";
import { styles } from "./ContainerReconciliationModal.styles";

interface ReconciliationPreviewProps {
  estimatedCost: number;
  actualCost: number;
  reconciledProfit: number;
  profitGap: number;
}

export const ReconciliationPreview: React.FC<ReconciliationPreviewProps> = ({
  estimatedCost, actualCost, reconciledProfit, profitGap,
}) => (
  <View style={styles.previewBox}>
    <Text style={styles.previewTitle}>Prévisualisation</Text>
    <View style={styles.previewRow}>
      <Text style={styles.previewLabel}>Coût estimé (temps réel)</Text>
      <Text style={styles.previewValue}>{Math.round(estimatedCost).toLocaleString("fr-FR")} FCFA</Text>
    </View>
    <View style={styles.previewRow}>
      <Text style={styles.previewLabel}>Coût réel (agent)</Text>
      <Text style={styles.previewValue}>{Math.round(actualCost).toLocaleString("fr-FR")} FCFA</Text>
    </View>
    <View style={styles.divider} />
    <View style={styles.previewRow}>
      <Text style={styles.previewLabel}>Bénéfice réconcilié</Text>
      <Text style={[styles.previewValueBold, { color: reconciledProfit >= 0 ? "#10B981" : "#EF4444" }]}>
        {Math.round(reconciledProfit).toLocaleString("fr-FR")} FCFA
      </Text>
    </View>
    {profitGap !== 0 && (
      <View style={styles.previewRow}>
        <Text style={styles.previewLabel}>Écart</Text>
        <Text style={[styles.previewValue, { color: profitGap >= 0 ? "#10B981" : "#EF4444" }]}>
          {profitGap >= 0 ? "+" : ""}{Math.round(profitGap).toLocaleString("fr-FR")} FCFA
        </Text>
      </View>
    )}
  </View>
);
