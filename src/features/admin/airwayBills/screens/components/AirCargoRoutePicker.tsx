import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { AirCargoRouteOption } from '../../types';

interface Props {
  routes: AirCargoRouteOption[];
  selectedRouteKey: string;
  onSelect: (routeKey: string) => void;
}

export const AirCargoRoutePicker: React.FC<Props> = ({ routes, selectedRouteKey, onSelect }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Route aérienne</Text>
    {routes.map((route) => {
      const selected = route.key === selectedRouteKey;
      return (
        <TouchableOpacity
          key={route.key}
          activeOpacity={0.85}
          onPress={() => onSelect(route.key)}
          style={[styles.option, selected && styles.optionSelected]}
        >
          <View style={[styles.iconWrap, selected && styles.iconWrapSelected]}>
            <Ionicons name={selected ? 'checkmark' : 'airplane'} size={18} color={selected ? '#fff' : Theme.colors.primary.main} />
          </View>
          <View style={styles.routeBody}>
            <Text style={styles.routeName} numberOfLines={2}>{route.name}</Text>
            <Text style={styles.routePath} numberOfLines={2}>
              {route.origin} → {route.destination}
            </Text>
            <Text style={styles.routeDescription} numberOfLines={3}>{route.description}</Text>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: Theme.spacing.md },
  label: { fontSize: 13, fontWeight: '700', color: Theme.neutral[700], marginBottom: 8 },
  option: {
    minHeight: 72,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.background.card,
  },
  optionSelected: { borderColor: Theme.colors.primary.main, backgroundColor: '#EAF7F0' },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2F7',
  },
  iconWrapSelected: { backgroundColor: Theme.colors.primary.main },
  routeBody: { flex: 1 },
  routeName: { fontSize: 14, fontWeight: '800', color: Theme.neutral[900] },
  routePath: { fontSize: 12, fontWeight: '700', color: Theme.neutral[600], marginTop: 4 },
  routeDescription: { fontSize: 12, color: Theme.neutral[500], marginTop: 4, lineHeight: 17 },
});

export default AirCargoRoutePicker;
