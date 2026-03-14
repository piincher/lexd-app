/**
 * CreateContainerScreen - Create new container with form validation
 */
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import { useCreateContainerScreen } from './CreateContainer/hooks';
import {
  Header, ShippingModeSelector, RouteSelector, RouteDetailsCard,
  ConsigneeSelector, ContainerNumberInput, BookingReferenceInput,
  SubmitButton, LoadingState,
} from './CreateContainer/components';
import { styles } from './CreateContainer/CreateContainerScreen.styles';

export const CreateContainerScreen: React.FC = () => {
  const {
    formData, errors, selectedConsigneeName, selectedRoute, consigneeSearchQuery,
    showConsigneeDropdown, showRouteMenu, consignees, routes, filteredConsignees,
    isLoadingConsignees, isLoadingRoutes, isRoutesError, createMutation, navigation,
    handleSelectShippingMode, handleSelectRoute, handleClearRoute, handleSelectConsignee,
    handleClearConsignee, handleSubmit, updateField, setConsigneeSearchQuery,
    setShowConsigneeDropdown, setShowRouteMenu,
  } = useCreateContainerScreen();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <Header onBack={() => navigation.goBack()} />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
          <Card style={styles.formCard}>
            <Card.Content style={styles.formContent}>
              <ShippingModeSelector selectedMode={formData.shippingMode} error={errors.shippingMode} onSelectMode={handleSelectShippingMode} />
              {formData.shippingMode && (
                <RouteSelector selectedRouteId={formData.routeId} selectedRoute={selectedRoute} routes={routes} isLoading={isLoadingRoutes} isError={isRoutesError} error={errors.routeId} onSelectRoute={handleSelectRoute} onClearRoute={handleClearRoute} onCreateRoute={() => navigation.navigate('RouteForm', {})} />
              )}
              {selectedRoute && <RouteDetailsCard route={selectedRoute} />}
              <ConsigneeSelector selectedConsigneeId={formData.consigneeId} selectedConsigneeName={selectedConsigneeName} consignees={filteredConsignees} searchQuery={consigneeSearchQuery} showDropdown={showConsigneeDropdown} error={errors.consigneeId} onSearchChange={setConsigneeSearchQuery} onToggleDropdown={setShowConsigneeDropdown} onSelectConsignee={handleSelectConsignee} onClearConsignee={handleClearConsignee} />
              <ContainerNumberInput value={formData.actualContainerNumber} error={errors.actualContainerNumber} onChangeText={(text) => updateField('actualContainerNumber', text)} />
              <BookingReferenceInput value={formData.bookingReference} onChangeText={(text) => updateField('bookingReference', text)} />
              <SubmitButton isLoading={createMutation.isPending} isDisabled={!formData.shippingMode || !formData.routeId || !formData.consigneeId} onSubmit={handleSubmit} />
            </Card.Content>
          </Card>
        </ScrollView>
        <LoadingState visible={createMutation.isPending} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateContainerScreen;
