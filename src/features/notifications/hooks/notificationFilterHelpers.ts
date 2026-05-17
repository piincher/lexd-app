import type { FilterTab, InAppNotification } from '../types';

export const filterNotifications = (
  notifications: InAppNotification[],
  filter: FilterTab,
) => {
  if (filter === 'important') {
    return notifications.filter((item) =>
      item.priority === 'HIGH' ||
      item.category === 'WARNING' ||
      item.category === 'ERROR' ||
      ['READY_FOR_PICKUP', 'PAYMENT_OVERDUE'].includes(String(item.data?.movementEventType || item.data?.type || ''))
    );
  }

  if (filter === 'shipments') {
    return notifications.filter((item) =>
      item.type === 'CONTAINER_STATUS' ||
      item.type === 'ORDER_UPDATE' ||
      String(item.data?.screen || '').toLowerCase().includes('container')
    );
  }

  if (filter === 'payments') {
    return notifications.filter((item) =>
      item.type === 'PAYMENT' ||
      item.type === 'INVOICE'
    );
  }

  return notifications;
};
