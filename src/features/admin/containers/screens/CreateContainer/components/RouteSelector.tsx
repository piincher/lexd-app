import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, HelperText, ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { Route } from '../../../types';

interface RouteSelectorProps {
  selectedRouteId: string;
  selectedRoute: Route | null;
  routes: Route[];
  isLoading: boolean;
  isError: boolean;
  error?: string;
  onSelectRoute: (route: Route) => void;
  onClearRoute: () => void;
  onCreateRoute: () => void;
}

export const RouteSelector: React.FC<RouteSelectorProps> = ({
  selectedRouteId,
  selectedRoute,
  routes,
  isLoading,
  isError,
  error,
  onSelectRoute,
  onClearRoute,
  onCreateRoute,
}) => {
  const [showRouteMenu, setShowRouteMenu] = React.useState(false);

  const renderRouteItem = (route: Route) => (
    <Menu.Item
      key={route._id}
      onPress={() => {
        onSelectRoute(route);
        setShowRouteMenu(false);
      }}
      title={route.name}
      leadingIcon={selectedRouteId === route._id ? 'check' : undefined}
      titleStyle={
        selectedRouteId === route._id
          ? { color: Theme.primary[600], fontWeight: '600' }
          : undefined
      }
      style={styles.routeMenuItem}
    />
  );

  // Selected route display
  if (selectedRouteId && selectedRoute) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Route <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.selectedRouteContainer}>
          <View style={styles.selectedRouteContent}>
            <View style={styles.selectedRouteIcon}>
              <Ionicons name="git-branch" size={24} color="#FFF" />
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
                      : (selectedRoute.origin as any)?.city || 'N/A'} → {typeof selectedRoute.destination === 'string' 
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
        {error && (
          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>
        )}
      </View>
    );
  }

  // Route selection mode
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Route <Text style={styles.required}>*</Text>
      </Text>
      
      <Menu
        visible={showRouteMenu}
        onDismiss={() => setShowRouteMenu(false)}
        anchor={
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              error && styles.dropdownButtonError,
              isLoading && styles.dropdownButtonLoading,
            ]}
            onPress={() => setShowRouteMenu(true)}
            disabled={isLoading || routes.length === 0}
            activeOpacity={0.8}
          >
            <View style={styles.dropdownButtonContent}>
              <Ionicons
                name="git-branch"
                size={20}
                color={isLoading ? Theme.neutral[300] : Theme.primary[500]}
              />
              <Text
                style={[
                  styles.dropdownButtonText,
                  styles.dropdownButtonPlaceholder,
                  isLoading && { color: Theme.neutral[400] },
                ]}
              >
                {isLoading 
                  ? 'Chargement des routes...' 
                  : routes.length === 0 
                    ? 'Aucune route disponible'
                    : 'Sélectionner une route'}
              </Text>
            </View>
            {!isLoading && routes.length > 0 && (
              <Ionicons
                name={showRouteMenu ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={Theme.neutral[400]}
              />
            )}
          </TouchableOpacity>
        }
        contentStyle={styles.menuContent}
      >
        {Array.isArray(routes) && routes.map(renderRouteItem)}
      </Menu>
      
      {isError && (
        <HelperText type="error">
          Erreur lors du chargement des routes
        </HelperText>
      )}
      
      {!isLoading && routes.length === 0 && !isError && (
        <View style={styles.noRoutesContainer}>
          <Ionicons name="alert-circle" size={16} color={Theme.status.warning} />
          <Text style={styles.noRoutesText}>
            Aucune route active pour ce mode.{'\n'}
            Veuillez créer une route d'abord.
          </Text>
          <TouchableOpacity
            style={styles.createRouteButton}
            onPress={onCreateRoute}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle" size={16} color="#FFF" />
            <Text style={styles.createRouteButtonText}>Créer une route</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  required: {
    color: Theme.status.error,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.background.card,
  },
  dropdownButtonError: {
    borderColor: Theme.status.error,
  },
  dropdownButtonLoading: {
    backgroundColor: Theme.neutral[50],
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  dropdownButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[800],
  },
  dropdownButtonPlaceholder: {
    color: Theme.neutral[400],
  },
  menuContent: {
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.colors.background.card,
    width: '85%',
  },
  routeMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  noRoutesContainer: {
    marginTop: Theme.spacing.sm,
    padding: Theme.spacing.md,
    backgroundColor: '#FEF3C7',
    borderRadius: Theme.radius.md,
    gap: Theme.spacing.sm,
  },
  noRoutesText: {
    fontSize: 13,
    color: Theme.neutral[700],
    lineHeight: 18,
    marginLeft: Theme.spacing.lg,
  },
  createRouteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.primary[500],
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginTop: Theme.spacing.sm,
    marginLeft: Theme.spacing.lg,
    gap: Theme.spacing.xs,
    ...Theme.shadows.sm,
  },
  createRouteButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
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
