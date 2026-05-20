import React, { useCallback, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton, Menu, SegmentedButtons, Switch, TextInput } from 'react-native-paper';
import type { RouteWaypointDraft } from '@src/features/admin/routes/types';
import { KNOWN_PORTS, SEGMENT_TYPES, WAYPOINT_TYPES } from './routeWaypointOptions';
import { createStyles } from './WaypointEditorCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

const PRIMARY_WAYPOINT_TYPES = WAYPOINT_TYPES.slice(0, 3);
const SECONDARY_WAYPOINT_TYPES = WAYPOINT_TYPES.slice(3);

interface WaypointEditorCardProps {
  waypoint: RouteWaypointDraft;
  index: number;
  total: number;
  portMenuVisible: boolean;
  onTogglePortMenu: (index: number | null) => void;
  onChange: (index: number, waypoint: RouteWaypointDraft) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onRemove: (index: number) => void;
}

export const WaypointEditorCard: React.FC<WaypointEditorCardProps> = ({
  waypoint,
  index,
  total,
  portMenuVisible,
  onTogglePortMenu,
  onChange,
  onMove,
  onRemove,
}) => {
  const patchWaypoint = useCallback((patch: Partial<RouteWaypointDraft>) => {
    onChange(index, { ...waypoint, ...patch });
  }, [index, onChange, waypoint]);

  const patchLocation = useCallback((patch: Partial<RouteWaypointDraft['location']>) => {
    patchWaypoint({ location: { ...waypoint.location, ...patch } });
  }, [patchWaypoint, waypoint.location]);

  const handleSelectPort = useCallback((port: typeof KNOWN_PORTS[number]) => {
    onChange(index, {
      ...waypoint,
      location: {
        ...waypoint.location,
        city: port.city,
        country: port.country,
        countryCode: port.countryCode,
        portCode: port.portCode,
      },
      terminal: port.terminal,
      type: port.label === 'Bamako' ? 'WAREHOUSE' : 'PORT',
      segmentType: port.label === 'Bamako' ? 'WAREHOUSE' : 'SEA',
      description: index === 0 ? `Départ - ${port.label}` : `Transit - ${port.label}`,
    });
    onTogglePortMenu(null);
  }, [index, onChange, onTogglePortMenu, waypoint]);

  const { colors, isDark } = useAppTheme();

  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.indexBadge}>
          <Text style={styles.indexText}>{index + 1}</Text>
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.title} numberOfLines={2}>{waypoint.location.city || 'Nouvelle escale'}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{waypoint.location.portCode || waypoint.segmentType}</Text>
        </View>
        <View style={styles.actions}>
          <IconButton icon="chevron-up" size={18} disabled={index === 0} onPress={() => onMove(index, -1)} style={styles.actionButton} />
          <IconButton icon="chevron-down" size={18} disabled={index === total - 1} onPress={() => onMove(index, 1)} style={styles.actionButton} />
          <IconButton icon="trash-can-outline" size={18} iconColor={colors.status.error} onPress={() => onRemove(index)} style={styles.actionButton} />
        </View>
      </View>

      <Menu
        visible={portMenuVisible}
        onDismiss={() => onTogglePortMenu(null)}
        anchor={
          <TextInput
            mode="outlined"
            label="Port ou ville"
            value={waypoint.location.city}
            onChangeText={(city) => patchLocation({ city })}
            right={<TextInput.Icon icon="menu-down" onPress={() => onTogglePortMenu(index)} />}
            style={styles.input}
            onFocus={scrollToEnd}
          />
        }
      >
        {KNOWN_PORTS.map((port) => (
          <Menu.Item key={port.portCode} title={port.label} onPress={() => handleSelectPort(port)} />
        ))}
      </Menu>

      <View style={styles.twoColumn}>
        <TextInput mode="outlined" label="Pays" value={waypoint.location.country} onChangeText={(country) => patchLocation({ country })} style={styles.flexInput} onFocus={scrollToEnd} />
        <TextInput mode="outlined" label="Code" value={waypoint.location.portCode || ''} onChangeText={(portCode) => patchLocation({ portCode })} autoCapitalize="characters" style={styles.flexInput} onFocus={scrollToEnd} />
      </View>

      <SegmentedButtons
        value={waypoint.type}
        onValueChange={(type) => patchWaypoint({ type: type as RouteWaypointDraft['type'] })}
        buttons={PRIMARY_WAYPOINT_TYPES.map(({ label, value }) => ({ label, value }))}
        style={styles.segmented}
      />
      <SegmentedButtons
        value={waypoint.type}
        onValueChange={(type) => patchWaypoint({ type: type as RouteWaypointDraft['type'] })}
        buttons={SECONDARY_WAYPOINT_TYPES.map(({ label, value }) => ({ label, value }))}
        style={styles.segmented}
      />
      <SegmentedButtons
        value={waypoint.segmentType || 'SEA'}
        onValueChange={(segmentType) => patchWaypoint({ segmentType: segmentType as RouteWaypointDraft['segmentType'] })}
        buttons={SEGMENT_TYPES.map(({ label, value }) => ({ label, value }))}
        style={styles.segmented}
      />

      <View style={styles.twoColumn}>
        <TextInput mode="outlined" label="Jour" value={String(waypoint.estimatedDaysFromStart ?? 0)} onChangeText={(value) => patchWaypoint({ estimatedDaysFromStart: Number(value) || 0 })} keyboardType="number-pad" style={styles.dayInput} onFocus={scrollToEnd} />
        <TextInput mode="outlined" label="Terminal" value={waypoint.terminal || ''} onChangeText={(terminal) => patchWaypoint({ terminal })} style={styles.flexInput} onFocus={scrollToEnd} />
      </View>

      <TextInput mode="outlined" label="Description" value={waypoint.description} onChangeText={(description) => patchWaypoint({ description })} style={styles.input} onFocus={scrollToEnd} />

      <View style={styles.switchRow}>
        <View style={styles.switchItem}>
          <Text style={styles.switchText}>Arrivée</Text>
          <Switch value={waypoint.notifyOnArrival ?? true} onValueChange={(notifyOnArrival) => patchWaypoint({ notifyOnArrival })} />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.switchText}>Départ</Text>
          <Switch value={waypoint.notifyOnDeparture ?? false} onValueChange={(notifyOnDeparture) => patchWaypoint({ notifyOnDeparture })} />
        </View>
      </View>
    </View>
  );
};
