/**
 * AssignGoodsScreen - Assign air goods to an airway bill or cargo bag
 */

import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Button as PaperButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { CapacityIndicator } from './components/CapacityIndicator';
import { AssignGoodsListItem } from './components/AssignGoodsListItem';
import { BagSelector } from './components/BagSelector';
import { CargoBagCreateDialog } from './components/CargoBagCreateDialog';
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

  const renderItem = useCallback(({ item }: { item: any }) => (
    <AssignGoodsListItem item={item} isSelected={selectedIds.includes(item._id)} onToggle={toggleSelection} />
  ), [selectedIds, toggleSelection]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Theme.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.title}>Assigner à {airwayBill?.awbNumber || 'AWB'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <BagSelector
        cargoBags={cargoBags}
        selectedBagId={selectedBagId}
        onSelectBag={setSelectedBagId}
        onCreateBag={() => setCreateBagVisible(true)}
      />

      <View style={styles.summary}>
        <CapacityIndicator currentWeight={currentTotalWeight} selectedWeight={totalSelectedWeight} capacityWeight={capacityWeight} />
        <Text style={styles.summaryText}>{selectedIds.length} sélectionné(s) · {totalSelectedWeight.toFixed(1)} kg</Text>
        {isOverCapacity && (
          <Text style={styles.warningText}>Capacité dépassée. Retirez des marchandises pour continuer.</Text>
        )}
      </View>

      <FlashList
        data={goodsList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={48} color={Theme.neutral[300]} />
            <Text style={styles.emptyText}>Aucune marchandise aérienne disponible</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <PaperButton
          mode="contained"
          onPress={handleAssign}
          loading={assignMutation.isPending || assignToBagMutation.isPending}
          disabled={selectedIds.length === 0 || assignMutation.isPending || assignToBagMutation.isPending || isOverCapacity}
          style={styles.assignButton}
        >
          Assigner {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
        </PaperButton>
      </View>

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
