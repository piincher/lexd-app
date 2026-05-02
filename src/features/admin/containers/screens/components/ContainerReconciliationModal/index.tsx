import React, { useState, useCallback } from "react";
import { Modal } from "react-native";
import { ReconciliationSheet } from "./ReconciliationSheet";

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
  visible, onDismiss, onConfirm, isLoading = false, containerNumber, clientTotalCBM, clientTotalRevenue, currentAgentUnitCost,
}) => {
  const [agentCBM, setAgentCBM] = useState("");
  const [agentUnitCost, setAgentUnitCost] = useState(currentAgentUnitCost.toString());
  const [error, setError] = useState("");

  const parsedCBM = parseFloat(agentCBM.replace(",", "."));
  const parsedUnitCost = parseFloat(agentUnitCost.replace(",", "."));
  const unitCost = parsedUnitCost || currentAgentUnitCost;

  const estimatedCost = clientTotalCBM * unitCost;
  const actualCost = !isNaN(parsedCBM) && parsedCBM > 0 ? parsedCBM * unitCost : 0;
  const reconciledProfit = clientTotalRevenue - actualCost;
  const profitGap = reconciledProfit - (clientTotalRevenue - estimatedCost);

  const handleConfirm = useCallback(() => {
    setError("");
    if (isNaN(parsedCBM) || parsedCBM <= 0) {
      setError("Veuillez entrer un CBM valide supérieur à 0");
      return;
    }
    onConfirm(parsedCBM, !isNaN(parsedUnitCost) && parsedUnitCost > 0 ? parsedUnitCost : undefined);
  }, [parsedCBM, parsedUnitCost, onConfirm]);

  const handleDismiss = useCallback(() => {
    setAgentCBM("");
    setAgentUnitCost(currentAgentUnitCost.toString());
    setError("");
    onDismiss();
  }, [onDismiss, currentAgentUnitCost]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleDismiss}>
      <ReconciliationSheet
        containerNumber={containerNumber}
        clientTotalCBM={clientTotalCBM}
        clientTotalRevenue={clientTotalRevenue}
        agentCBM={agentCBM}
        agentUnitCost={agentUnitCost}
        error={error}
        isLoading={isLoading}
        parsedCBM={parsedCBM}
        estimatedCost={estimatedCost}
        actualCost={actualCost}
        reconciledProfit={reconciledProfit}
        profitGap={profitGap}
        currentAgentUnitCost={currentAgentUnitCost}
        onAgentCBMChange={setAgentCBM}
        onAgentUnitCostChange={setAgentUnitCost}
        onConfirm={handleConfirm}
        onDismiss={handleDismiss}
      />
    </Modal>
  );
};

export default ContainerReconciliationModal;
