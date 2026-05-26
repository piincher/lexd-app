import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { AdminRedemptionApprovalModal } from '../components/AdminRedemptionApprovalModal';
import { AdminRedemptionList } from '../components/AdminRedemptionList';
import { AdminRedemptionStats } from '../components/AdminRedemptionStats';
import { useAdminRewardRedemptions } from '../hooks/useRewardRedemptions';
import { createStyles } from './AdminRedemptionQueueScreen.styles';

export const AdminRedemptionQueueScreen: React.FC = () => {
  const navigation = useNavigation();
  const styles = createStyles();
  const redemption = useAdminRewardRedemptions();
  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <Screen
      header={{ title: 'Demandes de points', showBack: true, onBackPress: handleBack }}
      contentStyle={styles.content}
    >
      <AdminRedemptionStats analytics={redemption.analytics.data} isLoading={redemption.analytics.isLoading} />
      <AdminRedemptionList
        data={redemption.queue.data}
        isLoading={redemption.queue.isLoading}
        isError={redemption.queue.isError}
        status={redemption.status}
        search={redemption.search}
        page={redemption.page}
        onStatusChange={redemption.setStatus}
        onSearchChange={redemption.setSearch}
        onRetry={redemption.queue.refetch}
        onOpen={redemption.setSelectedRequest}
        onNextPage={redemption.nextPage}
        onPrevPage={redemption.prevPage}
      />
      <AdminRedemptionApprovalModal
        request={redemption.selectedRequest}
        eligibleGoods={redemption.eligibleGoods.data}
        isLoadingGoods={redemption.eligibleGoods.isLoading}
        selectedGoodsIds={redemption.selectedGoodsIds}
        approvedPoints={redemption.approvedPoints}
        note={redemption.note}
        reason={redemption.reason}
        selectedOutstanding={redemption.selectedOutstanding}
        selectedCapValue={redemption.selectedCapValue}
        selectedMaxPoints={redemption.selectedMaxPoints}
        totalOutstanding={redemption.totalOutstanding}
        totalCapValue={redemption.totalCapValue}
        totalMaxPoints={redemption.totalMaxPoints}
        approvedValue={redemption.approvedValue}
        canApprove={redemption.canApprove}
        validationMessage={redemption.validationMessage}
        isApproving={redemption.isApproving}
        isRejecting={redemption.isRejecting}
        onClose={redemption.closeModal}
        onToggleGoods={redemption.toggleGoods}
        onSelectAll={redemption.selectAllGoods}
        onDeselectAll={redemption.deselectAllGoods}
        onApprovedPointsChange={redemption.setApprovedPoints}
        onNoteChange={redemption.setNote}
        onReasonChange={redemption.setReason}
        onApprove={redemption.approve}
        onReject={redemption.reject}
      />
    </Screen>
  );
};

export default AdminRedemptionQueueScreen;
