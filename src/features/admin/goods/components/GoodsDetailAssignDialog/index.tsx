import React from 'react';
import { AssignContainerDialog } from '../../screens/GoodsDetailScreen/components/AssignContainerDialog';
import { AssignAirwayBillDialog } from '../../screens/GoodsDetailScreen/components/AssignAirwayBillDialog';

interface GoodsDetailAssignDialogProps {
  isAirShipping: boolean;
  visible: boolean;
  containers: any[];
  selectedContainerId: string | null;
  airwayBills: any[];
  selectedAirwayBillId: string | null;
  isAssigning: boolean;
  isCorrection?: boolean;
  onToggleCorrection?: () => void;
  onSelectContainer: (id: string) => void;
  onSelectAirwayBill: (id: string) => void;
  onDismiss: () => void;
  onAssignContainer: () => void;
  onAssignAirwayBill: () => void;
}

export const GoodsDetailAssignDialog: React.FC<GoodsDetailAssignDialogProps> = ({
  isAirShipping,
  visible,
  containers,
  selectedContainerId,
  airwayBills,
  selectedAirwayBillId,
  isAssigning,
  isCorrection,
  onToggleCorrection,
  onSelectContainer,
  onSelectAirwayBill,
  onDismiss,
  onAssignContainer,
  onAssignAirwayBill,
}) => {
  if (isAirShipping) {
    return (
      <AssignAirwayBillDialog
        visible={visible}
        airwayBills={airwayBills}
        selectedAirwayBillId={selectedAirwayBillId}
        isAssigning={isAssigning}
        onSelect={onSelectAirwayBill}
        onDismiss={onDismiss}
        onConfirm={onAssignAirwayBill}
      />
    );
  }

  return (
    <AssignContainerDialog
      visible={visible}
      containers={containers}
      selectedContainerId={selectedContainerId}
      isAssigning={isAssigning}
      isCorrection={isCorrection}
      onToggleCorrection={onToggleCorrection}
      onSelect={onSelectContainer}
      onDismiss={onDismiss}
      onConfirm={onAssignContainer}
    />
  );
};
