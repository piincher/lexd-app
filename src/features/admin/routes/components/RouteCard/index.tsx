/**
 * RouteCard - Individual route card component
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Route, SHIPPING_MODE_COLORS } from '../../types';
import { styles } from './RouteCard.styles';

interface RouteCardProps {
  route: Route;
  onPress: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onPress }) => {
  const { colors } = useAppTheme();
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
                  color={colors.text.inverse}
                />
              </View>
              <Text style={styles.routeName} numberOfLines={1}>
                {route.name}
              </Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: route.isActive ? Theme.colors.feedback.successBg : Theme.colors.background.paper }
            ]}>
              <Text style={[
                styles.statusText,
                { color: route.isActive ? Theme.colors.status.success : Theme.colors.text.secondary }
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

export default RouteCard;
