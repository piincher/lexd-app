import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, HelperText } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { Route } from '../../../types';
import { RouteSelectorMenuItem } from './RouteSelectorMenuItem';
import { RouteSelectorNoRoutes } from './RouteSelectorNoRoutes';

interface RouteSelectorDropdownProps {
  showRouteMenu: boolean;
  setShowRouteMenu: (value: boolean) => void;
  routes: Route[];
  isLoading: boolean;
  selectedRouteId: string;
  onSelectRoute: (route: Route) => void;
  isError: boolean;
  error?: string;
  onCreateRoute: () => void;
}

export const RouteSelectorDropdown: React.FC<RouteSelectorDropdownProps> = ({
  showRouteMenu,
  setShowRouteMenu,
  routes,
  isLoading,
  selectedRouteId,
  onSelectRoute,
  isError,
  error,
  onCreateRoute,
}) => {
  return (
    <>
      <Menu
        visible={showRouteMenu}
        onDismiss={() => setShowRouteMenu(false)}
        anchor={
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              !!error && styles.dropdownButtonError,
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
                  isLoading && styles.dropdownButtonTextLoading,
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
        {Array.isArray(routes) &&
          routes.map((route) => (
            <RouteSelectorMenuItem
              key={route._id}
              route={route}
              isSelected={selectedRouteId === route._id}
              onPress={() => {
                onSelectRoute(route);
                setShowRouteMenu(false);
              }}
            />
          ))}
      </Menu>

      {isError && (
        <HelperText type="error">
          Erreur lors du chargement des routes
        </HelperText>
      )}

      {!isLoading && routes.length === 0 && !isError && (
        <RouteSelectorNoRoutes onCreateRoute={onCreateRoute} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  dropdownButtonTextLoading: {
    color: Theme.neutral[400],
  },
  menuContent: {
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.colors.background.card,
    width: '85%',
  },
});
