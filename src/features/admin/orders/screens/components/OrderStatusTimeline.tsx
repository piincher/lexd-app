import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './OrderStatusTimeline.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface OrderStatusTimelineProps {
  order: any;
  routeData: any;
  onStatusUpdate?: (status: string) => void;
}

const STATUS_ORDER = [
  { key: 'Order arrived at warehouse', label: 'Arrived at Warehouse', icon: 'warehouse' },
  { key: 'Order in Processing', label: 'Processing', icon: 'cog' },
  { key: 'Order in Transit', label: 'In Transit', icon: 'truck-delivery' },
  { key: 'Order in Arrived', label: 'Arrived', icon: 'map-marker-check' },
  { key: 'Delivered', label: 'Delivered', icon: 'package-check' },
];

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({ 
  order, 
  routeData,
  onStatusUpdate 
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const currentStatus = order?.currentStatus || 'Order arrived at warehouse';
  const currentIndex = STATUS_ORDER.findIndex(s => s.key === currentStatus);

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="routes" size={22} color={colors.primary.main} />
        <Text style={styles.title}>Shipping Timeline</Text>
      </View>

      <View style={styles.timeline}>
        {STATUS_ORDER.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          const isDelivered = status.key === 'Delivered';
          const canPress = onStatusUpdate && !isDelivered;
          
          return (
            <TouchableOpacity 
              key={status.key}
              style={styles.timelineItem}
              onPress={() => canPress && onStatusUpdate(status.key)}
              activeOpacity={canPress ? 0.7 : 1}
              disabled={!canPress}
            >
              {/* Connector Line */}
              {index > 0 && (
                <View style={[
                  styles.connector,
                  isCompleted && styles.connectorCompleted
                ]} />
              )}
              
              {/* Status Circle */}
              <View style={[
                styles.statusCircle,
                isCompleted && styles.statusCircleCompleted,
                isCurrent && styles.statusCircleCurrent
              ]}>
                <MaterialCommunityIcons 
                  name={isCompleted ? 'check' : status.icon as any} 
                  size={16} 
                  color={isCompleted ? colors.text.inverse : colors.text.secondary} 
                />
              </View>

              {/* Status Label */}
              <View style={styles.statusContent}>
                <Text style={[
                  styles.statusLabel,
                  isCompleted && styles.statusLabelCompleted,
                  isCurrent && styles.statusLabelCurrent
                ]}>
                  {status.label}
                </Text>
                {isCurrent && (
                  <Text style={styles.currentBadge}>Current</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Current Location */}
      {order?.route && order.route.length > 0 && (
        <View style={styles.locationSection}>
          <Text style={styles.locationLabel}>Current Location</Text>
          <View style={styles.locationCard}>
            <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary.main} />
            <Text style={styles.locationText}>
              {order.route[order.route.length - 1]?.coordinates?.[0]?.location || 'Unknown'}
            </Text>
          </View>
        </View>
      )}
    </Surface>
  );
};

export default OrderStatusTimeline;
