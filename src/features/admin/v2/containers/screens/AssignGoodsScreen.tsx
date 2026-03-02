/**
 * AssignGoodsScreen - Screen to assign unassigned goods to a container
 * Phase 2 Container System
 * 
 * Features:
 * - Shows container capacity with visual indicators
 * - Lists unassigned goods with status "RECEIVED_AT_WAREHOUSE"
 * - Multi-select with checkboxes
 * - Capacity warnings
 * - Search by client name or goods ID
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, Checkbox } from 'react-native-paper';
import Animated, { FadeIn, FadeInUp, Layout } from 'react-native-reanimated';

import { Theme } from '@src/constants/Theme';
import { Badge } from '@src/components/ui';
import { 
  ContainerStatus, 
  CONTAINER_STATUS_LABELS,
  CONTAINER_STATUS_COLORS,
} from '../types';
import {
  useGetContainerById,
  useGetUnassignedGoods,
  useAssignGoodsToContainer,
  containerQueryKeys,
} from '../hooks';
import { Goods } from '../../goods/types';
import { Container } from '../types';
import { useQueryClient } from '@tanstack/react-query';

type AdminV2StackParamList = {
  ContainerList: undefined;
  ContainerDetail: { containerId: string };
  AssignGoods: { containerId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;
type RouteParams = { containerId: string };

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_CONTAINER_CBM = 67; // Standard 40ft container capacity

// Statuses that can receive goods (assignable)
const ASSIGNABLE_STATUSES: ContainerStatus[] = ['BOOKED', 'LOADING'];

const canReceiveGoods = (status: ContainerStatus): boolean => 
  ASSIGNABLE_STATUSES.includes(status);

interface GoodsListItemProps {
  goods: Goods;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}

/**
 * Individual goods item with checkbox selection
 */
const GoodsListItem: React.FC<GoodsListItemProps> = ({
  goods,
  isSelected,
  onToggle,
  index,
}) => {
  const clientName = (() => {
    if (typeof goods.clientId === 'object' && goods.clientId) {
      return `${goods.clientId.firstName} ${goods.clientId.lastName}`;
    }
    return 'Client inconnu';
  })();

  const hasPhoto = goods.photos && goods.photos.length > 0;

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 50).springify()}
      layout={Layout.springify()}
    >
      <TouchableOpacity
        style={[styles.goodsCard, isSelected && styles.goodsCardSelected]}
        onPress={onToggle}
        activeOpacity={0.9}
      >
        {/* Selection Checkbox */}
        <View style={styles.checkboxContainer}>
          <View
            style={[
              styles.checkbox,
              isSelected && styles.checkboxSelected,
            ]}
          >
            {isSelected && (
              <Ionicons name="checkmark" size={18} color="#FFF" />
            )}
          </View>
        </View>

        {/* Goods Image */}
        <View style={styles.imageContainer}>
          {hasPhoto ? (
            <Image source={{ uri: goods.photos[0] }} style={styles.image} />
          ) : (
            <LinearGradient
              colors={['#F3F0FF', '#E8E4F3']}
              style={styles.placeholderImage}
            >
              <Ionicons name="cube" size={24} color={Theme.primary[400]} />
            </LinearGradient>
          )}
        </View>

        {/* Goods Info */}
        <View style={styles.goodsInfo}>
          <View style={styles.goodsHeader}>
            <Text style={styles.goodsId}>{goods.goodsId}</Text>
            <Badge
              label={`${(goods.actualCBM || 0).toFixed(3)} m³`}
              variant="primary"
              size="small"
            />
          </View>

          <Text style={styles.description} numberOfLines={1}>
            {goods.description || 'Sans description'}
          </Text>

          <View style={styles.goodsMeta}>
            <View style={styles.metaItem}>
              <Ionicons
                name="person-outline"
                size={12}
                color={Theme.neutral[400]}
              />
              <Text style={styles.metaText} numberOfLines={1}>
                {clientName}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons
                name="scale-outline"
                size={12}
                color={Theme.neutral[400]}
              />
              <Text style={styles.metaText}>{goods.weight} kg</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * Capacity Indicator Component
 */
interface CapacityIndicatorProps {
  currentCBM: number;
  selectedCBM: number;
  maxCBM?: number;
}

