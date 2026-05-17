import { NotificationType } from '@src/shared/services';

const ICON_MAP: Record<NotificationType, string> = {
  ORDER_UPDATE: 'cube',
  PAYMENT: 'card',
  CONTAINER_STATUS: 'archive',
  TICKET_REPLY: 'chatbubble-ellipses',
  TICKET_CREATED: 'ticket',
  INVOICE: 'document-text',
  CERTIFICATE_ISSUED: 'trophy',
  GENERAL: 'notifications',
  SYSTEM: 'settings',
};

export const getNotificationIcon = (type: NotificationType): string => ICON_MAP[type] || 'notifications';
