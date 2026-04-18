/**
 * GoodsCard - Stunning, eye-catching card design
 * Modern aesthetics with gradient accents and beautiful typography
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@src/components/ui/Badge/Badge';
import { Theme } from '@src/constants/Theme';
import { Goods, ClientInfo } from '../types';

const { width } = Dimensions.get('window');

interface GoodsCardProps {
  goods: Goods;
  onPress?: () => void;
  onMenuPress?: () => void;
  isSelected?: boolean;
  isSelectionMode?: boolean;
  onToggleSelect?: () => void;
}

const getStatusConfig = (status: string): { 
  label: string; 
  variant: any;
  gradient: readonly [string, string, ...string[]];
} => {
  const configs: Record<string, { 
    label: string; 
    variant: any; 
    gradient: readonly [string, string, ...string[]];
  }> = {
    'RECEIVED_AT_WAREHOUSE': { 
      label: 'En Entrepôt', 
      variant: 'primary',
      gradient: Theme.gradients.primary,
    },
    'ASSIGNED_TO_CONTAINER': { 
      label: 'En Container', 
      variant: 'info',
      gradient: Theme.gradients.ocean,
    },
    'LOADED_IN_CONTAINER': { 
      label: 'Chargé', 
      variant: 'info',
      gradient: Theme.gradients.ocean,
    },
    'IN_TRANSIT': { 
      label: 'En Transit', 
      variant: 'warning',
      gradient: Theme.gradients.sunset,
    },
    'ARRIVED_DESTINATION': { 
      label: 'Arrivé', 
      variant: 'success',
      gradient: ['#10B981', '#34D399', '#6EE7B7'] as const,
    },
    'READY_FOR_PICKUP': { 
      label: 'Prêt', 
      variant: 'success',
      gradient: ['#10B981', '#34D399', '#6EE7B7'] as const,
    },
    'DELIVERED': { 
      label: 'Livré', 
      variant: 'neutral',
      gradient: ['#6B7280', '#9CA3AF', '#D1D5DB'] as const,
    },
  };
  return configs[status] || { 
    label: status, 
    variant: 'neutral',
    gradient: Theme.gradients.primary,
  };
};

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('fr-FR');
};

export const GoodsCard: React.FC<GoodsCardProps> = ({ goods, onPress, onMenuPress, isSelected, isSelectionMode, onToggleSelect }) => {
  const statusConfig = getStatusConfig(goods.status);
  const hasPhoto = goods.photos && goods.photos.length > 0;
  
  // Get client info - clientId can be string or ClientInfo object
  const clientInfo = typeof goods.clientId === 'string' ? null : goods.clientId as ClientInfo;
  const clientName = clientInfo ? `${clientInfo.firstName} ${clientInfo.lastName}` : '';
  const clientPhone = clientInfo ? clientInfo.phoneNumber : '';

  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={isSelectionMode ? onToggleSelect : onPress}
      activeOpacity={0.95}
    >
      {/* Gradient Accent Bar */}
      <LinearGradient
        colors={statusConfig.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.accentBar}
      />

      <View style={styles.content}>
        {/* Left: Photo with gradient overlay */}
        <View style={styles.imageContainer}>
          {hasPhoto ? (
            <Image 
              source={{ uri: goods.photos[0] }} 
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <LinearGradient
              colors={['#F3F0FF', '#E8E4F3']}
              style={styles.placeholderImage}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="cube" size={28} color={Theme.primary[500]} />
              </View>
            </LinearGradient>
          )}
          
          {/* Status Badge Overlay */}
          <View style={styles.badgeOverlay}>
            <Badge 
              label={statusConfig.label} 
              variant={statusConfig.variant}
              size="small"
            />
          </View>
        </View>

        {/* Right: Content */}
        <View style={styles.infoContainer}>
          {/* ID Row */}
          <View style={styles.idRow}>
            <Text style={styles.goodsId}>{goods.goodsId}</Text>
            {isSelectionMode ? (
              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && <Ionicons name="checkmark" size={16} color="#FFF" />}
              </View>
            ) : (
              <TouchableOpacity style={styles.moreButton} onPress={onMenuPress}>
                <Ionicons name="ellipsis-horizontal" size={20} color={Theme.neutral[400]} />
              </TouchableOpacity>
            )}
          </View>

          {/* Description */}
          <Text style={styles.description} numberOfLines={1}>
            {goods.description || 'Sans description'}
          </Text>
          
          {/* Client Info */}
          {clientName && (
            <View style={styles.clientRow}>
              <Ionicons name="person-outline" size={14} color={Theme.neutral[500]} />
              <Text style={styles.clientText} numberOfLines={1}>
                {clientName}
              </Text>
            </View>
          )}
          {clientPhone && (
            <View style={styles.clientRow}>
              <Ionicons name="call-outline" size={14} color={Theme.neutral[500]} />
              <Text style={styles.clientPhone} numberOfLines={1}>
                {clientPhone}
              </Text>
            </View>
          )}

          {/* Quantity & Location Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="layers-outline" size={14} color={Theme.neutral[500]} />
              <Text style={styles.infoText}>
                Qté: {goods.quantity || 1}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={14} color={Theme.neutral[500]} />
              <Text style={styles.infoText}>
                Loc: {goods.warehouseLocation || 'N/A'}
              </Text>
            </View>
          </View>

          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <View style={[styles.metricIcon, { backgroundColor: `${Theme.primary[100]}` }]}>
                <Ionicons name="cube-outline" size={14} color={Theme.primary[600]} />
              </View>
              <Text style={styles.metricText}>
                {(goods.actualCBM || 0).toFixed(3)} m³
              </Text>
            </View>
            
            <View style={styles.metric}>
              <View style={[styles.metricIcon, { backgroundColor: `${Theme.accent.mint}20` }]}>
                <Ionicons name="scale-outline" size={14} color={Theme.accent.mint} />
              </View>
              <Text style={styles.metricText}>
                {goods.weight} kg
              </Text>
            </View>
          </View>

          {/* Price with gradient background */}
          <LinearGradient
            colors={['#F0FDF4', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.priceContainer}
          >
            <Text style={styles.priceLabel}>Coût total</Text>
            <Text style={styles.price}>
              {formatCurrency(goods.totalCost)} FCFA
            </Text>
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius['2xl'],
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.sm,
    ...Theme.shadows.md,
    overflow: 'hidden',
  },
  accentBar: {
    height: 4,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
  },
  imageContainer: {
    width: 100,
    height: 120,
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    position: 'relative',
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  badgeOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: Theme.spacing.lg,
    justifyContent: 'space-between',
  },
  idRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goodsId: {
    fontSize: 18,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.5,
  },
  moreButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: Theme.neutral[500],
    marginTop: 4,
    fontWeight: '500',
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  clientText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  clientPhone: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: Theme.spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[600],
  },
  metricsRow: {
    flexDirection: 'row',
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.lg,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIcon: {
    width: 28,
    height: 28,
    borderRadius: Theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  metricText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  priceContainer: {
    marginTop: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[400],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: Theme.primary[700],
    letterSpacing: -0.3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Theme.neutral[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Theme.primary[600],
    borderColor: Theme.primary[600],
  },
  selectedContainer: {
    backgroundColor: '#E8E4F3',
  },
});

export default GoodsCard;
