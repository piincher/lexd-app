import React, { useCallback } from 'react';
import { KeyboardAvoidingView, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ShippingMarkConfig } from '../api/shippingMarkAdminApi';
import { ShippingMarkConfigForm } from './ShippingMarkConfigForm';
import { createStyles } from './ShippingMarkSettingsModal.styles';

interface ShippingMarkSettingsModalProps {
  visible: boolean;
  config?: ShippingMarkConfig;
  isSaving: boolean;
  onSave: (updates: Partial<ShippingMarkConfig>) => Promise<ShippingMarkConfig>;
  onClose: () => void;
}

export const ShippingMarkSettingsModal: React.FC<ShippingMarkSettingsModalProps> = ({
  visible,
  config,
  isSaving,
  onSave,
  onClose,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const save = useCallback(async (updates: Partial<ShippingMarkConfig>) => {
    try {
      await onSave(updates);
      showMessage({ message: 'Paramètres enregistrés', type: 'success' });
      onClose();
    } catch (error) {
      showMessage({
        message: 'Enregistrement impossible',
        description: error instanceof Error ? error.message : 'Réessayez dans quelques instants.',
        type: 'danger',
      });
    }
  }, [onClose, onSave]);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Paramètres de la marque</Text>
            <Text style={styles.subtitle}>Configuration appliquée aux prochaines générations</Text>
          </View>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Fermer les paramètres"
          >
            <Ionicons name="close" size={23} color={colors.text.primary} />
          </Pressable>
        </View>
        <KeyboardAvoidingView style={styles.flex} behavior={process.env.EXPO_OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <ShippingMarkConfigForm config={config} onSave={save} isSaving={isSaving} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};
