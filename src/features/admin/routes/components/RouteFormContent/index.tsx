import React from 'react';
import { Card } from 'react-native-paper';
import { useRouteForm } from '../../screens/RouteForm/hooks/useRouteForm';
import {
  RouteNameInput,
  ShippingModeSelect,
  LocationSelect,
  ShippingLineSelect,
  TransitDaysInput,
  RouteWaypointsInput,
  OptionalFieldsSection,
  SubmitButton,
  ErrorDisplay,
} from '../../screens/RouteForm/components';
import { createStyles } from '../../screens/RouteForm/RouteForm.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const RouteFormContent: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    formData,
    errors,
    isEditMode,
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
  } = useRouteForm();

  return (
    <>
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

          <RouteWaypointsInput
            waypoints={formData.waypoints}
            totalDays={parseInt(formData.estimatedTransitDays, 10)}
            shippingLine={formData.shippingLine}
            onChange={(value) => updateField('waypoints', value)}
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
    </>
  );
};
