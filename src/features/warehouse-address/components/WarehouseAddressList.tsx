import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import type { WarehouseAddress, WarehouseMode } from '../types';
import { useSupplierSheetShare } from '../hooks/useSupplierSheetShare';
import { useSupplierIdentity } from '../hooks/useSupplierIdentity';
import { SupplierSheetImage } from './SupplierSheetImage';
import { WarehouseAddressCard } from './WarehouseAddressCard';

interface Props {
  addresses: WarehouseAddress[];
}

export const WarehouseAddressList: React.FC<Props> = ({ addresses }) => {
  const sheetRefs = useRef<Partial<Record<WarehouseMode, View>>>({});
  const identity = useSupplierIdentity();
  const captureLocalSheet = useCallback(async (mode: WarehouseMode) => {
    const sheet = sheetRefs.current[mode];
    if (!sheet) throw new Error("L'image fournisseur n'est pas encore prête. Réessayez.");
    return captureRef(sheet, { format: 'png', quality: 1, result: 'tmpfile' });
  }, []);
  const { share, save, sharingMode, savingMode } = useSupplierSheetShare(captureLocalSheet);

  return (
    <>
      {addresses.map((address) => (
        <WarehouseAddressCard
          key={address.mode}
          address={address}
          onShareSheet={share}
          onSaveSheet={save}
          isSharing={sharingMode === address.mode}
          isSaving={savingMode === address.mode}
        />
      ))}
      <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.captureStage}>
        {addresses.map((address) => (
          <SupplierSheetImage
            key={`capture-${address.mode}`}
            ref={(node) => {
              if (node) sheetRefs.current[address.mode] = node;
            }}
            address={address}
            identity={identity}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  captureStage: { position: 'absolute', left: -10000, top: 0, width: 360, gap: 16 },
});
