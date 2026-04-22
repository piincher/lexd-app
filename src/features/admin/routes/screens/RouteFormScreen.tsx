import React, { useMemo } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import { useRouteForm } from './RouteForm/hooks/useRouteForm';
import {
  Header,
  RouteNameInput,
  ShippingModeSelect,
  LocationSelect,
  ShippingLineSelect,
  TransitDaysInput,
  OptionalFieldsSection,
  SubmitButton,
  LoadingState,
  ErrorDisplay,
} from './RouteForm/components';
import { createStyles } from './RouteForm/RouteForm.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const RouteFormScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const {
    formData,
    errors,
    isEditMode,
    isLoadingRoute,
    isSubmitting,
    modeMenuVisible,
    setModeMenuVisible,
    lineMenuVisible,
    setLineMenuVisible,
    originMenuVisible,
    setOriginMenuVisible,
    destinationMenuVisible,
    setDestinationMenuVisible,
    availableShippingLines,
    updateField,
    handleSelectMode,
    handleSelectLine,
    handleSelectOrigin,
    handleSelectDestination,
    handleSubmit,
    mutationError,
    navigation,
  } = useRouteForm();

  if (isEditMode && isLoadingRoute) {
    return <LoadingState />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Header isEditMode={isEditMode} navigation={navigation} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <Card style={styles.formCard}>
            <Card.Content style={styles.formContent}>
              <RouteNameInput
                value={formData.name}
                onChangeText={(value) => updateField('name', value)}
                error={errors.name}
              />

              <ShippingModeSelect
                value={formData.shippingMode}
                onSelect={handleSelectMode}
                error={errors.shippingMode}
                menuVisible={modeMenuVisible}
                setMenuVisible={setModeMenuVisible}
              />

              <LocationSelect
                origin={formData.origin}
                destination={formData.destination}
                onSelectOrigin={handleSelectOrigin}
                onSelectDestination={handleSelectDestination}
                originError={errors.origin}
                destinationError={errors.destination}
                originMenuVisible={originMenuVisible}
                setOriginMenuVisible={setOriginMenuVisible}
                destinationMenuVisible={destinationMenuVisible}
                setDestinationMenuVisible={setDestinationMenuVisible}
              />

              <ShippingLineSelect
                value={formData.shippingLine}
                onSelect={handleSelectLine}
                error={errors.shippingLine}
                menuVisible={lineMenuVisible}
                setMenuVisible={setLineMenuVisible}
                availableLines={availableShippingLines}
              />

              <TransitDaysInput
                value={formData.estimatedTransitDays}
                onChangeText={(value) => updateField('estimatedTransitDays', value)}
                error={errors.estimatedTransitDays}
              />

              <OptionalFieldsSection
                description={formData.description}
                onDescriptionChange={(value) => updateField('description', value)}
                isActive={formData.isActive}
                onIsActiveChange={(value) => updateField('isActive', value)}
              />
            </Card.Content>
          </Card>

          <SubmitButton
            isEditMode={isEditMode}
            isSubmitting={isSubmitting}
            onPress={handleSubmit}
          />

          <ErrorDisplay error={mutationError} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RouteFormScreen;
