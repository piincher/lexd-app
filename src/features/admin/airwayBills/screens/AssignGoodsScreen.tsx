/**
 * AssignGoodsScreen - Assign air goods to an airway bill or cargo bag
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BagSelector } from './components/BagSelector';
import { CargoBagCreateDialog } from './components/CargoBagCreateDialog';
import { AssignGoodsHeader } from '../components/AssignGoodsHeader';
import { AssignGoodsSummary } from '../components/AssignGoodsSummary';
import { AssignGoodsList } from '../components/AssignGoodsList';
import { AssignGoodsFooter } from '../components/AssignGoodsFooter';
import { AssignGoodsLoading } from '../components/AssignGoodsLoading';
import { useAssignGoodsScreen } from './hooks/useAssignGoodsScreen';
import { styles } from './AssignGoodsScreen.styles';

export const AssignGoodsScreen: React.FC = () => {
  const {
    navigation, airwayBillId, airwayBill, goodsList, cargoBags, isLoading,
    selectedIds, selectedBagId, setSelectedBagId, totalSelectedWeight,
    isOverCapacity, capacityWeight, currentTotalWeight, toggleSelection,
    handleAssign, assignMutation, assignToBagMutation, createBagVisible, setCreateBagVisible,
    handleCreateBag, createBagMutation,
  } = useAssignGoodsScreen();

  if (isLoading) {
    return <AssignGoodsLoading />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <AssignGoodsHeader
        title={`Assigner à ${airwayBill?.awbNumber || 'AWB'}`}
        onBack={() => navigation.goBack()}
      />

      <BagSelector
        cargoBags={cargoBags}
        selectedBagId={selectedBagId}
        onSelectBag={setSelectedBagId}
        onCreateBag={() => setCreateBagVisible(true)}
      />

      <AssignGoodsSummary
        currentWeight={currentTotalWeight}
        selectedWeight={totalSelectedWeight}
        capacityWeight={capacityWeight}
        selectedCount={selectedIds.length}
        isOverCapacity={isOverCapacity}
      />

      <AssignGoodsList
        goodsList={goodsList}
        selectedIds={selectedIds}
        onToggle={toggleSelection}
      />

      <AssignGoodsFooter
        selectedCount={selectedIds.length}
        isOverCapacity={isOverCapacity}
        isAssigning={assignMutation.isPending || assignToBagMutation.isPending}
        onAssign={handleAssign}
      />

      <CargoBagCreateDialog
        visible={createBagVisible}
        awbId={airwayBillId}
        onDismiss={() => setCreateBagVisible(false)}
        onSubmit={(_, notes) => handleCreateBag(notes)}
        loading={createBagMutation.isPending}
      />
    </SafeAreaView>
  );
};

export default AssignGoodsScreen;
