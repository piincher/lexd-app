/**
 * CreateContainerScreen - Create new container with form validation
 */
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import { useCreateContainerScreenUI } from './hooks/useCreateContainerScreenUI';
import {
  Header, RouteSelector, RouteDetailsCard,
  ConsigneeSelector, ContainerNumberInput, BookingReferenceInput,
  SubmitButton, LoadingState,
} from './CreateContainer/components';
import { createStyles } from './CreateContainer/CreateContainerScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const CreateContainerScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    formData, errors, selectedConsigneeName, selectedRoute, consigneeSearchQuery,
    showConsigneeDropdown, showRouteMenu, consignees, routes, filteredConsignees,
    isLoadingConsignees, isLoadingRoutes, isRoutesError, createMutation,
    handleSelectRoute, handleClearRoute, handleSelectConsignee,
    handleClearConsignee, handleSubmit, setConsigneeSearchQuery,
    setShowConsigneeDropdown, setShowRouteMenu, handlers,
  } = useCreateContainerScreenUI();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <Header onBack={handlers.handleBack} />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
          <Card style={styles.formCard}>
            <Card.Content style={styles.formContent}>
              <RouteSelector selectedRouteId={formData.routeId} selectedRoute={selectedRoute} routes={routes} isLoading={isLoadingRoutes} isError={isRoutesError} error={errors.routeId} onSelectRoute={handleSelectRoute} onClearRoute={handleClearRoute} onCreateRoute={handlers.handleCreateRoute} />
              {selectedRoute && <RouteDetailsCard route={selectedRoute} />}
              <ConsigneeSelector selectedConsigneeId={formData.consigneeId} selectedConsigneeName={selectedConsigneeName} consignees={filteredConsignees} searchQuery={consigneeSearchQuery} showDropdown={showConsigneeDropdown} isLoading={isLoadingConsignees} error={errors.consigneeId} onSearchChange={setConsigneeSearchQuery} onToggleDropdown={setShowConsigneeDropdown} onSelectConsignee={handleSelectConsignee} onClearConsignee={handleClearConsignee} />
              <ContainerNumberInput value={formData.actualContainerNumber} error={errors.actualContainerNumber} onChangeText={handlers.handleContainerNumberChange} />
              <BookingReferenceInput value={formData.bookingReference} onChangeText={handlers.handleBookingReferenceChange} />
              {errors.submit && <Text style={styles.errorText}>{errors.submit}</Text>}
              <SubmitButton isLoading={createMutation.isPending} isDisabled={!formData.routeId || !formData.consigneeId} onSubmit={handleSubmit} />
            </Card.Content>
          </Card>
        </ScrollView>
        <LoadingState visible={createMutation.isPending} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateContainerScreen;
