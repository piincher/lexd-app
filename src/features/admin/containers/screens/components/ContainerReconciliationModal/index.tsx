/**
 * ContainerReconciliationModal
 * Allows admin to input shipping agent's final CBM and reconcile profit
 */

import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';

interface ContainerReconciliationModalProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (agentCBM: number, agentUnitCost?: number) => void;
  isLoading?: boolean;
  containerNumber?: string;
  clientTotalCBM: number;
  clientTotalRevenue: number;
  currentAgentUnitCost: number;
}

export const ContainerReconciliationModal: React.FC<ContainerReconciliationModalProps> = ({
  visible,
  onDismiss,
  onConfirm,
  isLoading = false,
  containerNumber,
  clientTotalCBM,
  clientTotalRevenue,
  currentAgentUnitCost,
}) => {
  const [agentCBM, setAgentCBM] = useState('');
  const [agentUnitCost, setAgentUnitCost] = useState(currentAgentUnitCost.toString());
  const [error, setError] = useState('');

  const parsedCBM = parseFloat(agentCBM.replace(',', '.'));
  const parsedUnitCost = parseFloat(agentUnitCost.replace(',', '.'));

  const estimatedCost = clientTotalCBM * (parsedUnitCost || currentAgentUnitCost);
  const actualCost = !isNaN(parsedCBM) && parsedCBM > 0 ? parsedCBM * (parsedUnitCost || currentAgentUnitCost) : 0;
  const reconciledProfit = clientTotalRevenue - actualCost;
  const profitGap = reconciledProfit - (clientTotalRevenue - estimatedCost);

  const handleConfirm = useCallback(() => {
    setError('');
    if (isNaN(parsedCBM) || parsedCBM <= 0) {
      setError('Veuillez entrer un CBM valide supérieur à 0');
      return;
    }
    onConfirm(parsedCBM, !isNaN(parsedUnitCost) && parsedUnitCost > 0 ? parsedUnitCost : undefined);
  }, [parsedCBM, parsedUnitCost, onConfirm]);

  const handleDismiss = useCallback(() => {
    setAgentCBM('');
    setAgentUnitCost(currentAgentUnitCost.toString());
    setError('');
    onDismiss();
  }, [onDismiss, currentAgentUnitCost]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleDismiss}>
      <Animated.View entering={FadeIn} style={styles.overlay}>
        <Animated.View entering={SlideInUp} style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Réconciliation CBM</Text>
              {containerNumber && (
                <Text style={styles.subtitle}>Container {containerNumber}</Text>
              )}
            </View>
            <TouchableOpacity onPress={handleDismiss} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Context */}
          <View style={styles.contextBox}>
            <Text style={styles.contextText}>
              CBM client facturé: <Text style={styles.contextBold}>{clientTotalCBM.toFixed(2)} m³</Text>
            </Text>
            <Text style={styles.contextText}>
              Revenu client total: <Text style={styles.contextBold}>{clientTotalRevenue.toLocaleString('fr-FR')} FCFA</Text>
            </Text>
          </View>

          {/* Input: Agent CBM */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CBM final de l'agent *</Text>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder="Ex: 12.5"
              keyboardType="decimal-pad"
              value={agentCBM}
              onChangeText={setAgentCBM}
              editable={!isLoading}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* Input: Agent Unit Cost */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Coût par CBM (FCFA)</Text>
            <TextInput
              style={styles.input}
              placeholder={`${currentAgentUnitCost}`}
              keyboardType="number-pad"
              value={agentUnitCost}
              onChangeText={setAgentUnitCost}
              editable={!isLoading}
            />
          </View>

          {/* Preview */}
          {parsedCBM > 0 && (
            <View style={styles.previewBox}>
              <Text style={styles.previewTitle}>Prévisualisation</Text>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Coût estimé (temps réel)</Text>
                <Text style={styles.previewValue}>{Math.round(estimatedCost).toLocaleString('fr-FR')} FCFA</Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Coût réel (agent)</Text>
                <Text style={styles.previewValue}>{Math.round(actualCost).toLocaleString('fr-FR')} FCFA</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Bénéfice réconcilié</Text>
                <Text style={[styles.previewValueBold, { color: reconciledProfit >= 0 ? '#10B981' : '#EF4444' }]}>
                  {Math.round(reconciledProfit).toLocaleString('fr-FR')} FCFA
                </Text>
              </View>
              {profitGap !== 0 && (
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Écart</Text>
                  <Text style={[styles.previewValue, { color: profitGap >= 0 ? '#10B981' : '#EF4444' }]}>
                    {profitGap >= 0 ? '+' : ''}{Math.round(profitGap).toLocaleString('fr-FR')} FCFA
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            <Button mode="outlined" onPress={handleDismiss} style={styles.cancelBtn} disabled={isLoading}>
              Annuler
            </Button>
            <Button
              mode="contained"
              onPress={handleConfirm}
              style={styles.confirmBtn}
              loading={isLoading}
              disabled={isLoading || parsedCBM <= 0}
            >
              Confirmer la réconciliation
            </Button>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Theme.colors.background.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextBox: {
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 4,
  },
  contextText: {
    fontSize: 13,
    color: '#4B5563',
  },
  contextBold: {
    fontWeight: '700',
    color: '#1F2937',
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
    backgroundColor: Theme.colors.background.elevated,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  previewBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E40AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  previewLabel: {
    fontSize: 13,
    color: '#4B5563',
  },
  previewValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  previewValueBold: {
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#BFDBFE',
    marginVertical: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    borderRadius: 10,
  },
  confirmBtn: {
    flex: 2,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
  },
});

export default ContainerReconciliationModal;
