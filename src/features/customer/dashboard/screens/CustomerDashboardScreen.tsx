/**
 * CustomerDashboardScreen
 * Main customer dashboard with stats, quick actions, and activity feed
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import {
  Appbar,
  Text,
  Button,
  useTheme,
  Avatar,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@src/constants/Theme';
import { useAuth } from '@src/store/Auth';
import { RootStackScreenProps } from '@src/navigations/type';

import { useGetDashboard, useGetActivity, useDashboardInvalidation } from '../hooks/useDashboard';
import {
  StatCard,
  ActivityFeed,
  QuickActions,
  ShipmentPipeline,
  ActiveContainers,
  PaymentInsights,
} from '../components';
import { QuickAction, DashboardStats } from '../types';

// ============================================
// DEFAULT QUICK ACTIONS
// ============================================

const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'view-goods',
    label: 'Voir mes marchandises',
    icon: 'package-variant-closed',
    route: 'MyGoods',
  },
  {
    id: 'view-containers',
    label: 'Mes containers',
    icon: 'container',
    route: 'MyContainers',
  },
  // Chat feature hidden - not in use
  // {
  //   id: 'contact-support',
  //   label: 'Contacter support',
  //   icon: 'chat',
  //   route: 'SelectAdminToChatWith',
  // },
];

// ============================================
// STAT CARD GRADIENTS
// ============================================

const STAT_GRADIENTS = {
  goods: ['#8B5CF6', '#7C3AED', '#6D28D9'] as const,
  containers: ['#0EA5E9', '#0284C7', '#0369A1'] as const,
  spent: ['#10B981', '#059669', '#047857'] as const,
  balance: ['#F59E0B', '#D97706', '#B45309'] as const,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatCurrency = (amount: number): string => {
  const num = Number(amount) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M F`;
  if (num >= 1_000) return `${Math.round(num / 1_000)}K F`;
  return `${Math.round(num)} F`;
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// ============================================
// SKELETON COMPONENT
// ============================================

const DashboardSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.skeletonContainer}>
      {/* Header Skeleton */}
      <View style={styles.skeletonHeader}>
        <View style={[styles.skeletonAvatar, { backgroundColor: theme.colors.surfaceVariant }]} />
        <View style={styles.skeletonHeaderText}>
          <View style={[styles.skeletonLine, { width: 120, backgroundColor: theme.colors.surfaceVariant }]} />
          <View style={[styles.skeletonLine, { width: 180, marginTop: 8, backgroundColor: theme.colors.surfaceVariant }]} />
        </View>
      </View>

      {/* Stats Grid Skeleton */}
      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          {[1, 2].map((i) => (
            <View key={i} style={[styles.skeletonCard, { backgroundColor: theme.colors.surfaceVariant }]} />
          ))}
        </View>
        <View style={styles.statsRow}>
          {[3, 4].map((i) => (
            <View key={i} style={[styles.skeletonCard, { backgroundColor: theme.colors.surfaceVariant }]} />
          ))}
        </View>
      </View>

      {/* Quick Actions Skeleton */}
      <View style={styles.skeletonQuickActions}>
        <View style={[styles.skeletonLine, { width: 150, backgroundColor: theme.colors.surfaceVariant }]} />
        <View style={styles.skeletonActionsRow}>
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[
                styles.skeletonActionButton,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Activity Feed Skeleton */}
      <View style={styles.skeletonActivity}>
        <View style={[styles.skeletonLine, { width: 150, backgroundColor: theme.colors.surfaceVariant }]} />
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.skeletonActivityItem}>
            <View style={[styles.skeletonIcon, { backgroundColor: theme.colors.surfaceVariant }]} />
            <View style={styles.skeletonActivityContent}>
              <View style={[styles.skeletonLine, { width: '60%', backgroundColor: theme.colors.surfaceVariant }]} />
              <View style={[styles.skeletonLine, { width: '80%', marginTop: 8, backgroundColor: theme.colors.surfaceVariant }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

// ============================================
// MAIN SCREEN COMPONENT
// ============================================

export const CustomerDashboardScreen: React.FC<
  RootStackScreenProps<'CustomerDashboard'>
> = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { invalidateDashboard } = useDashboardInvalidation();

  // Queries
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
    error: dashboardError,
    refetch: refetchDashboard,
  } = useGetDashboard();

  const {
    data: activityData,
    isLoading: isActivityLoading,
    refetch: refetchActivity,
  } = useGetActivity({ limit: 5 });

  const isLoading = isDashboardLoading || isActivityLoading;
  const isError = isDashboardError;

  // Refresh handler
  const handleRefresh = async () => {
    await Promise.all([refetchDashboard(), refetchActivity()]);
  };

  // Action press handler
  const handleActionPress =
    (action: QuickAction) => {
      if (action.route) {
        navigation.navigate(action.route as never);
      } else if (action.action) {
        action.action();
      }
    };

  // Navigation handlers
  const handleNotifications = () => {
    navigation.navigate('Notifications' as never);
  };

  const handleViewAllActivity = () => {
    navigation.navigate('ActivityList' as never);
  };

  const handlePayBalance = () => {
    // Payment feature removed
    console.log('Payment feature removed');
  };

  // Always use the local French quick actions (backend ones have wrong icons)
  const quickActions = DEFAULT_QUICK_ACTIONS;

  // Stats data
  const stats: DashboardStats = dashboardData?.stats || {
    totalGoods: 0,
    goodsByStatus: {},
    totalContainers: 0,
    activeContainers: 0,
    totalSpent: 0,
    totalPaid: 0,
    balanceDue: 0,
  };

  // Containers data
  const containers = dashboardData?.containers || [];

  // Container press handler
  const handleContainerPress = (containerId: string) => {
    if (containerId) {
      (navigation as any).navigate('ContainerTracking', { containerId });
    } else {
      navigation.navigate('MyContainers' as never);
    }
  };

  // Welcome message based on time
  const getWelcomeMessage = (): string => {
    const hour = new Date().getHours();
    const name = user?.firstName || 'Client';
    if (hour < 12) return `Bonjour, ${name} ☀️`;
    if (hour < 18) return `Bon après-midi, ${name} 👋`;
    return `Bonsoir, ${name} 🌙`;
  };

  // Render error state
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Tableau de Bord" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={64}
            color={theme.colors.error}
          />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorText}>
            {dashboardError?.message || 'Impossible de charger le tableau de bord'}
          </Text>
          <Button
            mode="contained"
            onPress={handleRefresh}
            style={styles.retryButton}
          >
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar.Text
            size={40}
            label={(user?.firstName?.[0] || 'C').toUpperCase()}
            style={{ backgroundColor: theme.colors.primary }}
            color={Theme.neutral.white}
          />
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>{getWelcomeMessage()}</Text>
            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Suivez vos marchandises en temps réel
            </Text>
          </View>
        </View>
        <Appbar.Action
          icon="bell-outline"
          onPress={handleNotifications}
          style={styles.notificationButton}
        />
      </Appbar.Header>

      {/* Main Content */}
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isDashboardLoading}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        >
          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <StatCard
                icon="package-variant"
                value={formatNumber(stats.totalGoods)}
                label="Marchandises"
                gradientColors={STAT_GRADIENTS.goods}
                testID="stat-goods"
              />
              <StatCard
                icon="ferry"
                value={formatNumber(stats.activeContainers)}
                label="En Transit"
                gradientColors={STAT_GRADIENTS.containers}
                testID="stat-containers"
              />
            </View>
            <View style={styles.statsRow}>
              <StatCard
                icon="cash-multiple"
                value={formatCurrency(stats.totalSpent)}
                label="Total Depense"
                gradientColors={STAT_GRADIENTS.spent}
                testID="stat-spent"
              />
              <StatCard
                icon="credit-card-clock"
                value={formatCurrency(stats.balanceDue)}
                label="Solde Du"
                gradientColors={STAT_GRADIENTS.balance}
                onPress={stats.balanceDue > 0 ? handlePayBalance : undefined}
                testID="stat-balance"
              />
            </View>
          </View>

          {/* Balance Alert */}
          {stats.balanceDue > 0 && (
            <Pressable
              style={[
                styles.balanceAlert,
                { backgroundColor: `${Theme.status.error}15` },
              ]}
              onPress={handlePayBalance}
            >
              <MaterialCommunityIcons
                name="alert-circle"
                size={24}
                color={Theme.status.error}
              />
              <View style={styles.balanceAlertContent}>
                <Text style={[styles.balanceAlertTitle, { color: Theme.status.error }]}>
                  Paiement Requis
                </Text>
                <Text style={[styles.balanceAlertText, { color: theme.colors.onSurfaceVariant }]}>
                  Vous avez {formatCurrency(stats.balanceDue)} à payer. Cliquez pour régler.
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={Theme.status.error}
              />
            </Pressable>
          )}

          {/* Quick Actions */}
          <QuickActions
            actions={quickActions}
            dashboardData={{ stats, quickActions, recentActivity: [] }}
            onActionPress={handleActionPress}
            testID="quick-actions"
          />

          {/* Shipment Pipeline */}
          <ShipmentPipeline
            goodsByStatus={stats.goodsByStatus}
            totalGoods={stats.totalGoods}
          />

          {/* Active Containers */}
          <ActiveContainers
            containers={containers}
            onContainerPress={handleContainerPress}
          />

          {/* Payment Insights */}
          <PaymentInsights
            totalSpent={stats.totalSpent}
            totalPaid={stats.totalPaid || 0}
            balanceDue={stats.balanceDue}
          />

          {/* Activity Feed */}
          <ActivityFeed
            activities={activityData?.activities || []}
            showViewAll
            onViewAll={handleViewAllActivity}
            maxItems={5}
            testID="activity-feed"
          />

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  headerText: {
    marginLeft: Theme.spacing.md,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  notificationButton: {
    marginRight: Theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Theme.spacing.sm,
  },
  statsGrid: {
    paddingHorizontal: 16,
    gap: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  balanceAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
  },
  balanceAlertContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  balanceAlertTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  balanceAlertText: {
    fontSize: 13,
    marginTop: 2,
  },
  bottomSpacing: {
    height: Theme.spacing['4xl'],
  },
  // Error State
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing['3xl'],
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: Theme.spacing.lg,
  },
  errorText: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
  },
  retryButton: {
    marginTop: Theme.spacing.xl,
  },
  // Skeleton Styles
  skeletonContainer: {
    flex: 1,
    paddingTop: Theme.spacing.sm,
  },
  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  skeletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  skeletonHeaderText: {
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  skeletonLine: {
    height: 12,
    borderRadius: 6,
  },
  skeletonCard: {
    flex: 1,
    height: 120,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  skeletonQuickActions: {
    marginTop: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.lg,
  },
  skeletonActionsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  skeletonActionButton: {
    width: 100,
    height: 100,
    borderRadius: Theme.radius.lg,
  },
  skeletonActivity: {
    marginTop: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.lg,
  },
  skeletonActivityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.md,
  },
  skeletonIcon: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.md,
  },
  skeletonActivityContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
});

export default CustomerDashboardScreen;
