/**
 * CargoBagStatusMenu - Menu for changing cargo bag status
 */

import React from 'react';
import { Menu, Divider } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CargoBagStatus, CARGO_BAG_STATUS_TRANSITIONS } from '../../types';

interface CargoBagStatusMenuProps {
  visible: boolean;
  onDismiss: () => void;
  anchor: React.ReactNode;
  currentStatus: CargoBagStatus;
  onStatusChange: (status: CargoBagStatus) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

const STATUS_LABELS: Record<CargoBagStatus, string> = {
  PACKED: 'Emballé',
  CHECKED_IN: 'Enregistré',
  LOADED: 'Chargé',
  IN_TRANSIT: 'En transit',
  ARRIVED: 'Arrivé',
  CLEARED: 'Dédouané',
};

export const CargoBagStatusMenu: React.FC<CargoBagStatusMenuProps> = ({
  visible,
  onDismiss,
  anchor,
  currentStatus,
  onStatusChange,
  onDelete,
  disabled = false,
}) => {
  const { colors } = useAppTheme();
  const nextStatuses = CARGO_BAG_STATUS_TRANSITIONS[currentStatus] || [];

  return (
    <Menu visible={visible} onDismiss={onDismiss} anchor={anchor}>
      {nextStatuses.map((status) => (
        <Menu.Item
          key={status}
          disabled={disabled}
          onPress={() => onStatusChange(status)}
          title={`Passer à: ${STATUS_LABELS[status]}`}
        />
      ))}
      {nextStatuses.length > 0 && onDelete && <Divider />}
      {onDelete && (
        <Menu.Item
          disabled={disabled}
          onPress={onDelete}
          title="Supprimer"
          titleStyle={{ color: colors.status.error }}
        />
      )}
    </Menu>
  );
};

export default CargoBagStatusMenu;
