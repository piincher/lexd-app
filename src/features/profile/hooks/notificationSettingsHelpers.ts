import { NotificationType, NotificationPreference } from "@src/shared/services/notificationService";

export type QuietHours = {
  enabled: boolean;
  startTime: string;
  endTime: string;
};

export const mapPermissionStatusToMasterEnabled = (status: string | null): boolean =>
  status === "granted";

export const updatePreferencesOptimistically = (
  prev: NotificationPreference[],
  type: NotificationType,
  value: boolean
): NotificationPreference[] =>
  prev.map((pref) => (pref.type === type ? { ...pref, enabled: value } : pref));

export const rollbackPreference = (
  prev: NotificationPreference[],
  type: NotificationType,
  value: boolean
): NotificationPreference[] =>
  prev.map((pref) => (pref.type === type ? { ...pref, enabled: !value } : pref));
