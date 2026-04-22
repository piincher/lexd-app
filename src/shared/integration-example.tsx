/**
 * Integration Example
 * Shows how to integrate offline mode into the app
 */

import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { Theme } from '@src/constants/Theme';

// Import offline features
import {
  OfflineProvider,
  useOffline,
  useNetworkStatus,
  useOfflineMutation,
  useSyncStatus,
  OfflineBanner,
  SyncStatus,
  OfflineIndicator,
  CACHE_STRATEGIES,
} from './index';

// ============================================
// EXAMPLE 1: App Entry Point Setup
// ============================================

/**
 * Wrap your root App component with OfflineProvider
 */
export function AppWithOffline() {
  return (
    <OfflineProvider
      // Optional: Prefetch these queries when online
      prefetchQueries={[
        { queryKey: ['user'], queryFn: fetchUser },
        { queryKey: ['dashboard'], queryFn: fetchDashboard },
      ]}
      showToasts={true}
    >
      {/* Your app content */}
      <MainApp />
    </OfflineProvider>
  );
}

// Mock API functions
async function fetchUser() {
  return { id: '1', name: 'John Doe' };
}

async function fetchDashboard() {
  return { stats: { orders: 10, containers: 5 } };
}

// ============================================
// EXAMPLE 2: Network Status Usage
// ============================================

function NetworkStatusExample() {
  const { isOnline, isOffline, connectionType, isWifi, isCellular } = useNetworkStatus();

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Network Status</Text>
      <Text>Online: {isOnline ? 'Yes' : 'No'}</Text>
      <Text>Type: {connectionType}</Text>
      <Text>WiFi: {isWifi ? 'Yes' : 'No'}</Text>
      <Text>Cellular: {isCellular ? 'Yes' : 'No'}</Text>
    </View>
  );
}

// ============================================
// EXAMPLE 3: Query with Offline Cache
// ============================================

function CachedQueryExample() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    // Use cache strategy for offline availability
    ...CACHE_STRATEGIES.DASHBOARD,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading data</Text>;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Dashboard (Cached)</Text>
      <Text>Orders: {data?.stats?.orders}</Text>
      <Text>Containers: {data?.stats?.containers}</Text>
      <Text style={styles.note}>This data is available offline!</Text>
    </View>
  );
}

// ============================================
// EXAMPLE 4: Offline Mutation
// ============================================

function CreateOrderExample() {
  const queryClient = useQueryClient();

  const mutation = useOfflineMutation(
    {
      mutationType: 'CREATE',
      endpoint: '/api/orders',
      mutationFn: async (data: { name: string; amount: number }) => {
        // Actual API call
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        return response.json();
      },
      // Optimistic update - UI updates immediately
      onOptimisticUpdate: async (variables: any, qc: any) => {
        const tempOrder = {
          id: `temp-${Date.now()}`,
          ...variables,
          status: 'pending',
        };

        qc.setQueryData(['orders'], (old: any[] = []) => [tempOrder, ...old]);

        showMessage({
          message: 'Commande créée',
          description: 'Synchronisation en cours...',
          type: 'info',
        });
      },
      // Rollback if mutation fails
      onRollback: async (variables: any, context: any, qc: any) => {
        qc.invalidateQueries({ queryKey: ['orders'] });

        showMessage({
          message: 'Erreur',
          description: 'La création a échoué',
          type: 'danger',
        });
      },
      metadata: { entityType: 'orders' },
      queuePriority: 'high',
    },
    queryClient
  );

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Create Order (Offline-Aware)</Text>
      <Button
        title="Create Order"
        onPress={() => mutation.mutate({ name: 'New Order', amount: 100 })}
        disabled={mutation.isPending}
      />
      {mutation.isPending && <Text>Processing...</Text>}
    </View>
  );
}

// ============================================
// EXAMPLE 5: Update Mutation with Optimistic Update
// ============================================

