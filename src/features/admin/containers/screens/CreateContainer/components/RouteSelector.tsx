import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HelperText } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Route } from '../../../types';
import { RouteSelectorSelectedRoute } from './RouteSelectorSelectedRoute';
import { RouteSelectorDropdown } from './RouteSelectorDropdown';

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
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (selectedRouteId && selectedRoute) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Route <Text style={styles.required}>*</Text>
        </Text>
        <RouteSelectorSelectedRoute
          selectedRoute={selectedRoute}
          onClearRoute={onClearRoute}
        />
        {error && (
          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Route <Text style={styles.required}>*</Text>
      </Text>
      <RouteSelectorDropdown
        showRouteMenu={showRouteMenu}
        setShowRouteMenu={setShowRouteMenu}
        routes={routes}
        isLoading={isLoading}
        selectedRouteId={selectedRouteId}
        onSelectRoute={onSelectRoute}
        isError={isError}
        error={error}
        onCreateRoute={onCreateRoute}
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  required: {
    color: colors.status.error,
  },
});
