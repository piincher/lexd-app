/**
 * GoodsListScreen - Stunning, eye-catching list screen
 * Modern design with gradient header, floating elements, and premium aesthetics
 */

import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, FAB, Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetAllGoods, goodsQueryKeys } from '../hooks';
import { GoodsCard } from '../components/GoodsCard';
import { Goods, GoodsStatus } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import { ApiClientError } from '@src/api/client';
import { Theme } from '@src/constants/Theme';
import NotificationBell from '@src/features/notifications/components/NotificationBell';

const { width } = Dimensions.get('window');

type AdminV2StackParamList = {
  GoodsList: undefined;
  ReceiveGoods: undefined;
  AdminGoodsDetail: { goodsId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

const STATUS_FILTERS: { key: GoodsStatus | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Tous', icon: 'apps' },
  { key: 'RECEIVED_AT_WAREHOUSE', label: 'Entrepôt', icon: 'home' },
  { key: 'ASSIGNED_TO_CONTAINER', label: 'Container', icon: 'cube' },
  { key: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { key: 'ARRIVED_DESTINATION', label: 'Arrivé', icon: 'flag' },
];

/**
 * Stunning GoodsListScreen with premium aesthetics
 */
export const GoodsListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<GoodsStatus | 'all'>('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scrollY] = useState(new Animated.Value(0));

  const filters = {
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    ...(searchQuery && { search: searchQuery }),
  };

  const { data, isLoading, isRefetching, error, refetch } = useGetAllGoods(filters, {
    onError: (err: ApiClientError) => {
      setErrorMessage(err.getUserMessage());
    },
  });

  const goods = data?.data?.goods || [];
  const total = data?.data?.pagination?.total || 0;

  // Animated header opacity
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleGoodsPress = (goodsId: string) => {
    navigation.navigate('AdminGoodsDetail', { goodsId });
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    await refetch();
  };

  const renderItem = ({ item }: { item: Goods }) => (
    <GoodsCard 
      goods={item} 
      onPress={() => handleGoodsPress(item.goodsId)}
      onMenuPress={() => handleGoodsPress(item.goodsId)}
    />
  );

  const keyExtractor = (item: Goods) => item._id;

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Gradient Header Background */}
      <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={['rgba(34, 197, 94, 0.1)', 'transparent']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Header Section with Gradient */}
      <LinearGradient
        colors={Theme.gradients.glass}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerGreeting}>Bonjour! 👋</Text>
            <Text style={styles.headerTitle}>Marchandises</Text>
          </View>
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={24}
            color={Theme.neutral[700]}
          />
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={Theme.gradients.primary}
              style={styles.statIconContainer}
            >
              <Ionicons name="cube" size={20} color="#FFF" />
            </LinearGradient>
            <View>
              <Text style={styles.statValue}>{total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient
              colors={Theme.gradients.ocean}
              style={styles.statIconContainer}
            >
              <Ionicons name="time" size={20} color="#FFF" />
            </LinearGradient>
            <View>
              <Text style={styles.statValue}>
                {goods.filter(g => g.status === 'RECEIVED_AT_WAREHOUSE').length}
              </Text>
              <Text style={styles.statLabel}>En attente</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar with Glass Effect */}
      <View style={styles.searchWrapper}>
        <LinearGradient
          colors={['#FFFFFF', '#FAFAFA']}
          style={styles.searchGradient}
        >
          <Ionicons name="search" size={20} color={Theme.primary[400]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une marchandise..."
            placeholderTextColor={Theme.neutral[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={22} color={Theme.neutral[400]} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setSelectedStatus(selectedStatus === 'all' ? 'RECEIVED_AT_WAREHOUSE' : 'all')}
            >
              <Ionicons name="options-outline" size={22} color={Theme.primary[500]} />
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>

      {/* Horizontal Filter Pills */}
      <View style={styles.filterWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={STATUS_FILTERS}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => {
            const isSelected = selectedStatus === item.key;
            return (
              <TouchableOpacity
                style={[
                  styles.filterPill,
                  isSelected && styles.filterPillActive,
                ]}
                onPress={() => setSelectedStatus(item.key)}
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
                  name={item.icon as any} 
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
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Goods List */}
      <Animated.FlatList
        data={goods}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={isRefetching} 
            onRefresh={handleRefresh}
            tintColor={Theme.primary[500]}
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <LinearGradient
              colors={['#F0FDF4', '#DCFCE7']}
              style={styles.emptyIconContainer}
            >
              <Ionicons name="cube-outline" size={64} color={Theme.primary[500]} />
            </LinearGradient>
            <Text style={styles.emptyTitle}>Aucune marchandise</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery || selectedStatus !== 'all'
                ? 'Essayez de modifier vos filtres'
                : 'Commencez par recevoir une marchandise'}
            </Text>
            {!searchQuery && selectedStatus === 'all' && (
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => navigation.navigate('ReceiveGoods')}
              >
                <LinearGradient
                  colors={Theme.gradients.primary}
                  style={styles.emptyButtonGradient}
                >
                  <Ionicons name="add" size={20} color="#FFF" />
                  <Text style={styles.emptyButtonText}>Nouvelle marchandise</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* Floating Action Button with Gradient */}
      <TouchableOpacity 
        style={styles.fabContainer}
        onPress={() => navigation.navigate('ReceiveGoods')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
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
  },
  headerGreeting: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[500],
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.5,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  statIconContainer: {
    width: 44,
    height: 44,
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
    marginTop: 2,
  },
  searchWrapper: {
    marginHorizontal: Theme.spacing.xl,
    marginTop: -Theme.spacing.lg,
    zIndex: 10,
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.radius.xl,
    paddingHorizontal: Theme.spacing.lg,
    height: 56,
    ...Theme.shadows.md,
  },
  searchIcon: {
    marginRight: Theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[800],
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: Theme.radius.md,
    backgroundColor: `${Theme.primary[100]}`,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default GoodsListScreen;
