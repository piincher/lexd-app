import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
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
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => StyleSheet.create({
    input: { marginBottom: Theme.spacing.md, backgroundColor: colors.background.card },
    row: { flexDirection: 'row', gap: Theme.spacing.md },
    half: { flex: 1 },
  }), [colors, isDark]);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };
  return (
  <>
    <TextInput
      label="Numéro de vol"
      value={flightNumber}
      onChangeText={onFlightNumberChange}
      style={styles.input}
      mode="outlined"
      autoCapitalize="characters"
      onFocus={scrollToEnd}
    />
    <TextInput
      label="Compagnie aérienne"
      value={airline}
      onChangeText={onAirlineChange}
      style={styles.input}
      mode="outlined"
      onFocus={scrollToEnd}
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
        onFocus={scrollToEnd}
      />
      <TextInput
        label="Arrivée (IATA)"
        value={arrivalAirport}
        onChangeText={onArrivalAirportChange}
        style={[styles.input, styles.half]}
        mode="outlined"
        autoCapitalize="characters"
        maxLength={3}
        onFocus={scrollToEnd}
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
      onFocus={scrollToEnd}
    />
  </>
  );
};

export default AirwayBillFlightFields;
