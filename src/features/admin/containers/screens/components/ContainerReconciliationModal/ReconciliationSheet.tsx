import React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Text, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
import { createStyles } from "./ContainerReconciliationModal.styles";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { ReconciliationPreview } from "./ReconciliationPreview";

interface ReconciliationSheetProps {
  visible: boolean;
  containerNumber?: string;
  clientTotalCBM: number;
  clientTotalRevenue: number;
  agentCBM: string;
  agentUnitCost: string;
  error: string;
  isLoading: boolean;
  parsedCBM: number;
  estimatedCost: number;
  actualCost: number;
  reconciledProfit: number;
  profitGap: number;
  currentAgentUnitCost: number;
  onAgentCBMChange: (v: string) => void;
  onAgentUnitCostChange: (v: string) => void;
  onConfirm: () => void;
  onDismiss: () => void;
}

export const ReconciliationSheet: React.FC<ReconciliationSheetProps> = ({
  containerNumber, clientTotalCBM, clientTotalRevenue,
  agentCBM, agentUnitCost, error, isLoading, parsedCBM,
  estimatedCost, actualCost, reconciledProfit, profitGap,
  currentAgentUnitCost, onAgentCBMChange, onAgentUnitCostChange,
  onConfirm, onDismiss,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
  <Animated.View entering={FadeIn} style={styles.overlay}>
    <Animated.View entering={SlideInUp} style={styles.sheet}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Réconciliation CBM</Text>
          {containerNumber && <Text style={styles.subtitle}>Container {containerNumber}</Text>}
        </View>
        <TouchableOpacity onPress={onDismiss} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color={Theme.colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.contextBox}>
        <Text style={styles.contextText}>
          CBM client facturé: <Text style={styles.contextBold}>{(clientTotalCBM ?? 0).toFixed(2)} m³</Text>
        </Text>
        <Text style={styles.contextText}>
          Revenu client total: <Text style={styles.contextBold}>{(clientTotalRevenue ?? 0).toLocaleString("fr-FR")} FCFA</Text>
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>CBM final de l&apos;agent *</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Ex: 12.5"
          keyboardType="decimal-pad"
          value={agentCBM}
          onChangeText={onAgentCBMChange}
          editable={!isLoading}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Coût par CBM (FCFA)</Text>
        <TextInput
          style={styles.input}
          placeholder={`${currentAgentUnitCost}`}
          keyboardType="number-pad"
          value={agentUnitCost}
          onChangeText={onAgentUnitCostChange}
          editable={!isLoading}
        />
      </View>

      {parsedCBM > 0 && (
        <ReconciliationPreview
          estimatedCost={estimatedCost}
          actualCost={actualCost}
          reconciledProfit={reconciledProfit}
          profitGap={profitGap}
        />
      )}

      <View style={styles.actions}>
        <Button mode="outlined" onPress={onDismiss} style={styles.cancelBtn} disabled={isLoading}>
          Annuler
        </Button>
        <Button mode="contained" onPress={onConfirm} style={styles.confirmBtn} loading={isLoading} disabled={isLoading || parsedCBM <= 0}>
          Confirmer la réconciliation
        </Button>
      </View>
    </Animated.View>
  </Animated.View>
  );
};
