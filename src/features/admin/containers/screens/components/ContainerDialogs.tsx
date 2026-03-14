/**
 * ContainerDialogs - Dialog components for ContainerDetailScreen
 * Extracted to keep ContainerDetailScreen under 100 lines
 */

import React from 'react';
import { Text } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { styles } from '../ContainerDetailScreen.styles';

interface ContainerDialogsProps {
  // Delete dialog
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
  onConfirmDelete: () => void;
  hasGoods: boolean;

  // Remove goods dialog
  showRemoveGoodsDialog: boolean;
  setShowRemoveGoodsDialog: (show: boolean) => void;
  onConfirmRemoveGoods: () => void;

  // Ready for pickup dialog
  showReadyForPickupDialog: boolean;
  setShowReadyForPickupDialog: (show: boolean) => void;
  onConfirmReadyForPickup: () => void;
}

export const ContainerDialogs: React.FC<ContainerDialogsProps> = ({
  // Delete dialog
  showDeleteDialog,
  setShowDeleteDialog,
  onConfirmDelete,
  hasGoods,

  // Remove goods dialog
  showRemoveGoodsDialog,
  setShowRemoveGoodsDialog,
  onConfirmRemoveGoods,

  // Ready for pickup dialog
  showReadyForPickupDialog,
  setShowReadyForPickupDialog,
  onConfirmReadyForPickup,
}) => {
  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Icon icon="alert" color={Theme.status.error} />
          <Dialog.Title style={styles.dialogTitle}>
            Supprimer le Container
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              {hasGoods
                ? 'Veuillez d\'abord retirer toutes les marchandises avant de supprimer ce container.'
                : 'Êtes-vous sûr de vouloir supprimer ce container ? Cette action est irréversible.'}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Annuler</Button>
            <Button
              onPress={onConfirmDelete}
              textColor={Theme.status.error}
              disabled={hasGoods}
            >
              Supprimer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Remove Goods Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={showRemoveGoodsDialog}
          onDismiss={() => setShowRemoveGoodsDialog(false)}
        >
          <Dialog.Icon icon="cube-remove" color={Theme.status.warning} />
          <Dialog.Title style={styles.dialogTitle}>
            Retirer la Marchandise
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Êtes-vous sûr de vouloir retirer cette marchandise du container ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowRemoveGoodsDialog(false)}>Annuler</Button>
            <Button
              onPress={onConfirmRemoveGoods}
              textColor={Theme.status.warning}
            >
              Retirer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Ready for Pickup Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={showReadyForPickupDialog}
          onDismiss={() => setShowReadyForPickupDialog(false)}
        >
          <Dialog.Icon icon="checkmark-done-circle" color={Theme.status.warning} />
          <Dialog.Title style={styles.dialogTitle}>
            Marquer comme Prêt
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Êtes-vous sûr de vouloir marquer ce container comme prêt pour le retrait ?
              {'\n\n'}
              Cela notifiera tous les clients que leurs marchandises sont disponibles.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowReadyForPickupDialog(false)}>Annuler</Button>
            <Button
              onPress={onConfirmReadyForPickup}
              textColor={Theme.status.warning}
            >
              Confirmer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default ContainerDialogs;
