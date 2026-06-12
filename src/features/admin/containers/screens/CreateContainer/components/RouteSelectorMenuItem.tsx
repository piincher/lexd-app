import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Route } from '../../../types';

interface RouteSelectorMenuItemProps {
  route: Route;
  isSelected: boolean;
  onPress: () => void;
}

export const RouteSelectorMenuItem: React.FC<RouteSelectorMenuItemProps> = ({
  route,
  isSelected,
  onPress,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <Menu.Item
      onPress={onPress}
      title={route.name}
      leadingIcon={isSelected ? 'check' : undefined}
      titleStyle={isSelected ? styles.selectedTitle : undefined}
      style={styles.routeMenuItem}
    />
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  selectedTitle: {
    color: colors.primary[600],
    fontWeight: '600',
  },
  routeMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
