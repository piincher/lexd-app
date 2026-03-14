/**
 * WhatsAppRequestErrorSnackbar - Error snackbar component
 */

import React from 'react';
import { Snackbar } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface WhatsAppRequestErrorSnackbarProps {
  message: string | null;
  onDismiss: () => void;
}

export const WhatsAppRequestErrorSnackbar: React.FC<WhatsAppRequestErrorSnackbarProps> = ({
  message,
  onDismiss,
}) => (
  <Snackbar
    visible={!!message}
    onDismiss={onDismiss}
    action={{ label: 'OK', onPress: onDismiss }}
    style={styles.snackbar}
  >
    {message}
  </Snackbar>
);

const styles = {
  snackbar: {
    backgroundColor: Theme.neutral[800],
    borderRadius: Theme.radius.lg,
  },
};

export default WhatsAppRequestErrorSnackbar;
