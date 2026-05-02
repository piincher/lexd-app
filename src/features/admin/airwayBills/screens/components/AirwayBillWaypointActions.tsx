import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AirwayBillWaypointStatus } from '../../types';
import { getAirwayBillWaypointActionLabel } from '../../constants';

interface Props {
  currentStatus: AirwayBillWaypointStatus;
  disabled?: boolean;
  onSelectStatus: (status: AirwayBillWaypointStatus) => void;
}

const ACTIONS: AirwayBillWaypointStatus[] = ['IN_PROGRESS', 'COMPLETED', 'DELAYED'];

export const AirwayBillWaypointActions: React.FC<Props> = ({
  currentStatus,
  disabled = false,
  onSelectStatus,
}) => {
  const { colors } = useAppTheme();
  const actions = ACTIONS.filter((status) => status !== currentStatus);

  return (
    <View style={styles.row}>
      {actions.map((status) => (
        <Button
          key={status}
          mode={status === 'COMPLETED' ? 'contained-tonal' : 'outlined'}
          compact
          disabled={disabled}
          textColor={status === 'DELAYED' ? colors.status.warning : undefined}
          onPress={() => onSelectStatus(status)}
          style={styles.button}
          labelStyle={styles.label}
        >
          {getAirwayBillWaypointActionLabel(status)}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  button: { minHeight: 40, borderRadius: 10 },
  label: { fontSize: 11, fontWeight: '800' },
});

export default AirwayBillWaypointActions;
