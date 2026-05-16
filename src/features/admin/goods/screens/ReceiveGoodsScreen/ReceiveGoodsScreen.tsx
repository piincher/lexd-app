/**
 * ReceiveGoodsScreen - Thin screen component
 * Responsibility: Layout composition only (<100 lines)
 * Auto-assigns goods to order (< 7 days) or creates new order
 */

import React, { useMemo } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Snackbar, Portal, Dialog } from 'react-native-paper';
import { useReceiveGoodsScreen } from './hooks/useReceiveGoodsScreen';
import { ReceiveGoodsForm } from './components/ReceiveGoodsForm';
import { createStyles } from './ReceiveGoodsScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';

export const ReceiveGoodsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { form, ui, actions } = useReceiveGoodsScreen();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.headerTitle}>Réception Marchandise</Text>
              <NotificationBell
                onPress={() => navigation.navigate('Notifications' as never)}
                size={24}
                color={colors.text.secondary}
              />
            </View>
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
              photoUris={form.photoUris}
              onPhotoSelected={form.addPhotoUri}
              onPhotoRemoved={form.removePhotoUri}
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

      </KeyboardAvoidingView>

      <Portal>
        {/* Success Dialog */}
        <Dialog visible={ui.showSuccessDialog} onDismiss={actions.dismissSuccess} style={styles.dialog}>
          <Dialog.Icon icon="check-circle" size={48} color={colors.status.success} />
          <Dialog.Title style={styles.dialogTitle}>Succès</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>{ui.successMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button onPress={actions.dismissSuccess} mode="contained" style={styles.dialogButton}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default ReceiveGoodsScreen;
