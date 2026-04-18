/**
 * RouteListScreen - Dashboard for route management
 * Phase 3: Route Management System with visual statistics
 */

import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, FAB, Snackbar, ActivityIndicator, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetRoutes, routeQueryKeys, useRouteStats } from '../hooks/useRoutes';
import { Route, ShippingMode, SHIPPING_MODE_LABELS, SHIPPING_MODE_COLORS } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import { ApiClientError } from '@src/api/client';
import { Theme } from '@src/constants/Theme';

type AdminV2StackParamList = {
  RouteList: undefined;
  RouteForm: { routeId?: string };
  RouteDetail: { routeId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

const MODE_FILTERS: { key: ShippingMode | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Tous', icon: 'apps' },
  { key: 'SEA', label: 'Maritime', icon: 'boat' },
  { key: 'AIR', label: 'Aérien', icon: 'airplane' },
];

export const RouteListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  
  const [selectedMode, setSelectedMode] = useState<ShippingMode | 'all'>('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filters = selectedMode !== 'all' ? { shippingMode: selectedMode } : undefined;

  const { data, isLoading, isRefetching, error, refetch } = useGetRoutes(filters);

  // Handle response data - backend returns { data: { routes: [...], pagination: {...} } }
  const routes: Route[] = (data?.data?.routes as Route[]) || [];
  const pagination = data?.data?.pagination;

  // Calculate stats
  const stats = {
    total: routes.length,
    sea: routes.filter((r: Route) => r.shippingMode === 'SEA').length,
    air: routes.filter((r: Route) => r.shippingMode === 'AIR').length,
    active: routes.filter((r: Route) => r.isActive).length,
  };

  const handleRoutePress = (routeId: string) => {
    navigation.navigate('RouteForm', { routeId });
  };

  const handleCreateRoute = () => {
    navigation.navigate('RouteForm', {});
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: routeQueryKeys.lists() });
    await refetch();
  };

  const renderRoute = ({ item }: { item: Route }) => (
    <RouteCard 
      route={item} 
      onPress={() => handleRoutePress(item._id)}
    />
  );

  const keyExtractor = (item: Route) => item._id;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={Theme.gradients.glass}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerGreeting}>Gestion</Text>
            <Text style={styles.headerTitle}>Routes</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="filter" size={24} color={Theme.neutral[700]} />
          </TouchableOpacity>
        </View>

        {/* Stats Dashboard */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsContainer}
        >
          <StatCard 
            label="Total" 
            value={stats.total} 
            icon="map" 
            gradient={Theme.gradients.primary}
          />
          <StatCard 
            label="Maritime" 
            value={stats.sea} 
            icon="boat" 
            gradient={['#3B82F6', '#60A5FA']}
          />
          <StatCard 
            label="Aérien" 
            value={stats.air} 
            icon="airplane" 
            gradient={['#8B5CF6', '#A78BFA']}
          />
          <StatCard 
            label="Actives" 
            value={stats.active} 
            icon="checkmark-circle" 
            gradient={['#10B981', '#34D399']}
          />
        </ScrollView>
      </LinearGradient>

      {/* Mode Filter Pills */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          {MODE_FILTERS.map((filter) => {
            const isSelected = selectedMode === filter.key;
            return (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterPill,
                  isSelected && styles.filterPillActive,
                ]}
                onPress={() => setSelectedMode(filter.key)}
              >
                {isSelected && (
                  <LinearGradient
                    colors={Theme.gradients.primary}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                )}
                <Ionicons 
                  name={filter.icon as any} 
                  size={16} 
                  color={isSelected ? '#FFF' : Theme.neutral[500]}
                  style={styles.filterIcon}
                />
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.filterTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Route List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.primary[600]} />
          <Text style={styles.loadingText}>Chargement des routes...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <LinearGradient
            colors={['#FEF2F2', '#FEE2E2']}
            style={styles.errorIconContainer}
          >
            <Ionicons name="alert-circle" size={64} color={Theme.status.error} />
          </LinearGradient>
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorSubtitle}>
            Impossible de récupérer les routes
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRefresh}
          >
            <LinearGradient
              colors={Theme.gradients.primary}
              style={styles.retryButtonGradient}
            >
              <Ionicons name="refresh" size={20} color="#FFF" />
              <Text style={styles.retryButtonText}>Réessayer</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <FlashList
          data={routes}
          keyExtractor={keyExtractor}
          renderItem={renderRoute}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={isRefetching} 
              onRefresh={handleRefresh}
              tintColor={Theme.primary[500]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <LinearGradient
                colors={['#F3F0FF', '#EDE9FE']}
                style={styles.emptyIconContainer}
              >
                <Ionicons name="map-outline" size={64} color={Theme.primary[400]} />
              </LinearGradient>
              <Text style={styles.emptyTitle}>Aucune route</Text>
              <Text style={styles.emptySubtitle}>
                {selectedMode !== 'all'
                  ? 'Aucune route dans cette catégorie'
                  : 'Créez votre première route pour commencer'}
              </Text>
              {selectedMode === 'all' && (
                <TouchableOpacity 
                  style={styles.emptyButton}
                  onPress={handleCreateRoute}
                >
                  <LinearGradient
                    colors={Theme.gradients.primary}
                    style={styles.emptyButtonGradient}
                  >
                    <Ionicons name="add" size={20} color="#FFF" />
                    <Text style={styles.emptyButtonText}>Nouvelle Route</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      )}

      {/* FAB */}
      <TouchableOpacity 
        style={styles.fabContainer}
        onPress={handleCreateRoute}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={Theme.gradients.primary}
          style={styles.fab}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="add" size={28} color="#FFF" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Error Snackbar */}
      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage(null)}
        action={{ label: 'Réessayer', onPress: handleRefresh }}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

