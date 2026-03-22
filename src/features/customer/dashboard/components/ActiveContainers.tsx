/**
 * ActiveContainers Component
 * Shows containers the user has goods in, with status and shipping info
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface ContainerInfo {
  id: string;
  virtualContainerNumber: string;
  status: string;
  shippingMode?: string;
  shippingLine?: string;
  timeline?: {
    departedAt?: string;
    arrivedAt?: string;
    estimatedArrival?: string;
  };
}

export interface ActiveContainersProps {
  containers: ContainerInfo[];
  onContainerPress?: (containerId: string) => void;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  LOADING: { label: 'Chargement', color: '#F59E0B', icon: 'cube-outline' },
  LOADED: { label: 'Charge', color: '#0EA5E9', icon: 'cube' },
  IN_TRANSIT: { label: 'En Transit', color: '#8B5CF6', icon: 'airplane' },
  ARRIVED: { label: 'Arrive', color: '#10B981', icon: 'flag' },
  READY_FOR_PICKUP: { label: 'Pret', color: '#22C55E', icon: 'checkmark-circle' },
  DELIVERED: { label: 'Livre', color: '#059669', icon: 'home' },
};

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

export const ActiveContainers: React.FC<ActiveContainersProps> = ({
  containers,
  onContainerPress,
}) => {
  // Show only active containers (not delivered)
  const activeContainers = containers.filter(
    (c) => c.status !== 'DELIVERED' && c.status !== 'COMPLETED'
  );

  if (activeContainers.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Containers Actifs</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{activeContainers.length}</Text>
        </View>
      </View>

      <View style={styles.cardList}>
        {activeContainers.slice(0, 3).map((container) => {
          const config = STATUS_CONFIG[container.status] || STATUS_CONFIG.LOADING;
          const isAir = container.shippingMode?.toLowerCase() === 'air' ||
            container.shippingMode?.toLowerCase() === 'aerien';

          return (
            <Pressable
              key={container.id}
              style={styles.card}
              onPress={() => onContainerPress?.(container.id)}
            >
              {/* Status indicator bar */}
              <View style={[styles.statusBar, { backgroundColor: config.color }]} />

              <View style={styles.cardContent}>
                <View style={styles.cardRow}>
                  <View style={styles.cardLeft}>
                    <View style={[styles.modeIcon, { backgroundColor: `${config.color}15` }]}>
                      <Ionicons
                        name={isAir ? 'airplane' : 'boat'}
                        size={18}
                        color={config.color}
                      />
                    </View>
                    <View>
                      <Text style={styles.containerNumber}>
                        {container.virtualContainerNumber || 'N/A'}
                      </Text>
                      <Text style={styles.shippingInfo}>
                        {isAir ? 'Aerien' : 'Maritime'}
                        {container.shippingLine ? ` • ${container.shippingLine}` : ''}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.statusPill, { backgroundColor: `${config.color}15` }]}>
                    <Ionicons name={config.icon as any} size={12} color={config.color} />
                    <Text style={[styles.statusText, { color: config.color }]}>
                      {config.label}
                    </Text>
                  </View>
                </View>

                {/* Timeline info */}
                {(container.timeline?.departedAt || container.timeline?.arrivedAt) && (
                  <View style={styles.timelineRow}>
                    {container.timeline.departedAt && (
                      <View style={styles.timelineItem}>
                        <Ionicons name="arrow-up-circle-outline" size={12} color={Theme.neutral[400]} />
                        <Text style={styles.timelineText}>
                          Depart: {formatDate(container.timeline.departedAt)}
                        </Text>
                      </View>
                    )}
                    {container.timeline.arrivedAt && (
                      <View style={styles.timelineItem}>
                        <Ionicons name="arrow-down-circle-outline" size={12} color={Theme.neutral[400]} />
                        <Text style={styles.timelineText}>
                          Arrivee: {formatDate(container.timeline.arrivedAt)}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </Pressable>
          );
        })}

        {activeContainers.length > 3 && (
          <Pressable
            style={styles.viewMoreButton}
            onPress={() => onContainerPress?.('')}
          >
            <Text style={styles.viewMoreText}>
              Voir {activeContainers.length - 3} autre{activeContainers.length - 3 > 1 ? 's' : ''} container{activeContainers.length - 3 > 1 ? 's' : ''}
            </Text>
            <Ionicons name="chevron-forward" size={14} color={Theme.primary[500]} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  badge: {
    backgroundColor: Theme.primary[500],
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },
  cardList: {
    gap: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    ...Theme.shadows.sm,
  },
  statusBar: {
    width: 4,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    gap: 8,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  modeIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  shippingInfo: {
    fontSize: 11,
    color: Theme.neutral[400],
    marginTop: 1,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 16,
    marginLeft: 46,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timelineText: {
    fontSize: 11,
    color: Theme.neutral[400],
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
  },
  viewMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.primary[500],
  },
});

export default ActiveContainers;
