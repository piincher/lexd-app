# Analytics & Monitoring Setup

This document describes the comprehensive analytics and monitoring implementation for ChinaLink Express.

## Overview

The analytics system provides:
- **Error Tracking**: Sentry integration for production error monitoring
- **User Analytics**: Firebase Analytics for user behavior tracking
- **Performance Monitoring**: Custom performance metrics collection
- **Health Checks**: System health monitoring for critical services

## Installation

The following dependencies have been installed:

```bash
npm install @sentry/react-native @react-native-firebase/analytics @react-native-firebase/app
```

## Configuration

### Environment Variables

Add these to your `.env` or `app.json`:

```bash
# Sentry
EXPO_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Firebase is automatically configured via google-services.json (Android) and GoogleService-Info.plist (iOS)
```

### Sentry Initialization

Sentry is automatically initialized in `src/services/sentry.ts` with:
- Error filtering for known non-critical errors
- Performance tracing
- Mobile replay integration
- User context tracking

### Firebase Analytics

Firebase Analytics is automatically initialized and ready to use.

## Usage

### 1. Screen View Tracking

Automatic screen tracking via NavigationAnalytics wrapper:

```tsx
import { NavigationAnalytics } from '@src/shared/components';

// In your app root
<NavigationAnalytics>
  <NavigationContainer>
    {/* Your app */}
  </NavigationContainer>
</NavigationAnalytics>
```

Or manual tracking:

```tsx
import { useAnalytics } from '@src/shared/hooks';

function MyScreen() {
  const { logScreenView } = useAnalytics();
  
  useEffect(() => {
    logScreenView('MyScreen', 'MyScreenClass');
  }, []);
}
```

### 2. Event Tracking

```tsx
import { useAnalytics, AnalyticsEvents } from '@src/shared/hooks';

function MyComponent() {
  const { logEvent, trackButtonClick } = useAnalytics();
  
  const handlePress = () => {
    // Track button click
    trackButtonClick('submit_button', 'MyScreen');
    
    // Or track custom event
    logEvent(AnalyticsEvents.ORDER_CREATED, {
      order_id: '123',
      order_value: 1000,
    });
  };
}
```

### 3. Error Tracking

```tsx
import { useAnalytics } from '@src/shared/hooks';
import { captureException } from '@src/shared/lib/sentry';

// In components
const { logError } = useAnalytics();
logError(error, 'payment_processing');

// Or directly via Sentry
captureException(error, { context: 'additional info' });
```

### 4. Performance Monitoring

```tsx
import { perfMonitor } from '@src/shared/lib';

// Start a performance mark
perfMonitor.startMark('data_fetch');

// Your async operation
const data = await fetchData();

// End the mark
perfMonitor.endMark('data_fetch', { itemCount: data.length });
```

Or use the hook:

```tsx
import { useComponentAnalytics } from '@src/shared/hooks';

function MyComponent() {
  const { trackInteraction, getStats } = useComponentAnalytics('MyComponent');
  
  const handleClick = () => {
    trackInteraction('button_click', { button: 'submit' });
  };
}
```

### 5. Screen Analytics

```tsx
import { useScreenAnalytics } from '@src/shared/hooks';

function MyScreen() {
  const { reportLoaded, trackError } = useScreenAnalytics('MyScreen');
  
  useEffect(() => {
    loadData().then(data => {
      reportLoaded(data.size, data.items.length);
    }).catch(error => {
      trackError(error, 'data_loading');
    });
  }, []);
}
```

### 6. Health Checks

```tsx
import { runHealthCheck, scheduleHealthChecks } from '@src/shared/lib';

// One-time check
const result = await runHealthCheck();
console.log(result.healthy); // true/false
console.log(result.checks); // { api, database, storage, network, memory }

// Scheduled checks
const healthMonitor = scheduleHealthChecks(60000, (result) => {
  if (!result.healthy) {
    // Handle unhealthy state
  }
});

// Stop monitoring
healthMonitor.stop();
```

## Container Feature Analytics

The container feature has comprehensive analytics tracking:

```tsx
import { useContainerAnalytics } from '@src/features/admin/containers/hooks';

function ContainerScreen() {
  const analytics = useContainerAnalytics();
  
  // Track screen view
  useEffect(() => {
    analytics.trackContainerDetailView(containerId, container.status);
  }, [containerId, container]);
  
  // Track actions
  const handleStatusUpdate = (status) => {
    analytics.trackStatusUpdate(containerId, oldStatus, status);
  };
}
```

Available container analytics:
- `trackContainerDetailView(containerId, status)`
- `trackContainerListView()`
- `trackContainerCreated(containerId, shippingLine)`
- `trackStatusUpdate(containerId, oldStatus, newStatus)`
- `trackGoodsAssigned(containerId, goodsCount)`
- `trackGoodsRemoved(containerId, goodsId)`
- `trackContainerDeleted(containerId)`
- `trackPackingListGenerated(containerId, goodsCount)`
- `trackLoadingListView(containerId)`
- `trackReadyForPickup(containerId)`
- `trackGoodsDelivered(goodsId, containerId)`
- `trackActionClick(action, containerId)`
- `trackContainerScanned(containerNumber)`

## Analytics Events Reference

### Standard Events

| Event | Description |
|-------|-------------|
| `screen_view` | Screen viewed by user |
| `button_click` | Button interaction |
| `form_submit` | Form submission |
| `form_error` | Form validation error |
| `item_select` | Item selected |
| `item_add` | Item added |
| `item_remove` | Item removed |

### Order Events

| Event | Description |
|-------|-------------|
| `order_created` | New order created |
| `order_updated` | Order updated |
| `order_viewed` | Order details viewed |
| `order_cancelled` | Order cancelled |

### Container Events

| Event | Description |
|-------|-------------|
| `container_viewed` | Container details viewed |
| `container_updated` | Container updated |
| `container_scanned` | Container QR scanned |

### Error Events

| Event | Description |
|-------|-------------|
| `app_error` | Application error |
| `api_error` | API error |
| `validation_error` | Validation error |

## Testing Analytics

To verify analytics are working:

1. **Sentry**: Check your Sentry dashboard for incoming events
2. **Firebase**: Use Firebase DebugView for real-time event verification
3. **Console**: Enable debug mode to see analytics logs in development

## Privacy & Compliance

- No PII is sent to analytics without user consent
- User IDs are hashed before sending to Firebase
- Sentry filters out known non-critical errors to reduce noise
- Health checks don't expose sensitive data

## Troubleshooting

### Sentry not receiving events
- Check DSN configuration
- Verify `SENTRY_DSN` environment variable
- Check network connectivity

### Firebase Analytics not working
- Ensure `google-services.json` (Android) or `GoogleService-Info.plist` (iOS) is present
- Check Firebase project configuration
- Verify analytics is enabled in Firebase Console

### Performance marks not showing
- Ensure `perfMonitor` is properly imported
- Check that marks are started before ended
- Verify analytics debug mode is enabled