const CapacityIndicator: React.FC<CapacityIndicatorProps> = ({
  currentCBM,
  selectedCBM,
  maxCBM = MAX_CONTAINER_CBM,
}) => {
  const totalCBM = (currentCBM || 0) + (selectedCBM || 0);
  const fillPercentage = Math.min((totalCBM / maxCBM) * 100, 100);
  const isFull = fillPercentage >= 90;
  const isNearFull = fillPercentage >= 70 && fillPercentage < 90;

  const getFillColor = () => {
    if (isFull) return Theme.status.error;
    if (isNearFull) return Theme.status.warning;
    return Theme.status.success;
  };

  return (
    <View style={styles.capacityContainer}>
      <View style={styles.capacityHeader}>
        <Text style={styles.capacityLabel}>Capacité du container</Text>
        <Text
          style={[
            styles.capacityValue,
            { color: getFillColor() },
          ]}
        >
          {(totalCBM || 0).toFixed(2)} / {maxCBM} m³
        </Text>
      </View>

      <View style={styles.progressBarBackground}>
        {/* Current capacity */}
        <View
          style={[
            styles.progressBarCurrent,
            {
              width: `${Math.min((currentCBM / maxCBM) * 100, 100)}%`,
            },
          ]}
        />
        {/* Selected capacity (added on top) */}
        {selectedCBM > 0 && (
          <LinearGradient
            colors={[Theme.primary[400], Theme.primary[600]]}
            style={[
              styles.progressBarSelected,
              {
                width: `${Math.min((selectedCBM / maxCBM) * 100, 100)}%`,
                left: `${Math.min((currentCBM / maxCBM) * 100, 100)}%`,
              },
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        )}
      </View>

      <View style={styles.capacityLegend}>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: Theme.neutral[400] },
            ]}
          />
          <Text style={styles.legendText}>
            Actuel: {(currentCBM || 0).toFixed(2)} m³
          </Text>
        </View>
        {selectedCBM > 0 && (
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: Theme.primary[500] },
              ]}
            />
            <Text style={styles.legendText}>
              Sélection: {(selectedCBM || 0).toFixed(2)} m³
            </Text>
          </View>
        )}
      </View>

      {/* Warnings */}
      {isFull && (
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={16} color={Theme.status.error} />
          <Text style={styles.warningText}>
            Capacité maximale atteinte!
          </Text>
        </View>
      )}
      {isNearFull && !isFull && (
        <View style={[styles.warningBanner, styles.warningBannerOrange]}>
          <Ionicons name="alert-circle" size={16} color={Theme.status.warning} />
          <Text style={[styles.warningText, styles.warningTextOrange]}>
            Container presque plein
          </Text>
        </View>
      )}
    </View>
  );
};

/**
 * Main AssignGoodsScreen Component
 */
