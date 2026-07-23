import React from 'react';
import { View } from 'react-native';
import { Menu, TextInput } from 'react-native-paper';
import type { RouteWaypointDraft } from '@src/features/admin/routes/types';
import { KNOWN_PORTS } from './routeWaypointOptions';
import { createStyles } from './WaypointEditorCard.styles';

interface WaypointLocationFieldsProps {
  waypoint: RouteWaypointDraft;
  portMenuVisible: boolean;
  onTogglePortMenu: (visible: boolean) => void;
  onSelectPort: (port: typeof KNOWN_PORTS[number]) => void;
  onPatchLocation: (patch: Partial<RouteWaypointDraft['location']>) => void;
  onFocus: () => void;
  styles: ReturnType<typeof createStyles>;
}

export const WaypointLocationFields: React.FC<WaypointLocationFieldsProps> = ({
  waypoint, portMenuVisible, onTogglePortMenu, onSelectPort, onPatchLocation, onFocus, styles,
}) => (
  <>
    <Menu
      visible={portMenuVisible}
      onDismiss={() => onTogglePortMenu(false)}
      anchor={
        <TextInput
          mode="outlined"
          label="Port ou ville"
          value={waypoint.location.city}
          onChangeText={(city) => onPatchLocation({ city })}
          right={<TextInput.Icon icon="menu-down" onPress={() => onTogglePortMenu(true)} />}
          style={styles.input}
          onFocus={onFocus}
        />
      }
    >
      {KNOWN_PORTS.map((port) => (
        <Menu.Item key={port.portCode} title={port.label} onPress={() => onSelectPort(port)} />
      ))}
    </Menu>

    <View style={styles.twoColumn}>
      <TextInput
        mode="outlined" label="Pays" value={waypoint.location.country}
        onChangeText={(country) => onPatchLocation({ country })} style={styles.flexInput} onFocus={onFocus}
      />
      <TextInput
        mode="outlined" label="Code pays ISO" value={waypoint.location.countryCode || ''}
        onChangeText={(countryCode) => onPatchLocation({ countryCode: countryCode.toUpperCase() })}
        autoCapitalize="characters" autoCorrect={false} maxLength={2} style={styles.flexInput} onFocus={onFocus}
      />
    </View>
    <TextInput
      mode="outlined" label="Code port (optionnel)" value={waypoint.location.portCode || ''}
      onChangeText={(portCode) => onPatchLocation({ portCode: portCode.toUpperCase() })}
      autoCapitalize="characters" autoCorrect={false} style={styles.input} onFocus={onFocus}
    />
  </>
);
