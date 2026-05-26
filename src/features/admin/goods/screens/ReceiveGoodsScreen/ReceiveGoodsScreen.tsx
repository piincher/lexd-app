import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReceiveGoodsScreen } from './hooks/useReceiveGoodsScreen';
import { useReceiveGoodsScreenUI } from './hooks/useReceiveGoodsScreenUI';
import { ReceiveGoodsForm } from './components/ReceiveGoodsForm';
import { ReceiveAssistHeader } from './components/ReceiveAssistHeader';
import { ReceiveBatchQueue } from './components/ReceiveBatchQueue';
import { ReceiveFeedbackLayer } from './components/ReceiveFeedbackLayer';
import { ReceiveSessionDashboard } from './components/ReceiveSessionDashboard';
import { ReceiveSubmitBar } from './components/ReceiveSubmitBar';
import { createStyles } from './ReceiveGoodsScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const ReceiveGoodsScreen: React.FC = () => {
  const { form, ui, actions } = useReceiveGoodsScreen();
  const { handlers } = useReceiveGoodsScreenUI();
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <ReceiveAssistHeader onNotificationPress={handlers.handleNotificationPress} />
          <ReceiveSessionDashboard
            stats={ui.sessionStats}
            duplicateWarnings={ui.duplicateWarnings}
            todayItems={ui.sessionItems}
          />

          <View style={styles.formContainer}>
            <ReceiveGoodsForm
              control={form.control}
              errors={form.errors}
              setValue={form.setValue}
              watch={form.watch}
              selectedClient={form.selectedClient}
              onSelectClient={form.setSelectedClient}
              clientError={!form.selectedClient && !form.isClientUnknown && form.isSubmitted ? 'Veuillez sélectionner un client' : undefined}
              useDimensions={form.useDimensions}
              onToggleDimensions={form.setUseDimensions}
              calculatedCBM={form.calculatedCBM}
              photoUris={form.photoUris}
              onPhotoSelected={form.addPhotoUri}
              onPhotoRemoved={form.removePhotoUri}
              totalCost={form.totalCost}
              recentClients={form.recentClients}
              priceWarning={form.priceWarning}
            />
          </View>

          <ReceiveBatchQueue
            items={ui.sessionItems}
            onRemove={actions.removeSessionItem}
            onOpenLabel={actions.openLabel}
          />

          {ui.sessionCount > 0 && (
            <View style={styles.sessionCounter}>
              <Text style={styles.sessionCounterText}>
                {ui.sessionCount} marchandise{ui.sessionCount > 1 ? 's' : ''} enregistrée
                {ui.sessionCount > 1 ? 's' : ''} dans cette session
              </Text>
            </View>
          )}

          <ReceiveSubmitBar
            isSubmitting={ui.isSubmitting}
            onSubmit={form.onSubmit}
            onSubmitAndNext={form.onSubmitAndNext}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <ReceiveFeedbackLayer
        infoMessage={ui.infoMessage}
        errorMessage={ui.errorMessage}
        showSuccessDialog={ui.showSuccessDialog}
        successMessage={ui.successMessage}
        labelGoods={ui.labelGoods}
        labelVisible={ui.labelVisible}
        onDismissInfo={actions.dismissInfo}
        onDismissError={actions.dismissError}
        onDismissSuccess={actions.dismissSuccess}
        onOpenLabel={actions.openLabel}
        onDismissLabel={actions.dismissLabel}
      />
    </SafeAreaView>
  );
};

export default ReceiveGoodsScreen;
