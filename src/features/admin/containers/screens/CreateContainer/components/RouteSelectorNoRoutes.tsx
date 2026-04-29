import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface RouteSelectorNoRoutesProps {
  onCreateRoute: () => void;
}

export const RouteSelectorNoRoutes: React.FC<RouteSelectorNoRoutesProps> = ({
  onCreateRoute,
}) => (
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
);

const styles = StyleSheet.create({
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
});
