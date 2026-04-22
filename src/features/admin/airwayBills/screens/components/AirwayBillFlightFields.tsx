import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface AirwayBillFlightFieldsProps {
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  notes: string;
  onFlightNumberChange: (value: string) => void;
  onAirlineChange: (value: string) => void;
  onDepartureAirportChange: (value: string) => void;
  onArrivalAirportChange: (value: string) => void;
  onNotesChange: (value: string) => void;
}

export const AirwayBillFlightFields: React.FC<AirwayBillFlightFieldsProps> = ({
  flightNumber,
  airline,
  departureAirport,
  arrivalAirport,
  notes,
  onFlightNumberChange,
  onAirlineChange,
  onDepartureAirportChange,
  onArrivalAirportChange,
  onNotesChange,
}) => (
  <>
    <TextInput
      label="Numéro de vol"
      value={flightNumber}
      onChangeText={onFlightNumberChange}
      style={styles.input}
      mode="outlined"
      autoCapitalize="characters"
    />
    <TextInput
      label="Compagnie aérienne"
      value={airline}
      onChangeText={onAirlineChange}
      style={styles.input}
      mode="outlined"
    />
    <View style={styles.row}>
      <TextInput
        label="Départ (IATA)"
        value={departureAirport}
        onChangeText={onDepartureAirportChange}
        style={[styles.input, styles.half]}
        mode="outlined"
        autoCapitalize="characters"
        maxLength={3}
      />
      <TextInput
        label="Arrivée (IATA)"
        value={arrivalAirport}
        onChangeText={onArrivalAirportChange}
        style={[styles.input, styles.half]}
        mode="outlined"
        autoCapitalize="characters"
        maxLength={3}
      />
    </View>
    <TextInput
      label="Notes"
      value={notes}
      onChangeText={onNotesChange}
      style={styles.input}
      mode="outlined"
      multiline
      numberOfLines={3}
    />
  </>
);

const styles = StyleSheet.create({
  input: { marginBottom: Theme.spacing.md, backgroundColor: Theme.colors.background.card },
  row: { flexDirection: 'row', gap: Theme.spacing.md },
  half: { flex: 1 },
});

export default AirwayBillFlightFields;
