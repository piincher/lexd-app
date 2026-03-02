/**
 * Ticket Type Selector Component
 * Dropdown selector for ticket types with icons
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TicketType, TICKET_TYPE_LABELS, TICKET_TYPE_ICONS } from '../types';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

interface TicketTypeSelectorProps {
  value: TicketType | null;
  onSelect: (type: TicketType) => void;
  disabled?: boolean;
}

const TICKET_TYPES: TicketType[] = ['ORDER_ISSUE', 'PAYMENT_ISSUE', 'DELIVERY_ISSUE', 'GENERAL'];

export const TicketTypeSelector: React.FC<TicketTypeSelectorProps> = ({
  value,
  onSelect,
  disabled = false,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (type: TicketType) => {
    onSelect(type);
    closeMenu();
  };

  const selectedLabel = value ? TICKET_TYPE_LABELS[value] : 'Sélectionner un type';
  const selectedIcon = value ? TICKET_TYPE_ICONS[value] : 'help-circle';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type de demande</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            disabled={disabled}
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon={({ size, color }) => (
              <MaterialCommunityIcons name={selectedIcon as any} size={size} color={color} />
            )}
          >
            {selectedLabel}
          </Button>
        }
        contentStyle={styles.menu}
      >
        {TICKET_TYPES.map((type) => (
          <Menu.Item
            key={type}
            onPress={() => handleSelect(type)}
            title={TICKET_TYPE_LABELS[type]}
            leadingIcon={TICKET_TYPE_ICONS[type]}
            titleStyle={[
              styles.menuItem,
              value === type && { color: theme.colors.primary, fontFamily: Fonts.meduim },
            ]}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: COLORS.DimGray,
    marginBottom: 8,
  },
  button: {
    borderColor: COLORS.Silver,
    borderRadius: 8,
  },
  buttonContent: {
    justifyContent: 'flex-start',
    height: 48,
  },
  menu: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: 280,
  },
  menuItem: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
});

export default TicketTypeSelector;