function UpdateOrderExample({ orderId }: { orderId: string }) {
  const queryClient = useQueryClient();

  const updateMutation = useOfflineMutation(
    {
      mutationType: 'UPDATE',
      endpoint: `/api/orders/${orderId}`,
      mutationFn: async (data: { status: string }) => {
        const response = await fetch(`/api/orders/${orderId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        return response.json();
      },
      onOptimisticUpdate: async (variables: any, qc: any) => {
        // Update the specific order in cache
        qc.setQueryData(['orders', orderId], (old: any) => ({
          ...old,
          ...variables,
        }));

        // Also update in the orders list
        qc.setQueryData(['orders'], (old: any[] = []) =>
          old.map((order) =>
            order.id === orderId ? { ...order, ...variables } : order
          )
        );
      },
      onRollback: async (variables: any, context: any, qc: any) => {
        qc.invalidateQueries({ queryKey: ['orders'] });
      },
      metadata: { entityType: 'orders', entityId: orderId },
    },
    queryClient
  );

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Update Order Status</Text>
      <Button
        title="Mark as Shipped"
        onPress={() => updateMutation.mutate({ status: 'shipped' })}
      />
    </View>
  );
}

// ============================================
// EXAMPLE 6: Sync Status Panel
// ============================================

function SyncStatusExample() {
  const { pendingCount, failedCount, lastSyncTime } = useSyncStatus();
  const { syncNow } = useOffline();

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Sync Status</Text>
      <SyncStatus />
      <Text style={styles.marginTop}>Pending: {pendingCount}</Text>
      <Text>Failed: {failedCount}</Text>
      <Text>Last Sync: {lastSyncTime?.toLocaleString() || 'Never'}</Text>
    </View>
  );
}

// ============================================
// EXAMPLE 7: Screen with Offline Banner
// ============================================

function ScreenWithOfflineBanner() {
  return (
    <View style={styles.container}>
      {/* Offline banner shows at top when offline or syncing */}
      <OfflineBanner showSyncStatus={true} dismissible={false} />

      <ScrollView style={styles.content}>
        <Text style={styles.header}>My Orders</Text>
        {/* Your screen content */}
        <CachedQueryExample />
      </ScrollView>

      {/* Compact sync indicator in header or footer */}
      <View style={styles.footer}>
        <OfflineIndicator variant="pill" />
      </View>
    </View>
  );
}

// ============================================
// EXAMPLE 8: Manual Sync Trigger
// ============================================

function ManualSyncExample() {
  const { syncNow, isHydrated, prefetchData } = useOffline();
  const { isOnline } = useNetworkStatus();

  const handleManualSync = async () => {
    if (!isOnline) {
      showMessage({
        message: 'Hors ligne',
        description: 'Connexion internet requise',
        type: 'warning',
      });
      return;
    }

    await syncNow();
  };

  const handlePrefetch = async () => {
    await prefetchData();
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Manual Controls</Text>
      <Text>Hydrated: {isHydrated ? 'Yes' : 'No'}</Text>
      <Button title="Sync Now" onPress={handleManualSync} />
      <View style={styles.spacer} />
      <Button title="Prefetch Data" onPress={handlePrefetch} />
    </View>
  );
}

// ============================================
// Main App Component (for examples)
// ============================================

function MainApp() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Offline Mode Examples</Text>
      <NetworkStatusExample />
      <CachedQueryExample />
      <CreateOrderExample />
      <SyncStatusExample />
      <ManualSyncExample />
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#2196F3',
    color: 'white',
  },
  section: {
    backgroundColor: Theme.colors.background.card,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  note: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 8,
    fontStyle: 'italic',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    padding: 16,
  },
  content: {
    flex: 1,
  },
  footer: {
    padding: 16,
    backgroundColor: Theme.colors.background.card,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  spacer: {
    height: 8,
  },
  marginTop: {
    marginTop: 8,
  },
});

export default AppWithOffline;
