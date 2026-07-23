import React from 'react';
import { Screen } from '@src/shared/ui/Screen';
import { WorkQueueList } from '../components/WorkQueueList';
import { useAdminWorkQueue } from '../hooks/useAdminWorkQueue';

export const AdminWorkQueueScreen: React.FC = () => {
  const queue = useAdminWorkQueue();

  return (
    <Screen
      scrollable={false}
      header={{
        title: 'File de travail',
        showBack: true,
        onBackPress: queue.goBack,
        showNotificationBell: true,
      }}
    >
      <WorkQueueList
        items={queue.items}
        filter={queue.filter}
        counts={queue.counts}
        isLoading={queue.isLoading}
        isRefreshing={queue.isRefreshing}
        isError={queue.isError}
        isPartialError={queue.isPartialError}
        isTruncated={queue.isTruncated}
        onFilterChange={queue.setFilter}
        onRefresh={queue.refresh}
        onOpenItem={queue.openItem}
        onOpenAssignments={queue.openAssignments}
        onOpenPayments={queue.openPayments}
      />
    </Screen>
  );
};

export default AdminWorkQueueScreen;
