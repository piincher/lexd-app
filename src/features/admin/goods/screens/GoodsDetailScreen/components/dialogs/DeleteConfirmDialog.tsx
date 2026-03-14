// DeleteConfirmDialog - Alert dialog for delete confirmation
// Native Alert wrapper for consistent API

import { Alert } from 'react-native';

interface DeleteConfirmDialogProps {
  goodsId: string;
  onConfirm: () => void;
}

export const showDeleteConfirmDialog = ({ goodsId, onConfirm }: DeleteConfirmDialogProps): void => {
  Alert.alert(
    'Confirmer la suppression',
    `Êtes-vous sûr de vouloir supprimer ${goodsId} ?`,
    [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: onConfirm,
      },
    ]
  );
};

export const showNoContainersAlert = (onCreateContainer: () => void): void => {
  Alert.alert(
    'Aucun container disponible',
    'Veuillez d\'abord créer un container pour assigner cette marchandise.',
    [
      { text: 'Annuler', style: 'cancel' },
      { 
        text: 'Créer Container', 
        onPress: onCreateContainer,
      },
    ]
  );
};

export const showAssignError = (message: string): void => {
  Alert.alert('Erreur', message);
};

export const showAssignSuccess = (onDismiss: () => void): void => {
  Alert.alert('Succès', 'Marchandise assignée au container', [
    { text: 'OK', onPress: onDismiss },
  ]);
};
