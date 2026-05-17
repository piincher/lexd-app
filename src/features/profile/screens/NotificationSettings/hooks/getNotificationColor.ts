import { NotificationType } from '@src/shared/services';

export const getNotificationColor = (type: NotificationType, colors: any): string => {
  const colorMap: Record<NotificationType, string> = {
    ORDER_UPDATE: colors.status.info,
    PAYMENT: colors.status.success,
    CONTAINER_STATUS: colors.status.info,
    TICKET_REPLY: colors.status.warning,
    TICKET_CREATED: colors.status.warning,
    INVOICE: colors.status.error,
    CERTIFICATE_ISSUED: colors.accent.gold,
    GENERAL: colors.text.disabled,
    SYSTEM: colors.primary.main,
  };
  return colorMap[type] || colors.status.info;
};
