/**
 * CreateAirwayBillScreen - Form to create a new airway bill
 */

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@src/constants/Theme';
import { AirwayBillFlightFields } from './components/AirwayBillFlightFields';
import { ConsigneePicker } from './components/ConsigneePicker';
import { AirCargoRoutePicker } from './components/AirCargoRoutePicker';
import { useCreateAirwayBillScreen } from './hooks/useCreateAirwayBillScreen';

export const CreateAirwayBillScreen: React.FC = () => {
  const { values, setters, routeOptions, consignee, isSubmitting, handleSubmit } = useCreateAirwayBillScreen();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Nouvelle lettre de transport</Text>
        <Text style={styles.helper}>
          Le numéro AWB sera généré automatiquement. Les informations du vol peuvent être ajoutées maintenant ou plus tard.
        </Text>
        <ConsigneePicker
          selectedConsignee={consignee.selected}
          consignees={consignee.consignees}
          searchQuery={consignee.searchQuery}
          showDropdown={consignee.showDropdown}
          isLoading={consignee.isLoading}
          onSearchChange={consignee.handleSearchChange}
          onToggleDropdown={consignee.setShowDropdown}
          onSelect={consignee.handleSelect}
          onClear={consignee.handleClear}
        />
        <AirCargoRoutePicker
          routes={routeOptions}
          selectedRouteKey={values.selectedRouteKey}
          onSelect={setters.setSelectedRouteKey}
        />
        <AirwayBillFlightFields
          flightNumber={values.flightNumber}
          airline={values.airline}
          departureAirport={values.departureAirport}
          arrivalAirport={values.arrivalAirport}
          notes={values.notes}
          onFlightNumberChange={setters.setFlightNumber}
          onAirlineChange={setters.setAirline}
          onDepartureAirportChange={setters.setDepartureAirport}
          onArrivalAirportChange={setters.setArrivalAirport}
          onNotesChange={setters.setNotes}
        />
        <TextInput
          label="Capacité poids (kg)"
          value={String(values.capacityWeight)}
          onChangeText={(text) => setters.setCapacityWeight(Number(text.replace(/[^0-9]/g, '')) || 0)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.submitButton}
        >
          Créer la lettre de transport
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background.card },
  content: { padding: Theme.spacing.lg, paddingBottom: 60 },
  title: { fontSize: 22, fontWeight: '800', color: Theme.neutral[900], marginBottom: Theme.spacing.lg },
  helper: { fontSize: 13, color: Theme.neutral[500], marginBottom: Theme.spacing.md, lineHeight: 18 },
  input: { marginBottom: Theme.spacing.md, backgroundColor: Theme.colors.background.card },
  submitButton: { marginTop: Theme.spacing.lg, borderRadius: Theme.radius.lg },
});

export default CreateAirwayBillScreen;
