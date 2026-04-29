import React from 'react';
import { Menu, Divider } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AirwayBillStatus } from '../../types';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  anchor: React.ReactNode;
  nextStatuses: AirwayBillStatus[];
  statusLabels: Record<AirwayBillStatus, string>;
  statusColors: Record<AirwayBillStatus, string>;
  onStatusChange: (status: AirwayBillStatus) => void;
  onDelete: () => void;
  disabled?: boolean;
}

export const AirwayBillStatusMenu: React.FC<Props> = ({
  visible,
  onDismiss,
  anchor,
  nextStatuses,
  statusLabels,
  onStatusChange,
  onDelete,
  disabled = false,
}) => {
  const { colors } = useAppTheme();

  return (
    <Menu visible={visible} onDismiss={onDismiss} anchor={anchor}>
      {nextStatuses.map((s) => (
        <Menu.Item
          key={s}
          disabled={disabled}
          onPress={() => onStatusChange(s)}
          title={`Passer à: ${statusLabels[s]}`}
        />
      ))}
      {nextStatuses.length > 0 && <Divider />}
      <Menu.Item
        disabled={disabled}
        onPress={onDelete}
        title="Supprimer définitivement"
        titleStyle={{ color: colors.status.error }}
      />
    </Menu>
  );
};
