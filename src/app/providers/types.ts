import * as Notifications from "expo-notifications";
import {
  NotificationData,
  NotificationPermissionStatus,
  NotificationPreference,
  NotificationType,
} from "../../shared/services/notificationService";

export interface NotificationContextValue {
  pushToken: string | null;
  permissionStatus: NotificationPermissionStatus;
  isEnabled: boolean;
  isRegistered: boolean;
  isLoading: boolean;
  error: string | null;
  badgeCount: number;
  preferences: NotificationPreference[];
  requestPermission: () => Promise<boolean>;
  registerDevice: () => Promise<boolean>;
  unregisterDevice: () => Promise<boolean>;
  updatePreferences: (
    preferences: Partial<Record<NotificationType, boolean>>
  ) => Promise<boolean>;
  clearBadge: () => Promise<void>;
  scheduleLocal: (
    title: string,
    body: string,
    data: NotificationData,
    seconds: number
  ) => Promise<string | null>;
  lastNotification: Notifications.Notification | null;
  lastNotificationResponse: Notifications.NotificationResponse | null;
  wasOpenedFromNotification: boolean;
}
