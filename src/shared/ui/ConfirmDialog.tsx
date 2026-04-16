/**
 * ConfirmDialog - Reusable confirmation dialog component
 * 
 * A modal dialog for confirming user actions with customizable
 * title, message, and button variants.
 * 
 * @example
 * <ConfirmDialog
 *   visible={showDeleteConfirm}
 *   title="Delete Item"
 *   message="Are you sure you want to delete this item?"
 *   variant="danger"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowDeleteConfirm(false)}
 * />
 */

import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { Button } from './Button';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'primary';
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'primary',
  loading = false,
}) => {
  const { colors } = useAppTheme();
  const confirmButtonVariant = variant === 'danger' ? 'danger' : 'primary';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      testID="confirm-dialog-modal"
    >
      <Pressable 
        onPress={onCancel} 
        style={[styles.overlay, { backgroundColor: colors.background.overlay }]}
        testID="confirm-dialog-backdrop"
      >
        <View 
          style={[styles.card, { 
            backgroundColor: colors.background.card,
            borderRadius: 16,
            padding: 24,
          }]} 
          testID="confirm-dialog-card" 
          pointerEvents="box-none"
        >
          <Text style={[styles.title, { color: colors.text.primary }]} testID="confirm-dialog-title">
            {title}
          </Text>
          <Text style={[styles.message, { color: colors.text.secondary }]} testID="confirm-dialog-message">
            {message}
          </Text>
          <View style={styles.buttonContainer} pointerEvents="box-none">
            <Button
              title={cancelText}
              onPress={onCancel}
              variant="outline"
              size="medium"
              style={styles.cancelButton}
              testID="confirm-dialog-cancel"
            />
            <Button
              title={confirmText}
              onPress={onConfirm}
              variant={confirmButtonVariant}
              size="medium"
              loading={loading}
              style={styles.confirmButton}
              testID="confirm-dialog-confirm"
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 360,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
});

export default ConfirmDialog;
