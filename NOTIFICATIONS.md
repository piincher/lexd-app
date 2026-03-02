# Push Notification System Documentation

## Overview

ChinaLink Express uses Expo Notifications for cross-platform push notification handling with support for:
- Push notifications (FCM for Android, APNS for iOS)
- Local scheduled notifications
- Notification preferences per type
- Quiet hours
- Deep linking from notifications
- Badge count management

## Architecture

```
shared/
├── services/
│   └── notificationService.ts    # Core notification service
├── notifications/
│   ├── notificationHandlers.ts   # Notification tap handlers
│   └── notificationCategories.ts # iOS notification categories
├── hooks/
│   └── usePushNotifications.ts   # Hook for notifications
└── providers/
    └── NotificationProvider.tsx  # Context provider

features/profile/screens/
└── NotificationSettingsScreen.tsx # User preferences UI
```

## Setup

### 1. Dependencies

Already installed:
- `expo-notifications`
- `expo-device`

### 2. Configuration (app.json)

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/images/notification-icon.png",
          "color": "#8B5CF6",
          "sounds": ["./assets/sounds/notification-sound.wav"],
          "enableBackgroundRemoteNotifications": true
        }
      }
    ],
    "android": {
      "googleServicesFile": "./google-services.json",
      "notification": {
        "icon": "./assets/images/notification-icon.png",
        "color": "#8B5CF6"
      }
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

### 3. Assets Required

Create these assets:
- `assets/images/notification-icon.png` - 96x96px, transparent background, white icon
- `assets/sounds/notification-sound.wav` - Notification sound (optional)

## Usage

### Using the Hook

```typescript
import { usePushNotifications } from "@src/shared/hooks";

function MyComponent() {
  const {
    token,
    permissionStatus,
    isEnabled,
    requestPermission,
    badgeCount,
  } = usePushNotifications({
    autoRegister: true,
    onNotificationReceived: (notification) => {
      console.log("Received:", notification);
    },
    onNotificationTapped: (response) => {
      console.log("Tapped:", response);
    },
  });

  // Request permissions
  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      console.log("Permission granted!");
    }
  };

  return (
    <View>
      <Text>Token: {token}</Text>
      <Text>Badge: {badgeCount}</Text>
    </View>
  );
}
```

### Using the Context

```typescript
import { useNotificationContext } from "@src/app/providers";

function MyComponent() {
  const {
    pushToken,
    isEnabled,
    badgeCount,
    requestPermission,
    scheduleLocal,
  } = useNotificationContext();

  // Schedule a local notification
  const scheduleReminder = async () => {
    await scheduleLocal(
      "Invoice Due",
      "Your invoice is due tomorrow",
      { type: "INVOICE", invoiceId: "123" },
      3600 // 1 hour from now
    );
  };
}
```

### Service Methods

```typescript
import {
  requestPermissions,
  getPushToken,
  registerDevice,
  scheduleLocalNotification,
  setBadgeCount,
  clearBadgeCount,
} from "@src/shared/services";

// Request permissions
const status = await requestPermissions();

// Get push token
const token = await getPushToken();

// Register with backend
await registerDevice(token);

// Schedule local notification
const id = await scheduleLocalNotification(
  "Pickup Reminder",
  "Don't forget to pickup your goods",
  { type: "ORDER_UPDATE", orderId: "123" },
  { seconds: 3600 }
);

// Manage badge count
await setBadgeCount(5);
await clearBadgeCount();
```

## Notification Types

| Type | Description | Default |
|------|-------------|---------|
| `ORDER_UPDATE` | Order status changes | ✅ Enabled |
| `PAYMENT` | Payment confirmations | ✅ Enabled |
| `CONTAINER_STATUS` | Container tracking updates | ✅ Enabled |
| `TICKET_REPLY` | Support ticket replies | ✅ Enabled |
| `INVOICE` | Invoice notifications | ✅ Enabled |
| `GENERAL` | General announcements | ✅ Enabled |
| `SYSTEM` | System notifications | ✅ Enabled |

## Deep Linking

Notifications automatically navigate to the appropriate screen when tapped:

| Type | Screen | Params |
|------|--------|--------|
| `ORDER_UPDATE` | OrderDetail | `{ orderId }` |
| `PAYMENT` | OrderDetail | `{ paymentId }` or `{ orderId }` |
| `CONTAINER_STATUS` | ContainerDetail | `{ containerId }` |
| `TICKET_REPLY` | TicketDetail | `{ ticketId }` |
| `INVOICE` | InvoiceDetail | `{ invoiceId }` |
| `GENERAL` | Notifications | - |

## Backend Integration

### Register Device Token

```http
POST /api/v1/users/me/device-token
{
  "token": "ExponentPushToken[xxxxxxxxxxxx]",
  "platform": "ios" | "android",
  "deviceInfo": { ... }
}
```

### Update Preferences

```http
PUT /api/v1/users/me/notification-preferences
{
  "preferences": {
    "ORDER_UPDATE": true,
    "PAYMENT": false
  }
}
```

### Send Push Notification (Backend)

```http
POST https://api.expo.dev/v2/push/send
Headers:
  Content-Type: application/json
Body:
[
  {
    "to": "ExponentPushToken[xxxxxxxxxxxx]",
    "title": "Order Update",
    "body": "Your order has been shipped",
    "data": {
      "type": "ORDER_UPDATE",
      "orderId": "123"
    },
    "sound": "default",
    "priority": "high"
  }
]
```

## Testing

### Local Testing

1. Get your device push token from the app logs
2. Use the Expo Push Notification Tool: https://expo.dev/notifications
3. Or use the test function:

```typescript
import { sendPushNotification } from "@src/shared/services";

await sendPushNotification(
  ["ExponentPushToken[your_token]"],
  "Test Title",
  "Test Body",
  { type: "GENERAL" }
);
```

### Testing on Device

```bash
# iOS
npx expo run:ios --device

# Android
npx expo run:android --device
```

## Troubleshooting

### No notifications received

1. Check permission status: `await getPermissionsStatus()`
2. Verify push token is generated
3. Check device is registered with backend
4. Verify `google-services.json` (Android) or `GoogleService-Info.plist` (iOS) is correct

### Badge count not updating

- Badge updates only work on iOS
- Android badge count is managed by the launcher and may vary

### Notification not navigating

1. Check `data.type` is set correctly in the push payload
2. Verify the screen exists in navigation
3. Check console for navigation errors

## iOS Specific

### Required Capabilities

In Xcode, ensure these capabilities are enabled:
- Push Notifications
- Background Modes: Remote Notifications

### App Store Guidelines

- Request notification permission at appropriate time
- Provide clear value proposition before requesting
- Allow users to customize notification types

## Android Specific

### Notification Channels

The app creates these channels on Android:
- `default` - General notifications
- `orders` - Order updates (high priority)
- `payments` - Payment notifications (high priority)
- `containers` - Container updates
- `tickets` - Support tickets (high priority)
- `invoices` - Invoice notifications (high priority)
- `system` - System notifications (low priority)

## Security Considerations

1. Never log push tokens in production
2. Validate notification data before processing
3. Use HTTPS for all notification-related API calls
4. Implement token refresh handling
5. Unregister device on logout

## Future Enhancements

- [ ] Rich notifications with images
- [ ] Notification grouping
- [ ] Action buttons (Reply, Mark as Read)
- [ ] Notification history sync
- [ ] Scheduled quiet hours
- [ ] Per-conversation notification settings
