import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface RouteSelectorNoRoutesProps {
  onCreateRoute: () => void;
}

export const RouteSelectorNoRoutes: React.FC<RouteSelectorNoRoutesProps> = ({
  onCreateRoute,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
  <View style={styles.noRoutesContainer}>
    <Ionicons name="alert-circle" size={16} color={colors.status.warning} />
    <Text style={styles.noRoutesText}>
      Aucune route active pour ce mode.{'\n'}
      Veuillez créer une route d'abord.
    </Text>
    <TouchableOpacity
      style={styles.createRouteButton}
      onPress={onCreateRoute}
      activeOpacity={0.8}
    >
      <Ionicons name="add-circle" size={16} color={colors.text.inverse} />
      <Text style={styles.createRouteButtonText}>Créer une route</Text>
    </TouchableOpacity>
  </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  noRoutesContainer: {
    marginTop: Theme.spacing.sm,
    padding: Theme.spacing.md,
    backgroundColor: colors.status.warning + '15',
    borderRadius: Theme.radius.md,
    gap: Theme.spacing.sm,
  },
  noRoutesText: {
    fontSize: 13,
    color: colors.text.primary,
    lineHeight: 18,
    marginLeft: Theme.spacing.lg,
  },
  createRouteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
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
    color: colors.text.inverse,
  },
});