// Stat Card Component
interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  gradient: readonly [string, string, ...string[]];
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, gradient }) => (
  <View style={styles.statCard}>
    <LinearGradient
      colors={gradient}
      style={styles.statIconBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Ionicons name={icon as any} size={20} color="#FFF" />
    </LinearGradient>
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

// Route Card Component
interface RouteCardProps {
  route: Route;
  onPress: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, onPress }) => {
  const modeColor = SHIPPING_MODE_COLORS[route.shippingMode];
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={styles.routeCard}>
        <Card.Content style={styles.routeCardContent}>
          {/* Header with name and status */}
          <View style={styles.routeCardHeader}>
            <View style={styles.routeNameContainer}>
              <View style={[styles.modeIndicator, { backgroundColor: modeColor }]}>
                <Ionicons 
                  name={route.shippingMode === 'SEA' ? 'boat' : 'airplane'} 
                  size={12} 
                  color="#FFF" 
                />
              </View>
              <Text style={styles.routeName} numberOfLines={1}>
                {route.name}
              </Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: route.isActive ? '#DEF7EC' : '#F3F4F6' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: route.isActive ? '#059669' : '#6B7280' }
              ]}>
                {route.isActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>

          {/* Origin to Destination */}
          <View style={styles.routePath}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>Origine</Text>
              <Text style={styles.locationValue} numberOfLines={1}>
                {typeof route.origin === 'string' ? route.origin : route.origin?.city}
              </Text>
            </View>
            <View style={styles.routeArrow}>
              <Ionicons name="arrow-forward" size={16} color={Theme.neutral[400]} />
            </View>
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>Destination</Text>
              <Text style={styles.locationValue} numberOfLines={1}>
                {typeof route.destination === 'string' ? route.destination : route.destination?.city}
              </Text>
            </View>
          </View>

          {/* Footer with details */}
          <View style={styles.routeFooter}>
            {route.shippingLine && (
              <View style={styles.footerItem}>
                <Ionicons name="business" size={14} color={Theme.neutral[400]} />
                <Text style={styles.footerText}>{route.shippingLine}</Text>
              </View>
            )}
            <View style={styles.footerItem}>
              <Ionicons name="time" size={14} color={Theme.neutral[400]} />
              <Text style={styles.footerText}>
                {route.estimatedTransitDays} jours
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  header: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.lg,
  },
  headerGreeting: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  statsContainer: {
    paddingRight: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    minWidth: 140,
    ...Theme.shadows.sm,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[400],
  },
  filterWrapper: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  filterList: {
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral.white,
    ...Theme.shadows.sm,
    overflow: 'hidden',
  },
  filterPillActive: {
    ...Theme.shadows.md,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  filterTextActive: {
    color: '#FFF',
  },
  listContent: {
    paddingTop: Theme.spacing.sm,
    paddingBottom: 120,
    paddingHorizontal: Theme.spacing.xl,
  },
  routeCard: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.radius.xl,
    backgroundColor: Theme.neutral.white,
    ...Theme.shadows.sm,
  },
  routeCardContent: {
    padding: Theme.spacing.lg,
  },
  routeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  routeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modeIndicator: {
    width: 24,
    height: 24,
    borderRadius: Theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  routePath: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.neutral[400],
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  routeArrow: {
    paddingHorizontal: Theme.spacing.sm,
  },
  routeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
    paddingTop: Theme.spacing.md,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
    marginLeft: Theme.spacing.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[400],
    textAlign: 'center',
    paddingHorizontal: Theme.spacing['2xl'],
  },
  emptyButton: {
    marginTop: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  emptyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: Theme.spacing.sm,
  },
  fabContainer: {
    position: 'absolute',
    right: Theme.spacing.xl,
    bottom: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    ...Theme.shadows.xl,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snackbar: {
    backgroundColor: Theme.neutral[800],
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
  },
  // Loading & Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
  },
  loadingText: {
    marginTop: Theme.spacing.lg,
    fontSize: 16,
    color: Theme.neutral[500],
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
    paddingHorizontal: Theme.spacing.xl,
  },
  errorIconContainer: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  errorSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[500],
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  retryButton: {
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  retryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  retryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: Theme.spacing.sm,
  },
});

export default RouteListScreen;
