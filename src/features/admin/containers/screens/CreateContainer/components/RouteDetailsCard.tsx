import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Route } from '../../../types';

interface RouteDetailsCardProps {
  route: Route;
}

export const RouteDetailsCard: React.FC<RouteDetailsCardProps> = ({ route }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  if (!route?.description) return null;

  return (
    <View style={styles.routeDescriptionContainer}>
      <Ionicons name="information-circle" size={16} color={colors.text.secondary} />
      <Text style={styles.routeDescriptionText}>
        {route.description}
      </Text>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  routeDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Theme.spacing.sm,
    marginTop: -Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: colors.background.elevated,
    borderRadius: Theme.radius.md,
  },
  routeDescriptionText: {
    flex: 1,
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
});
