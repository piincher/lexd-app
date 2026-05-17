import { showMessage } from 'react-native-flash-message';

export interface ToastColors {
  backgroundColor: string;
  textColor: string;
}

export function showErrorToast(message: string, duration: number = 3000, colors?: ToastColors): void {
  showMessage({
    message: 'Erreur',
    description: message,
    type: 'danger',
    backgroundColor: colors?.backgroundColor || '#dc3545',
    color: colors?.textColor || '#FFFFFF',
    duration,
    icon: 'danger',
  });
}

export function showSuccessToast(message: string, duration: number = 3000, colors?: ToastColors): void {
  showMessage({
    message: 'Succès',
    description: message,
    type: 'success',
    backgroundColor: colors?.backgroundColor || '#28a745',
    color: colors?.textColor || '#FFFFFF',
    duration,
    icon: 'success',
  });
}

export function showWarningToast(message: string, duration: number = 3000, colors?: ToastColors): void {
  showMessage({
    message: 'Attention',
    description: message,
    type: 'warning',
    backgroundColor: colors?.backgroundColor || '#ff9800',
    color: colors?.textColor || '#FFFFFF',
    duration,
    icon: 'warning',
  });
}

export function showInfoToast(message: string, duration: number = 3000, colors?: ToastColors): void {
  showMessage({
    message: 'Information',
    description: message,
    type: 'info',
    backgroundColor: colors?.backgroundColor || '#17a2b8',
    color: colors?.textColor || '#FFFFFF',
    duration,
    icon: 'info',
  });
}
