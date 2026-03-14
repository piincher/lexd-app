/**
 * ReceiveGoodsScreen - Thin screen component
 * Responsibility: Layout composition only (<100 lines)
 */

import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, Snackbar, Portal, Dialog } from 'react-native-paper';
import { useReceiveGoodsScreen } from './hooks/useReceiveGoodsScreen';
import { ReceiveGoodsForm } from './components/ReceiveGoodsForm';
import { styles } from './ReceiveGoodsScreen.styles';
import { COLORS } from '@src/constants/Colors';

export const ReceiveGoodsScreen: React.FC = () => {
  const { form, ui, actions } = useReceiveGoodsScreen();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Réception Marchandise</Text>
            <Text style={styles.headerSubtitle}>Enregistrer une nouvelle marchandise</Text>
          </View>

          <View style={styles.formContainer}>
            <ReceiveGoodsForm
              control={form.control}
              errors={form.errors}
              setValue={form.setValue}
              watch={form.watch}
              selectedClient={form.selectedClient}
              onSelectClient={form.setSelectedClient}
              clientError={!form.selectedClient && form.isSubmitted ? 'Veuillez sélectionner un client' : undefined}
              useDimensions={form.useDimensions}
              onToggleDimensions={form.setUseDimensions}
              calculatedCBM={form.calculatedCBM}
              photoUri={form.photoUri}
              onPhotoSelected={form.setPhotoUri}
              onPhotoRemoved={() => form.setPhotoUri(null)}
              totalCost={form.totalCost}
            />
          </View>

          <Button
            mode="contained"
            onPress={form.onSubmit}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            loading={ui.isSubmitting}
            disabled={ui.isSubmitting}
            icon="check"
          >
            {ui.isSubmitting ? 'Enregistrement...' : 'Enregistrer la marchandise'}
          </Button>
        </ScrollView>

        <Snackbar
          visible={!!ui.errorMessage}
          onDismiss={actions.dismissError}
          action={{ label: 'OK', onPress: actions.dismissError }}
          style={styles.snackbar}
        >
          {ui.errorMessage}
        </Snackbar>

        <Portal>
          <Dialog visible={ui.showSuccessDialog} onDismiss={actions.dismissSuccess} style={styles.dialog}>
            <Dialog.Icon icon="check-circle" size={48} color={COLORS.success || '#28a745'} />
            <Dialog.Title style={styles.dialogTitle}>Succès</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogText}>Marchandise enregistrée avec succès!</Text>
            </Dialog.Content>
            <Dialog.Actions style={styles.dialogActions}>
              <Button onPress={actions.dismissSuccess} mode="contained" style={styles.dialogButton}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReceiveGoodsScreen;
