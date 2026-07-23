import React from 'react';
import { PackageAssignmentScannerModal } from '@src/entities/goodsPackage';
import type { ShippingMode } from '../../types';

interface Props { visible: boolean; containerId: string; containerLabel?: string; shippingMode?: ShippingMode; onDismiss: () => void }

export const ScanToAssignModal: React.FC<Props> = ({ visible, containerId, containerLabel, shippingMode, onDismiss }) => (
  <PackageAssignmentScannerModal
    visible={visible}
    targetType="SEA_CONTAINER"
    targetId={containerId}
    targetLabel={shippingMode === 'AIR' ? 'Conteneur aérien non pris en charge' : `Conteneur ${containerLabel || ''}`.trim()}
    onDismiss={onDismiss}
  />
);

export default ScanToAssignModal;
