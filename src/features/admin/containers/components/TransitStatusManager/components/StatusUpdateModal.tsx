/**
 * StatusUpdateModal - Modal for confirming waypoint status updates
 * Shows current status, new status with visual transition indicator
 * Allows adding notes for the status change
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Portal, Dialog, Button, TextInput, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint, WaypointStatus } from '../../../types/waypoints';

interface StatusUpdateModalProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  selectedStatus: WaypointStatus | null;
  currentWaypoint?: ContainerWaypoint;
  notes: string;
  onNotesChange: (notes: string) => void;
  isLoading?: boolean;
}

// Waypoint status labels in French
const WAYPOINT_STATUS_LABELS: Record<WaypointStatus, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminé',
  DELAYED: 'Retardé',
  CANCELLED: 'Annulé',
};

// Waypoint status colors
const WAYPOINT_STATUS_COLORS: Record<WaypointStatus, string> = {
  PENDING: '#9CA3AF',
  IN_PROGRESS: '#3B82F6',
  COMPLETED: '#10B981',
  DELAYED: '#EF4444',
  CANCELLED: '#6B7280',
};

export const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  visible,
  onDismiss,
  onConfirm,
  selectedStatus,
  currentWaypoint,
  notes,
  onNotesChange,
  isLoading = false,
}) => {
  // Get current status from currentWaypoint
  const currentStatus = currentWaypoint?.status as WaypointStatus;

  // If no selected status, don't render content
  if (!selectedStatus) {
    return null;
  }

  // Status labels and colors
  const currentStatusLabel = currentStatus ? WAYPOINT_STATUS_LABELS[currentStatus] : 'N/A';
  const newStatusLabel = WAYPOINT_STATUS_LABELS[selectedStatus];
  const currentStatusColor = currentStatus ? WAYPOINT_STATUS_COLORS[currentStatus] : Theme.neutral[400];
  const newStatusColor = WAYPOINT_STATUS_COLORS[selectedStatus];

  // Notes required for DELAYED or CANCELLED status
  const notesRequired = selectedStatus === 'DELAYED' || selectedStatus === 'CANCELLED';
  const isValid = !notesRequired || notes.trim().length > 0;

  const handleDismiss = () => {
    if (!isLoading) {
      onDismiss();
    }
  };

  const handleConfirm = () => {
    if (!isValid) {
      return;
    }
    onConfirm();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleDismiss}>
        <Dialog.Icon icon="swap-horizontal" color={Theme.status.info} />
        <Dialog.Title style={styles.dialogTitle}>
          Mettre à jour le statut
        </Dialog.Title>
        
        <Dialog.Content>
          {/* Status Transition Display */}
          <View style={styles.statusTransition}>
            {/* Current Status */}
            <View style={[styles.statusBox, { borderColor: currentStatusColor }]}>
              <View style={[styles.statusIndicator, { backgroundColor: currentStatusColor }]}>
                <Ionicons name="ellipse" size={12} color="#FFF" />
              </View>
              <View>
                <HelperText type="info" style={styles.statusLabel}>Actuel</HelperText>
                <Text style={styles.statusText}>
                  {currentStatusLabel}
                </Text>
              </View>
            </View>

            {/* Arrow */}
            <Ionicons name="arrow-forward" size={24} color={Theme.neutral[400]} />

            {/* New Status */}
            <View style={[styles.statusBox, { borderColor: newStatusColor }]}>
              <View style={[styles.statusIndicator, { backgroundColor: newStatusColor }]}>
                <Ionicons name="ellipse" size={12} color="#FFF" />
              </View>
              <View>
                <HelperText type="info" style={styles.statusLabel}>Nouveau</HelperText>
                <Text style={styles.statusText}>
                  {newStatusLabel}
                </Text>
              </View>
            </View>
          </View>

          {/* Notes Input */}
          <View style={styles.notesContainer}>
            <TextInput
              label={notesRequired ? 'Notes (obligatoire)' : 'Notes (optionnel)'}
              value={notes}
              onChangeText={onNotesChange}
              multiline
              numberOfLines={3}
              mode="outlined"
              style={styles.notesInput}
              disabled={isLoading}
              placeholder="Ajouter des notes sur ce changement de statut..."
            />
            {notesRequired && (
              <HelperText type="error" visible={notesRequired && notes.trim().length === 0}>
                Les notes sont requises pour ce statut
              </HelperText>
            )}
          </View>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button 
            onPress={handleDismiss} 
            disabled={isLoading}
            textColor={Theme.neutral[500]}
          >
            Annuler
          </Button>
          <Button
            mode="contained"
            onPress={handleConfirm}
            disabled={!isValid || isLoading}
            loading={isLoading}
            buttonColor={newStatusColor}
          >
            {isLoading ? 'Mise à jour...' : 'Confirmer'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '700',
  },
  statusTransition: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.sm,
  },
  statusBox: {
    flex: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
    paddingHorizontal: 0,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  notesContainer: {
    marginTop: Theme.spacing.md,
  },
  notesInput: {
    backgroundColor: Theme.neutral.white,
  },
  actions: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
});

export default StatusUpdateModal;
