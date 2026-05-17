/**
 * SendConfirmationModal
 * SRP: Confirmation dialog before sending SMS to prevent accidental sends
 */

import React from 'react';
import { View, Modal } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SendConfirmationModalHeader } from './SendConfirmationModalHeader';
import { SendConfirmationModalSummary } from './SendConfirmationModalSummary';
import { SendConfirmationModalPreview } from './SendConfirmationModalPreview';
import { SendConfirmationModalActions } from './SendConfirmationModalActions';
import { getStyles } from './SendConfirmationModal.styles';

interface SendConfirmationModalProps {
  visible: boolean;
  recipientCount: number;
  smsCount: number;
  messagePreview: string;
  isSending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SendConfirmationModal: React.FC<SendConfirmationModalProps> = ({
  visible,
  recipientCount,
  smsCount,
  messagePreview,
  isSending = false,
  onConfirm,
  onCancel,
}) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <SendConfirmationModalHeader styles={styles} />
          <SendConfirmationModalSummary styles={styles} recipientCount={recipientCount} smsCount={smsCount} />
          <SendConfirmationModalPreview styles={styles} messagePreview={messagePreview} />
          <SendConfirmationModalActions
            styles={styles}
            isSending={isSending}
            colors={colors}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SendConfirmationModal;
