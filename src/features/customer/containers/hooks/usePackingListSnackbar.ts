/**
 * usePackingListSnackbar Hook
 * Snackbar state management
 * SRP: Handle snackbar notifications
 */

import { useState, useCallback } from 'react';

export const usePackingListSnackbar = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
  }, []);

  const hideSnackbar = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    snackbarVisible: visible,
    snackbarMessage: message,
    showSnackbar,
    hideSnackbar,
  };
};
