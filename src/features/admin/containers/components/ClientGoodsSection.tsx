/**
 * ClientGoodsSection - Collapsible client section for packing list
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { ClientGoodsGroup } from '../types/packingList';
import { PackingListTable } from './PackingListTable';

// Enable layout animations on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ClientGoodsSectionProps {
  clientGroup: ClientGoodsGroup;
  index: number;
  defaultExpanded?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
  showPhotos?: boolean;
}

export const ClientGoodsSection: React.FC<ClientGoodsSectionProps> = ({
  clientGroup,
  index,
  defaultExpanded = true,
  onToggleExpand,
  showPhotos = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newValue = !isExpanded;
    setIsExpanded(newValue);
    onToggleExpand?.(newValue);
  };

  const { clientName, clientPhone, goods, summary } = clientGroup;
  
  // Calculate payment status
  const balance = summary.balanceDue || 0;
  const isPaid = balance <= 0;
  const isPartial = !isPaid && (summary.totalPaid || 0) > 0;
  const statusColor = isPaid ? '#10B981' : isPartial ? '#F59E0B' : '#EF4444';
  const statusText = isPaid ? 'Payé' : isPartial ? 'Partiel' : 'Impayé';

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={styles.container}
    >
      {/* Client Header - Clickable */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleToggle}
        style={styles.header}
      >
        <LinearGradient
          colors={[Theme.primary[50], '#FFFFFF']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.clientInfo}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>
                  {clientName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.clientDetails}>
                <Text style={styles.clientName} numberOfLines={2}>
                  {clientName}
                </Text>
                <View style={styles.phoneRow}>
                  <Ionicons name="call-outline" size={12} color={Theme.neutral[500]} />
                  <Text style={styles.clientPhone}>{clientPhone}</Text>
                </View>
                {/* Financial Info */}
                <View style={styles.financialRow}>
                  <Text style={styles.totalCost}>{(summary.totalCost || 0).toLocaleString()} FCFA</Text>
                  {!isPaid && (
                    <View style={[styles.balanceBadge, { backgroundColor: statusColor + '20' }]}>
                      <Text style={[styles.balanceText, { color: statusColor }]}>
                        Solde: {(summary.balanceDue || 0).toLocaleString()} FCFA
                      </Text>
                    </View>
                  )}
                  {isPaid && (
                    <View style={[styles.balanceBadge, { backgroundColor: '#10B98120' }]}>
                      <Text style={[styles.balanceText, { color: '#10B981' }]}>Payé</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.summaryContainer}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{goods.length}</Text>
                <Text style={styles.summaryLabel}>Colis</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{summary.totalCBM.toFixed(2)}</Text>
                <Text style={styles.summaryLabel}>m³</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{summary.totalWeight.toFixed(0)}</Text>
                <Text style={styles.summaryLabel}>kg</Text>
              </View>
            </View>

            <View style={styles.expandIcon}>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={Theme.primary[600]}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Expandable Content */}
      {isExpanded && (
        <View style={styles.content}>
          <PackingListTable
            goods={goods}
            showPhotos={showPhotos}
            startIndex={1}
          />
          
          {/* Client Subtotal */}
          <View style={styles.subtotalContainer}>
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Total Articles:</Text>
              <Text style={styles.subtotalValue}>{summary.totalQuantity}</Text>
            </View>
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Volume Total:</Text>
              <Text style={styles.subtotalValue}>{summary.totalCBM.toFixed(2)} m³</Text>
            </View>
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Poids Total:</Text>
              <Text style={styles.subtotalValue}>{summary.totalWeight.toFixed(0)} kg</Text>
            </View>
            {/* Financial Summary */}
            <View style={[styles.subtotalRow, { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: Theme.primary[200] }]}>
              <Text style={[styles.subtotalLabel, { fontWeight: '700' }]}>Montant Total:</Text>
              <Text style={[styles.subtotalValue, { color: Theme.primary[600], fontWeight: '700' }]}>
                {(summary.totalCost || 0).toLocaleString()} FCFA
              </Text>
            </View>
            {(summary.totalPaid || 0) > 0 && (
              <View style={styles.subtotalRow}>
                <Text style={styles.subtotalLabel}>Déjà Payé:</Text>
                <Text style={[styles.subtotalValue, { color: '#10B981' }]}>
                  {(summary.totalPaid || 0).toLocaleString()} FCFA
                </Text>
              </View>
            )}
            {!isPaid && (
              <View style={styles.subtotalRow}>
                <Text style={[styles.subtotalLabel, { color: '#DC2626', fontWeight: '700' }]}>SOLDE À PAYER:</Text>
                <Text style={[styles.subtotalValue, { color: '#DC2626', fontWeight: '800' }]}>
                  {(summary.balanceDue || 0).toLocaleString()} FCFA
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    backgroundColor: Theme.neutral.white,
    ...Theme.shadows.sm,
  },
  header: {
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
  },
  headerGradient: {
    padding: Theme.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  clientDetails: {
    flex: 1,
    minWidth: 0,
  },
  clientName: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: 2,
    lineHeight: 18,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clientPhone: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  financialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  totalCost: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  balanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  balanceText: {
    fontSize: 11,
    fontWeight: '700',
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    flexShrink: 0,
  },
  summaryItem: {
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    minWidth: 50,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: Theme.neutral[400],
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 24,
    backgroundColor: Theme.neutral[200],
  },
  expandIcon: {
    width: 32,
    height: 32,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Theme.spacing.sm,
  },
  content: {
    padding: Theme.spacing.md,
    paddingTop: 0,
  },
  subtotalContainer: {
    marginTop: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: Theme.primary[50],
    borderRadius: Theme.radius.lg,
    borderTopWidth: 2,
    borderTopColor: Theme.primary[200],
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xs,
  },
  subtotalLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.neutral[600],
  },
  subtotalValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.primary[700],
  },
});

export default ClientGoodsSection;
