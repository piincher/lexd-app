import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import type { NotificationPermissionStatus } from "./notificationTypes";

export interface ChannelConfig {
  id: string;
  name: string;
  importance: Notifications.AndroidImportance;
  vibrationPattern: number[];
  lightColor: string;
}

export async function requestPermissionsBase(
  serviceName: string
): Promise<NotificationPermissionStatus> {
  try {
    if (!Device.isDevice) {
      console.warn(`[${serviceName}] Push notifications require a physical device`);
      return null;
    }
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus as NotificationPermissionStatus;
  } catch (error) {
    console.error(`[${serviceName}] Error requesting permissions:`, error);
    return null;
  }
}

export async function getPermissionsStatusBase(
  serviceName: string
): Promise<NotificationPermissionStatus> {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    return status as NotificationPermissionStatus;
  } catch (error) {
    console.error(`[${serviceName}] Error getting permission status:`, error);
    return null;
  }
}

export async function getPushTokenBase(serviceName: string): Promise<string | null> {
  try {
    if (!Device.isDevice) {
      console.warn(`[${serviceName}] Push token requires a physical device`);
      return null;
    }
    const status = await getPermissionsStatusBase(serviceName);
    if (status !== "granted") {
      console.warn(`[${serviceName}] Notification permissions not granted`);
      return null;
    }
    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants?.expoConfig?.extra?.eas?.projectId,
      })
    ).data;
    return token;
  } catch (error) {
    console.error(`[${serviceName}] Error getting push token:`, error);
    return null;
  }
}

export function handleNotificationBase<T>(
  serviceName: string,
  notification: Notifications.Notification
): { data: T | null; title: string; body: string } {
  const { data, title, body } = notification.request.content;
  console.log(`[${serviceName}] Notification received:`, { title, body, data });
  return { data: (data as T) || null, title: title || "", body: body || "" };
}

export function handleNotificationResponseBase<T>(
  serviceName: string,
  response: Notifications.NotificationResponse
): { data: T | null; actionIdentifier: string } {
  const { data } = response.notification.request.content;
  const { actionIdentifier } = response;
  console.log(`[${serviceName}] Notification response:`, { actionIdentifier, data });
  return { data: (data as T) || null, actionIdentifier };
}

export async function getBadgeCountBase(serviceName: string): Promise<number> {
  try {
    return await Notifications.getBadgeCountAsync();
  } catch (error) {
    console.error(`[${serviceName}] Error getting badge count:`, error);
    return 0;
  }
}

export async function setBadgeCountBase(serviceName: string, count: number): Promise<void> {
  try {
    await Notifications.setBadgeCountAsync(count);
  } catch (error) {
    console.error(`[${serviceName}] Error setting badge count:`, error);
  }
}

export async function incrementBadgeCountBase(serviceName: string): Promise<void> {
  const current = await getBadgeCountBase(serviceName);
  await setBadgeCountBase(serviceName, current + 1);
}

export async function clearBadgeCountBase(serviceName: string): Promise<void> {
  await setBadgeCountBase(serviceName, 0);
}

export async function setupNotificationChannelsBase(
  serviceName: string,
  channels: ChannelConfig[]
): Promise<void> {
  if (Platform.OS !== "android") return;
  try {
    for (const channel of channels) {
      await Notifications.setNotificationChannelAsync(channel.id, {
        name: channel.name,
        importance: channel.importance,
        vibrationPattern: channel.vibrationPattern,
        lightColor: channel.lightColor,
      });
    }
    console.log(`[${serviceName}] Notification channels setup complete`);
  } catch (error) {
    console.error(`[${serviceName}] Error setting up notification channels:`, error);
  }
}

export async function scheduleLocalNotification<T>(
  serviceName: string,
  title: string,
  body: string,
  data: T,
  trigger: { seconds?: number; repeats?: boolean; date?: Date }
): Promise<string | null> {
  try {
    let notificationTrigger: Notifications.NotificationTriggerInput;
    if (trigger.date) {
      notificationTrigger = { type: Notifications.SchedulableTriggerInputTypes.DATE, date: trigger.date };
    } else if (trigger.seconds) {
      notificationTrigger = { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: trigger.seconds, repeats: trigger.repeats || false };
    } else {
      notificationTrigger = null;
    }
    const identifier = await Notifications.scheduleNotificationAsync({
      content: { title, body, data: data as Record<string, unknown>, badge: 1 },
      trigger: notificationTrigger,
    });
    console.log(`[${serviceName}] Local notification scheduled:`, identifier);
    return identifier;
  } catch (error) {
    console.error(`[${serviceName}] Error scheduling notification:`, error);
    return null;
  }
}

export async function cancelNotification(serviceName: string, identifier: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(identifier);
    console.log(`[${serviceName}] Notification cancelled:`, identifier);
  } catch (error) {
    console.error(`[${serviceName}] Error cancelling notification:`, error);
  }
}

export async function cancelAllNotifications(serviceName: string): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log(`[${serviceName}] All notifications cancelled`);
  } catch (error) {
    console.error(`[${serviceName}] Error cancelling all notifications:`, error);
  }
}

export async function getScheduledNotifications(serviceName: string): Promise<Notifications.NotificationRequest[]> {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error(`[${serviceName}] Error getting scheduled notifications:`, error);
    return [];
  }
}

export async function sendPushNotification<T>(
  serviceName: string,
  tokens: string[],
  title: string,
  body: string,
  data?: T
): Promise<void> {
  const messages = tokens.map((token) => ({ to: token, title, body, data, priority: "high" as const }));
  const chunkSize = 100;
  for (let i = 0; i < messages.length; i += chunkSize) {
    const chunk = messages.slice(i, i + chunkSize);
    try {
      const response = await fetch("https://api.expo.dev/v2/push/send", {
        method: "POST",
        headers: { Accept: "application/json", "Accept-Encoding": "gzip, deflate", "Content-Type": "application/json" },
        body: JSON.stringify(chunk),
      });
      console.log(`[${serviceName}] Push notification sent:`, await response.json());
    } catch (error) {
      console.error(`[${serviceName}] Error sending push notification:`, error);
    }
  }
}
