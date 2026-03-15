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
import { lightTheme } from '@src/constants/Theme';

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
        style={styles.overlay}
        testID="confirm-dialog-backdrop"
      >
        <View style={styles.card} testID="confirm-dialog-card" pointerEvents="box-none">
          <Text style={styles.title} testID="confirm-dialog-title">
            {title}
          </Text>
          <Text style={styles.message} testID="confirm-dialog-message">
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
    backgroundColor: lightTheme.colors.status.info + '80', // 50% opacity overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: lightTheme.spacing.lg,
  },
  card: {
    backgroundColor: lightTheme.colors.neutral.white,
    borderRadius: lightTheme.borderRadius.lg,
    padding: lightTheme.spacing['2xl'],
    width: '100%',
    maxWidth: 360,
    ...lightTheme.shadows.lg,
  },
  title: {
    fontSize: lightTheme.typography.h3.fontSize,
    fontWeight: lightTheme.typography.h3.fontWeight as '700',
    letterSpacing: lightTheme.typography.h3.letterSpacing,
    lineHeight: lightTheme.typography.h3.lineHeight,
    textAlign: 'center',
    color: lightTheme.colors.text.primary,
    marginBottom: lightTheme.spacing.md,
  },
  message: {
    fontSize: lightTheme.typography.body.fontSize,
    fontWeight: lightTheme.typography.body.fontWeight as '400',
    letterSpacing: lightTheme.typography.body.letterSpacing,
    lineHeight: lightTheme.typography.body.lineHeight,
    textAlign: 'center',
    color: lightTheme.colors.text.secondary,
    marginBottom: lightTheme.spacing['2xl'],
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: lightTheme.spacing.md,
  },
  cancelButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
});

export default ConfirmDialog;