export const AssignGoodsScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const { containerId } = route.params as RouteParams;

  // State
  const [selectedGoods, setSelectedGoods] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Queries
  const {
    data: containerData,
    isLoading: isLoadingContainer,
    error: containerError,
  } = useGetContainerById(containerId);

  const {
    data: unassignedGoodsData,
    isLoading: isLoadingGoods,
    isRefetching,
    refetch,
    error: goodsError,
  } = useGetUnassignedGoods();

  // Mutation
  const assignMutation = useAssignGoodsToContainer();

  const container: Container | undefined = containerData?.data?.container || containerData?.data;
  const unassignedGoods: Goods[] = unassignedGoodsData?.data?.goods || unassignedGoodsData?.data || [];
  
  // Check if container can receive goods
  const containerStatus = container?.status as ContainerStatus;
  const isAssignable = canReceiveGoods(containerStatus);

  // Filtered goods based on search
  const filteredGoods = (() => {
    if (!searchQuery.trim()) return unassignedGoods;

    const query = searchQuery.toLowerCase();
    return unassignedGoods.filter((goods) => {
      const goodsIdMatch = goods.goodsId.toLowerCase().includes(query);
      const clientNameMatch =
        typeof goods.clientId === 'object' &&
        goods.clientId &&
        (
          goods.clientId.firstName.toLowerCase().includes(query) ||
          goods.clientId.lastName.toLowerCase().includes(query)
        );
      return goodsIdMatch || clientNameMatch;
    });
  })();

  // Calculations
  const currentContainerCBM = container?.totalCBM || 0;
  const totalSelectedCBM = (() => {
    return selectedGoods.reduce((sum, id) => {
      const goods = unassignedGoods.find((g) => g._id === id);
      return sum + (goods?.actualCBM || 0);
    }, 0);
  })();

  const isOverCapacity = currentContainerCBM + totalSelectedCBM > MAX_CONTAINER_CBM;

  // Handlers
  const toggleSelection = (goodsId: string) => {
    setSelectedGoods((prev) =>
      prev.includes(goodsId)
        ? prev.filter((id) => id !== goodsId)
        : [...prev, goodsId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedGoods.length === filteredGoods.length) {
      setSelectedGoods([]);
    } else {
      setSelectedGoods(filteredGoods.map((g) => g._id));
    }
  };

  const handleAssign = async () => {
    if (selectedGoods.length === 0) return;

    if (!isAssignable) {
      Alert.alert(
        'Action impossible',
        `Ce container est en statut "${CONTAINER_STATUS_LABELS[containerStatus]}". Les marchandises ne peuvent être assignées qu'aux containers "Réservé" ou "En Chargement".`,
        [{ text: 'OK' }]
      );
      return;
    }

    if (isOverCapacity) {
      Alert.alert(
        'Capacité dépassée',
        'La sélection dépasse la capacité du container. Veuillez désélectionner des articles.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      await assignMutation.mutateAsync({
        containerId,
        data: { goodsIds: selectedGoods },
      });

      Alert.alert(
        'Succès',
        `${selectedGoods.length} marchandise(s) assignée(s) au container`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      // ApiClientError already extracts the message from backend response
      const errorMessage = error?.message || "Une erreur s'est produite lors de l'assignation.";
      
      console.error('Assign goods error:', error);
      Alert.alert('Erreur', errorMessage);
    }
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({
      queryKey: containerQueryKeys.unassignedGoods(),
    });
    await refetch();
  };

  // Loading state
  if (isLoadingContainer || isLoadingGoods) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={Theme.gradients.primary}
          style={styles.loadingHeader}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.loadingTitle}>Chargement...</Text>
        </LinearGradient>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.primary[500]} />
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (containerError || goodsError) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={Theme.gradients.primary}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Erreur</Text>
        </LinearGradient>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={64}
            color={Theme.status.error}
          />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorSubtitle}>
            Impossible de charger les données. Veuillez réessayer.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <LinearGradient colors={Theme.gradients.primary} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Assigner des marchandises</Text>
            <Text style={styles.headerSubtitle}>
              {container?.virtualContainerNumber}
            </Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        {/* Capacity Indicator */}
        <CapacityIndicator
          currentCBM={currentContainerCBM}
          selectedCBM={totalSelectedCBM}
        />

        {/* Non-assignable Warning */}
        {!isAssignable && (
          <View style={styles.nonAssignableBanner}>
            <Ionicons name="lock-closed" size={18} color="#EF4444" />
            <View style={styles.nonAssignableContent}>
              <Text style={styles.nonAssignableTitle}>
                Assignation impossible
              </Text>
              <Text style={styles.nonAssignableText}>
                Ce container est en statut "{CONTAINER_STATUS_LABELS[containerStatus]}". {'\n'}
                Les marchandises ne peuvent être assignées qu'aux containers "Réservé" ou "En Chargement".
              </Text>
            </View>
          </View>
        )}
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color={Theme.neutral[400]}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher par ID ou client..."
            placeholderTextColor={Theme.neutral[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons
                name="close-circle"
                size={20}
                color={Theme.neutral[400]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Select All Bar */}
      {filteredGoods.length > 0 && (
        <View style={styles.selectAllBar}>
          <TouchableOpacity
            style={styles.selectAllButton}
            onPress={toggleSelectAll}
          >
            <View
              style={[
                styles.checkbox,
                selectedGoods.length === filteredGoods.length &&
                  filteredGoods.length > 0 &&
                  styles.checkboxSelected,
              ]}
            >
              {selectedGoods.length === filteredGoods.length &&
                filteredGoods.length > 0 && (
                  <Ionicons name="checkmark" size={18} color="#FFF" />
                )}
            </View>
            <Text style={styles.selectAllText}>
              {selectedGoods.length === filteredGoods.length
                ? 'Tout désélectionner'
                : 'Tout sélectionner'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.resultsText}>
            {filteredGoods.length} résultat(s)
          </Text>
        </View>
      )}

      {/* Goods List */}
      <FlatList
        data={filteredGoods}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <GoodsListItem
            goods={item}
            isSelected={selectedGoods.includes(item._id)}
            onToggle={() => toggleSelection(item._id)}
            index={index}
          />
        )}
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
              <Ionicons
                name="cube-outline"
                size={64}
                color={Theme.primary[400]}
              />
            </LinearGradient>
            <Text style={styles.emptyTitle}>
              {searchQuery ? 'Aucun résultat' : 'Aucune marchandise disponible'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? 'Essayez une autre recherche'
                : 'Toutes les marchandises sont déjà assignées à des containers'}
            </Text>
          </View>
        }
      />

      {/* Bottom Action Bar */}
      {selectedGoods.length > 0 && (
        <Animated.View
          entering={FadeInUp.springify()}
          style={styles.bottomBar}
        >
          <LinearGradient
            colors={Theme.gradients.card}
            style={styles.bottomBarGradient}
          >
            <View style={styles.bottomBarContent}>
              <View style={styles.selectionInfo}>
                <Text style={styles.selectionCount}>
                  {selectedGoods.length} sélectionné(s)
                </Text>
                <Text
                  style={[
                    styles.selectionCBM,
                    isOverCapacity && styles.selectionCBMError,
                  ]}
                >
                  {(totalSelectedCBM || 0).toFixed(3)} m³
                  {isOverCapacity && ' (Excès)'}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.assignButton,
                  (assignMutation.isPending || isOverCapacity || !isAssignable) &&
                    styles.assignButtonDisabled,
                ]}
                onPress={handleAssign}
                disabled={assignMutation.isPending || isOverCapacity || !isAssignable}
              >
                <LinearGradient
                  colors={
                    isOverCapacity || !isAssignable
                      ? (Theme.gradients.card as readonly [string, string, ...string[]])
                      : Theme.gradients.primary
                  }
                  style={styles.assignButtonGradient}
                >
                  {assignMutation.isPending ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <>
                      <Text style={[
                        styles.assignButtonText,
                        (isOverCapacity || !isAssignable) && styles.assignButtonTextDisabled
                      ]}>
                        {!isAssignable ? 'Verrouillé' : 'Assigner'}
                      </Text>
                      <Ionicons
                        name={!isAssignable ? "lock-closed" : "arrow-forward"}
                        size={18}
                        color={isOverCapacity || !isAssignable ? Theme.neutral[400] : '#FFF'}
                      />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },

  // Header Styles
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  loadingHeader: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: Theme.spacing.md,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },

  // Capacity Indicator Styles
  capacityContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.lg,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  capacityLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  capacityValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressBarCurrent: {
    height: '100%',
    backgroundColor: Theme.neutral[400],
  },
  progressBarSelected: {
    height: '100%',
  },
  capacityLegend: {
    flexDirection: 'row',
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239,68,68,0.15)',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.md,
    marginTop: Theme.spacing.md,
  },
  warningBannerOrange: {
    backgroundColor: 'rgba(245,158,11,0.15)',
  },
  warningText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.status.error,
    marginLeft: 8,
  },
  warningTextOrange: {
    color: Theme.status.warning,
  },
  nonAssignableBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginTop: Theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  nonAssignableContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  nonAssignableTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 2,
  },
  nonAssignableText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
  },

  // Search Styles
  searchContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    backgroundColor: '#F8F7FC',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.full,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },
  searchIcon: {
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Theme.neutral[800],
    paddingVertical: 4,
  },

  // Select All Bar
  selectAllBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: '#F8F7FC',
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.primary[600],
    marginLeft: Theme.spacing.sm,
  },
  resultsText: {
    fontSize: 12,
    color: Theme.neutral[400],
    fontWeight: '500',
  },

  // Checkbox Styles
  checkboxContainer: {
    marginRight: Theme.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Theme.neutral[300],
    backgroundColor: Theme.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Theme.primary[500],
    borderColor: Theme.primary[500],
  },

  // Goods Card Styles
  goodsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.xs,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.xl,
    ...Theme.shadows.sm,
  },
  goodsCardSelected: {
    backgroundColor: Theme.primary[50],
    borderWidth: 1,
    borderColor: Theme.primary[200],
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    marginRight: Theme.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goodsInfo: {
    flex: 1,
  },
  goodsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  goodsId: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  description: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginBottom: 8,
  },
  goodsMeta: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginLeft: 4,
    maxWidth: 100,
  },

  // List Styles
  listContent: {
    paddingTop: Theme.spacing.sm,
    paddingBottom: 120,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
    marginHorizontal: Theme.spacing.lg,
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
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[400],
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.xl,
  },

  // Bottom Action Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.lg,
  },
  bottomBarGradient: {
    borderRadius: Theme.radius['2xl'],
    ...Theme.shadows.lg,
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.lg,
  },
  selectionInfo: {
    flex: 1,
  },
  selectionCount: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  selectionCBM: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.primary[600],
    marginTop: 2,
  },
  selectionCBMError: {
    color: Theme.status.error,
  },
  assignButton: {
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
    marginLeft: Theme.spacing.lg,
  },
  assignButtonDisabled: {
    opacity: 0.7,
  },
  assignButtonTextDisabled: {
    color: Theme.neutral[400],
  },
  assignButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.sm,
  },
  assignButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },

  // Loading & Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing['2xl'],
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  errorSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[400],
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  retryButton: {
    backgroundColor: Theme.primary[500],
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
  },
  retryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
});

export default AssignGoodsScreen;
