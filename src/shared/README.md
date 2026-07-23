# Offline Mode Module

Comprehensive offline mode implementation for LEXD mobile app with data persistence, background sync, and optimistic updates.

## Features

- ✅ **Network Status Detection** - Real-time online/offline detection
- ✅ **Data Persistence** - React Query cache persisted to AsyncStorage
- ✅ **Offline Queue** - Mutations queued when offline
- ✅ **Background Sync** - Automatic sync when app comes online
- ✅ **Optimistic Updates** - UI updates immediately, rolls back on error
- ✅ **Conflict Resolution** - Handle server/client data conflicts
- ✅ **UI Components** - Banner, badges, and sync status indicators

## Installation

Dependencies are already installed:
```bash
npm install @react-native-async-storage/async-storage
npm install @tanstack/query-async-storage-persister
npm install @tanstack/react-query-persist-client
# AsyncStorage is sufficient for most offline needs
```

## Quick Start

### 1. Wrap App with OfflineProvider

```tsx
// App.tsx
import { OfflineProvider } from './shared/providers';
import { getQueryClient } from './shared/lib';

export default function App() {
  return (
    <OfflineProvider>
      <NavigationContainer>
        {/* Your app */}
      </NavigationContainer>
    </OfflineProvider>
  );
}
```

### 2. Use Network Status Hook

```tsx
import { useNetworkStatus } from './shared/hooks';

function MyComponent() {
  const { isOnline, isOffline, connectionType } = useNetworkStatus();
  
  return (
    <View>
      {isOffline && <Text>Mode hors ligne</Text>}
      <Text>Type: {connectionType}</Text>
    </View>
  );
}
```

### 3. Use Offline-Aware Mutations

```tsx
import { useOfflineMutation } from './shared/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { createOrder } from './api/orders';

function CreateOrderButton() {
  const queryClient = useQueryClient();
  
  const mutation = useOfflineMutation({
    mutationType: 'CREATE',
    endpoint: '/api/orders',
    mutationFn: createOrder,
    onOptimisticUpdate: async (variables, qc) => {
      // Optimistically add to list
      qc.setQueryData(['orders'], (old) => [...old, { ...variables, id: 'temp' }]);
    },
    onRollback: async (variables, context, qc) => {
      // Rollback on error
      qc.invalidateQueries({ queryKey: ['orders'] });
    },
    metadata: { entityType: 'orders' },
  }, queryClient);
  
  return (
    <Button onPress={() => mutation.mutate({ name: 'New Order' })} />
  );
}
```

### 4. Add Offline UI Components

```tsx
import { OfflineBanner, SyncStatus } from './shared/components';

function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <OfflineBanner />
      {/* Your content */}
      <SyncStatus />
    </View>
  );
}
```

## Cache Strategies

Different data types have different cache behaviors:

```typescript
import { CACHE_STRATEGIES } from './shared/lib';

// Use in queries
const { data } = useQuery({
  queryKey: ['dashboard'],
  queryFn: fetchDashboard,
  ...CACHE_STRATEGIES.DASHBOARD, // Always cached
});
```

| Strategy | Stale Time | Cache Time | Use Case |
|----------|-----------|------------|----------|
| DASHBOARD | ∞ | ∞ | Critical data always available |
| GOODS_LIST | 5 min | 24 hours | Lists that update periodically |
| REPORTS | 1 hour | 7 days | Historical data |
| NOTIFICATIONS | 0 | 5 min | Real-time data, minimal caching |

## Offline Queue System

### Adding to Queue

```typescript
import { addToQueue } from './shared/lib';

await addToQueue({
  type: 'UPDATE',
  endpoint: '/api/orders/123',
  payload: { status: 'shipped' },
  maxRetries: 3,
  priority: 'high',
  metadata: { entityType: 'orders', entityId: '123' },
});
```

### Processing Queue

```typescript
import { processQueue } from './shared/lib';

const results = await processQueue(async (action) => {
  // Execute the action
  await apiClient.post(action.endpoint, action.payload);
});
```

## Background Sync

Automatic sync when:
- App comes to foreground
- Network connection restored
- Background task runs (every 15 min)

### Manual Sync

```tsx
import { useOffline } from './shared/providers';

function SettingsScreen() {
  const { syncNow } = useOffline();
  
  return (
    <Button title="Sync Now" onPress={syncNow} />
  );
}
```

## Conflict Resolution

When server data conflicts with local changes:

```tsx
import { ConflictResolver } from './shared/components';

function App() {
  const [conflict, setConflict] = useState(null);
  
  return (
    <ConflictResolver
      visible={!!conflict}
      conflict={conflict}
      onResolve={(resolution) => {
        // 'server' | 'client' | 'merge'
        if (resolution === 'server') {
          // Use server data
        } else if (resolution === 'client') {
          // Retry with client data
        }
        setConflict(null);
      }}
      onDismiss={() => setConflict(null)}
    />
  );
}
```

## API Reference

### Hooks

| Hook | Description |
|------|-------------|
| `useNetworkStatus()` | Get current network state |
| `useNetworkChange(onOnline, onOffline)` | Listen for network changes |
| `useOfflineMutation(options, queryClient)` | Offline-aware mutation |
| `useSyncStatus(interval?)` | Monitor sync queue status |
| `useFormattedSyncStatus()` | Get formatted status for UI |
| `useHasUnsyncedChanges()` | Check if there are pending changes |

### Components

| Component | Props | Description |
|-----------|-------|-------------|
| `OfflineBanner` | `showSyncStatus?, dismissible?` | Top banner for offline/sync status |
| `SyncStatus` | `compact?` | Full or compact sync status panel |
| `OfflineIndicator` | `variant, size` | Small indicator (dot, badge, icon, pill) |
| `ConflictResolver` | `visible, conflict, onResolve` | Modal for conflict resolution |

### Library Functions

| Function | Description |
|----------|-------------|
| `addToQueue(action)` | Add action to offline queue |
| `getQueue()` | Get all queued actions |
| `processQueue(processor)` | Process all queued actions |
| `syncNow()` | Trigger immediate sync |
| `checkAndSync()` | Check queue and sync if needed |
| `createQueryClient()` | Create configured query client |

## Best Practices

1. **Always use `useOfflineMutation`** for mutations that should work offline
2. **Set appropriate cache strategies** based on data freshness requirements
3. **Handle optimistic updates** carefully with proper rollback
4. **Test offline scenarios** - use airplane mode during testing
5. **Monitor storage size** - clear old data periodically
6. **Show sync status** - keep users informed about pending changes

## Troubleshooting

### Queue not processing
- Check network status: `useNetworkStatus()`
- Verify queue: `getQueue()`
- Trigger manual sync: `syncNow()`

### Data not persisting
- Verify OfflineProvider is wrapping app
- Check storage: `getStorageSize()`
- Clear and retry: `clearOfflineData()`

### Conflicts not resolving
- Ensure conflict handler is set: `setConflictHandler()`
- Check ConflictResolver modal is mounted
- Review server response in network logs
