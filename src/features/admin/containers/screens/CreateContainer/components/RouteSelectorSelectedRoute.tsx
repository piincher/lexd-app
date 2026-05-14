import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Route } from '../../../types';
import { Theme } from '@src/shared/constants/Theme';

interface RouteSelectorSelectedRouteProps {
  selectedRoute: Route;
  onClearRoute: () => void;
}

export const RouteSelectorSelectedRoute: React.FC<RouteSelectorSelectedRouteProps> = ({
  selectedRoute,
  onClearRoute,
}) => {
  const { colors } = useAppTheme();
  return (
  <View style={styles.selectedRouteContainer}>
    <View style={styles.selectedRouteContent}>
      <View style={styles.selectedRouteIcon}>
        <Ionicons name="git-branch" size={24} color={colors.text.inverse} />
      </View>
      <View style={styles.selectedRouteInfo}>
        <Text style={styles.selectedRouteName}>
          {selectedRoute?.name || 'Route sélectionnée'}
        </Text>
        <View style={styles.selectedRouteDetails}>
          <Text style={styles.selectedRouteMeta}>
            <Ionicons name="time" size={12} color={Theme.primary[600]} />{' '}
            {selectedRoute?.estimatedTransitDays || '--'} jours
          </Text>
          {selectedRoute && (
            <Text style={styles.selectedRoutePath}>
              {typeof selectedRoute.origin === 'string'
                ? selectedRoute.origin
                : (selectedRoute.origin as any)?.city || 'N/A'}{' '}
              →{' '}
              {typeof selectedRoute.destination === 'string'
                ? selectedRoute.destination
                : (selectedRoute.destination as any)?.city || 'N/A'}
            </Text>
          )}
        </View>
      </View>
    </View>
    <TouchableOpacity
      style={styles.clearRouteButton}
      onPress={onClearRoute}
    >
      <Ionicons name="close-circle" size={24} color={Theme.status.error} />
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  selectedRouteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.primary[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.primary[200],
  },
  selectedRouteContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedRouteIcon: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRouteInfo: {
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  selectedRouteName: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  selectedRouteDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
    marginTop: 2,
  },
  selectedRouteMeta: {
    fontSize: 13,
    color: Theme.primary[600],
    fontWeight: '500',
  },
  selectedRoutePath: {
    fontSize: 13,
    color: Theme.neutral[500],
  },
  clearRouteButton: {
    padding: Theme.spacing.xs,
  },
});
