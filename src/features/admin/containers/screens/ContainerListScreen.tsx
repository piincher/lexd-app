/**
 * ContainerListScreen - Dashboard for container management
 * Phase 2: Container System with visual statistics
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
import { Text, FAB, Snackbar, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetAllContainers, containerQueryKeys, useContainerStats } from '../hooks/useContainers';
import { ContainerCard } from '../components/ContainerCard';
import { Container, ContainerStatus, CONTAINER_STATUS_LABELS, CONTAINER_STATUS_COLORS } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import { ApiClientError } from '@src/api/client';
import { Theme } from '@src/constants/Theme';

type AdminV2StackParamList = {
  ContainerList: undefined;
  CreateContainer: undefined;
  ContainerDetail: { containerId: string };
  AssignGoods: { containerId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

// Statuses that can receive goods (assignable)
const ASSIGNABLE_STATUSES: ContainerStatus[] = ['BOOKED', 'EMPTY_TO_WAREHOUSE', 'LOADING'];

// Check if container can receive goods
const canReceiveGoods = (status: ContainerStatus): boolean => 
  ASSIGNABLE_STATUSES.includes(status);

const STATUS_FILTERS: { key: ContainerStatus | 'all' | 'assignable'; label: string; icon: string }[] = [
  { key: 'all', label: 'Tous', icon: 'apps' },
  { key: 'assignable', label: 'Peut recevoir', icon: 'add-circle' },
  { key: 'BOOKED', label: 'Réservés', icon: 'bookmark' },
  { key: 'LOADING', label: 'Chargement', icon: 'hammer' },
  { key: 'LOADED', label: 'Chargés', icon: 'cube' },
  { key: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { key: 'ARRIVED', label: 'Arrivés', icon: 'flag' },
];

export const ContainerListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  
  const [selectedStatus, setSelectedStatus] = useState<ContainerStatus | 'all' | 'assignable'>('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filters = (() => {
    if (selectedStatus === 'assignable') {
      return {}; // Fetch all, filter client-side
    }
    return selectedStatus !== 'all' ? { status: selectedStatus } : undefined;
  })();

  const { data, isLoading, isRefetching, error, refetch } = useGetAllContainers(filters);

  // Handle both array and paginated object response formats
  const responseData = data?.data;
  const containers: Container[] = Array.isArray(responseData) 
    ? responseData 
    : responseData?.containers || [];

  // Filter containers based on selected status (client-side filtering for 'assignable')
  const filteredContainers = (() => {
    if (selectedStatus === 'assignable') {
      return containers.filter((c: Container) => canReceiveGoods(c.status));
    }
    return containers;
  })();

  // Calculate stats with null safety
  const stats = {
    total: containers?.length || 0,
    booked: containers?.filter((c: Container) => c.status === 'BOOKED').length || 0,
    loading: containers?.filter((c: Container) => c.status === 'LOADING').length || 0,
    loaded: containers?.filter((c: Container) => c.status === 'LOADED').length || 0,
    inTransit: containers?.filter((c: Container) => c.status === 'IN_TRANSIT').length || 0,
    arrived: containers?.filter((c: Container) => c.status === 'ARRIVED').length || 0,
    assignable: containers?.filter((c: Container) => canReceiveGoods(c.status)).length || 0,
  };

  const handleContainerPress = (containerId: string) => {
    navigation.navigate('ContainerDetail', { containerId });
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: containerQueryKeys.lists() });
    await refetch();
  };

  const renderContainer = ({ item }: { item: Container }) => (
    <ContainerCard 
      container={item} 
      onPress={() => handleContainerPress(item._id)}
    />
  );

  const keyExtractor = (item: Container) => item._id;

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
            <Text style={styles.headerTitle}>Containers</Text>
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
            icon="cube" 
            gradient={Theme.gradients.primary}
          />
          <StatCard 
            label="En chargement" 
            value={stats.loading} 
            icon="hammer" 
            gradient={['#F59E0B', '#FBBF24']}
          />
          <StatCard 
            label="En transit" 
            value={stats.inTransit} 
            icon="airplane" 
            gradient={['#EC4899', '#F472B6']}
          />
          <StatCard 
            label="Arrivés" 
            value={stats.arrived} 
            icon="flag" 
            gradient={['#10B981', '#34D399']}
          />
          <StatCard 
            label="Peut recevoir" 
            value={stats.assignable} 
            icon="add-circle" 
            gradient={['#6366F1', '#818CF8']}
          />
        </ScrollView>
      </LinearGradient>

      {/* Status Filter Pills */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          {STATUS_FILTERS.map((filter) => {
            const isSelected = selectedStatus === filter.key;
            return (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterPill,
                  isSelected && styles.filterPillActive,
                ]}
                onPress={() => setSelectedStatus(filter.key)}
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

      {/* Container List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.primary[600]} />
          <Text style={styles.loadingText}>Chargement des containers...</Text>
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
            Impossible de récupérer les containers
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
        data={filteredContainers}
        keyExtractor={keyExtractor}
        renderItem={renderContainer}
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
              <Ionicons name="cube-outline" size={64} color={Theme.primary[400]} />
            </LinearGradient>
            <Text style={styles.emptyTitle}>Aucun container</Text>
            <Text style={styles.emptySubtitle}>
              {selectedStatus === 'assignable'
                ? 'Aucun container ne peut recevoir de marchandises'
                : selectedStatus !== 'all'
                ? 'Aucun container dans ce statut'
                : 'Créez votre premier container pour commencer'}
            </Text>
            {selectedStatus === 'all' && (
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => navigation.navigate('CreateContainer')}
              >
                <LinearGradient
                  colors={Theme.gradients.primary}
                  style={styles.emptyButtonGradient}
                >
                  <Ionicons name="add" size={20} color="#FFF" />
                  <Text style={styles.emptyButtonText}>Nouveau Container</Text>
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
        onPress={() => navigation.navigate('CreateContainer')}
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
    backgroundColor: Theme.colors.background.card,
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
    backgroundColor: Theme.colors.background.card,
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
    backgroundColor: Theme.colors.background.card,
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

export default ContainerListScreen;
