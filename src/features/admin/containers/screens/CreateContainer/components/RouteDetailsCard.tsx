import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Route } from '../../../types';

interface RouteDetailsCardProps {
  route: Route;
}

export const RouteDetailsCard: React.FC<RouteDetailsCardProps> = ({ route }) => {
  if (!route?.description) return null;

  return (
    <View style={styles.routeDescriptionContainer}>
      <Ionicons name="information-circle" size={16} color={Theme.neutral[500]} />
      <Text style={styles.routeDescriptionText}>
        {route.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  routeDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Theme.spacing.sm,
    marginTop: -Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.md,
  },
  routeDescriptionText: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[600],
    lineHeight: 18,
  },
});
