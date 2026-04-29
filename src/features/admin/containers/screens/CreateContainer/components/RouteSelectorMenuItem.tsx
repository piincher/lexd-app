import React from 'react';
import { StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
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
}) => (
  <Menu.Item
    onPress={onPress}
    title={route.name}
    leadingIcon={isSelected ? 'check' : undefined}
    titleStyle={isSelected ? styles.selectedTitle : undefined}
    style={styles.routeMenuItem}
  />
);

const styles = StyleSheet.create({
  selectedTitle: {
    color: Theme.primary[600],
    fontWeight: '600',
  },
  routeMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
});
