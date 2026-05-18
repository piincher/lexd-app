import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import { Portal } from 'react-native-paper';
import { ContainerWaypoint, WaypointStatus } from '../../../types/waypoints';
import { WAYPOINT_STATUS_COLORS } from '@src/shared/types/containerWaypoints';
import { StatusTransitionDisplay } from './StatusTransitionDisplay';
import { DelayNotesInput } from './DelayNotesInput';
import { ModalHeader } from './ModalHeader';
import { ModalActions } from './ModalActions';
import { styles } from './StatusUpdateModal.styles';

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
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Handle hardware back button on Android
  React.useEffect(() => {
    if (!visible) return;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!isLoading) onDismiss();
      return true;
    });
    return () => backHandler.remove();
  }, [visible, isLoading, onDismiss]);

  if (!selectedStatus) return null;
  if (!visible) return null;

  const currentStatus = currentWaypoint?.status as WaypointStatus | undefined;
  const newStatusColor = WAYPOINT_STATUS_COLORS[selectedStatus];
  const notesRequired = selectedStatus === 'DELAYED' || selectedStatus === 'CANCELLED';
  const isValid = !notesRequired || notes.trim().length > 0;

  const handleDismiss = () => {
    if (!isLoading) onDismiss();
  };

  const handleConfirm = () => {
    if (isValid) onConfirm();
  };

  return (
    <Portal>
      <View style={styles.overlay} pointerEvents="box-none">
        {/* Backdrop — dismiss on tap */}
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Bottom sheet content — rendered in main activity window, NOT in a Dialog */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          pointerEvents="box-none"
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalContent} pointerEvents="auto">
              <ModalHeader />

              <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
              >
                <StatusTransitionDisplay currentStatus={currentStatus} newStatus={selectedStatus} />
                <DelayNotesInput
                  notes={notes}
                  onNotesChange={onNotesChange}
                  selectedStatus={selectedStatus}
                  isLoading={isLoading}
                  onFocus={() => {
                    // Auto-scroll input into view when keyboard appears.
                    // Delay allows KeyboardAvoidingView to resize first.
                    setTimeout(() => {
                      scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 150);
                  }}
                />
                <View style={styles.footerSpacer} />
              </ScrollView>

              <ModalActions
                onDismiss={handleDismiss}
                onConfirm={handleConfirm}
                isLoading={isLoading}
                isValid={isValid}
                buttonColor={newStatusColor}
                confirmLabel={isLoading ? 'Mise à jour...' : 'Confirmer'}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </Portal>
  );
};
