/**
 * RouteListItem - Individual route list item component
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Card, Menu, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './RouteListItem.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface Route {
  id: string;
  origin: string;
  destination: string;
  shippingMode: 'air' | 'sea';
  price: number;
  schedule: string;
  stops: number;
}

interface RouteListItemProps {
  route: Route;
  onPress: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const MODE_CONFIG = (colors: any) => ({
  air: { icon: 'airplane', color: colors.primary.main },
  sea: { icon: 'boat', color: colors.status.info },
});

export const RouteListItem: React.FC<RouteListItemProps> = ({ route, onPress, onEdit, onDelete }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const mode = MODE_CONFIG(colors)[route.shippingMode];
  const closeMenu = () => setMenuVisible(false);

  return (
    <TouchableOpacity onPress={() => onPress(route.id)} activeOpacity={0.8}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.modeIcon, { backgroundColor: mode.color }]}>
              <Ionicons name={mode.icon as any} size={14} color={colors.text.inverse} />
            </View>
            <View style={styles.pathContainer}>
              <Text style={styles.location} numberOfLines={1}>{route.origin}</Text>
              <Ionicons name="arrow-forward" size={14} color={colors.neutral[400]} />
              <Text style={styles.location} numberOfLines={1}>{route.destination}</Text>
            </View>
            {(onEdit || onDelete) && (
              <Menu visible={menuVisible} onDismiss={closeMenu}
                anchor={<IconButton icon="dots-vertical" size={20} onPress={() => setMenuVisible(true)} />}>
                {onEdit && <Menu.Item onPress={() => { closeMenu(); onEdit(route.id); }} title="Modifier" leadingIcon="pencil" />}
                {onDelete && <Menu.Item onPress={() => { closeMenu(); onDelete(route.id); }} title="Supprimer" leadingIcon="delete" />}
              </Menu>
            )}
          </View>
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Ionicons name="cash-outline" size={14} color={colors.neutral[400]} />
              <Text style={styles.detailText}>{route.price.toLocaleString()} XOF</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={14} color={colors.neutral[400]} />
              <Text style={styles.detailText}>{route.schedule}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="flag-outline" size={14} color={colors.neutral[400]} />
              <Text style={styles.detailText}>{route.stops} {route.stops > 1 ? 'escales' : 'escale'}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default RouteListItem;
