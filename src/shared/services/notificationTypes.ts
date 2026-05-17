/**
 * Shared Notification Types
 */

export type NotificationPermissionStatus =
  | "granted"
  | "denied"
  | "undetermined"
  | null;

export interface PushNotificationPayload<T = unknown> {
  to: string;
  title: string;
  body: string;
  data?: T;
  sound?: "default" | null;
  priority?: "default" | "normal" | "high";
  badge?: number;
  channelId?: string;
}
