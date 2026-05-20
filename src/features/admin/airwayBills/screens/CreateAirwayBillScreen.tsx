/**
 * CreateAirwayBillScreen - Form to create a new airway bill
 */

import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AirwayBillFlightFields } from './components/AirwayBillFlightFields';
import { ConsigneePicker } from './components/ConsigneePicker';
import { AirCargoRoutePicker } from './components/AirCargoRoutePicker';
import { useCreateAirwayBillScreen } from './hooks/useCreateAirwayBillScreen';
import { createStyles } from './CreateAirwayBillScreen.styles';

export const CreateAirwayBillScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { values, setters, routeOptions, consignee, isSubmitting, handleCapacityWeightChange, handleSubmit } = useCreateAirwayBillScreen();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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
          onChangeText={handleCapacityWeightChange}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAirwayBillScreen;
