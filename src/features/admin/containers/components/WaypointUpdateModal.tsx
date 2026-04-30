/**
 * WaypointUpdateModal - Modal for updating waypoint status
 * Updated: Port-specific status changes for different locations (Dakar Port, Border, Warehouse)
 */

import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { WaypointStatus } from '@src/shared/types/containerWaypoints';
import { ContainerWaypoint } from '../types';
import { useWaypointUpdateForm } from '../hooks/useWaypointUpdateForm';
import { WaypointModalHeader } from './WaypointModalHeader';
import { WaypointQuickActions } from './WaypointQuickActions';
import { WaypointStatusSelector } from './WaypointStatusSelector';
import { WaypointDateTimeSection } from './WaypointDateTimeSection';
import { WaypointLocationDetails } from './WaypointLocationDetails';
import { WaypointNotesSection } from './WaypointNotesSection';
import { WaypointDocumentUpload } from './WaypointDocumentUpload';
import { WaypointActionButtons } from './WaypointActionButtons';

interface WaypointUpdateModalProps {
  visible: boolean;
  waypoint: ContainerWaypoint | null;
  waypointIndex: number;
  onDismiss: () => void;
  onSave: (index: number, updates: Partial<ContainerWaypoint> & { status?: WaypointStatus }) => void;
  onUploadDocument?: (index: number) => void;
}

export const WaypointUpdateModal: React.FC<WaypointUpdateModalProps> = ({
  visible,
  waypoint,
  waypointIndex,
  onDismiss,
  onSave,
  onUploadDocument,
}) => {
  const form = useWaypointUpdateForm(waypoint, waypointIndex, onSave, onDismiss);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <Animated.View entering={SlideInUp} style={styles.modalContent}>
            <WaypointModalHeader
              status={form.status}
              locationCategory={form.locationCategory}
              locationCode={form.locationCode}
              waypoint={waypoint}
              onDismiss={onDismiss}
            />

            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <WaypointQuickActions
                quickActions={form.quickActions}
                onQuickAction={form.handleQuickAction}
                delay={50}
              />

              <WaypointStatusSelector
                status={form.status}
                showStatusDropdown={form.showStatusDropdown}
                allStatuses={form.allStatuses}
                onToggleDropdown={() => form.setShowStatusDropdown(!form.showStatusDropdown)}
                onSelectStatus={(newStatus) => {
                  form.setStatus(newStatus);
                  form.setShowStatusDropdown(false);
                }}
                delay={100}
              />

              <WaypointDateTimeSection
                actualArrival={form.actualArrival}
                actualDeparture={form.actualDeparture}
                showArrivalPicker={form.showArrivalPicker}
                showDeparturePicker={form.showDeparturePicker}
                onArrivalChange={form.onArrivalChange}
                onDepartureChange={form.onDepartureChange}
                onShowArrivalPicker={() => form.setShowArrivalPicker(true)}
                onShowDeparturePicker={() => form.setShowDeparturePicker(true)}
                onClearArrival={() => form.setActualArrival(null)}
                onClearDeparture={() => form.setActualDeparture(null)}
                delay={200}
              />

              <WaypointLocationDetails locationCategory={form.locationCategory} delay={250} />

              <WaypointNotesSection notes={form.notes} onChangeNotes={form.setNotes} delay={300} />

              {onUploadDocument && (
                <WaypointDocumentUpload onUpload={() => onUploadDocument(waypointIndex)} delay={350} />
              )}

              <View style={styles.footerSpacer} />
            </ScrollView>

            <WaypointActionButtons onCancel={onDismiss} onSave={form.handleSave} />
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Theme.colors.background.card,
    borderTopLeftRadius: Theme.radius['3xl'],
    borderTopRightRadius: Theme.radius['3xl'],
    maxHeight: '90%',
    ...Theme.shadows.xl,
  },
  scrollView: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  footerSpacer: {
    height: Theme.spacing.xl,
  },
});