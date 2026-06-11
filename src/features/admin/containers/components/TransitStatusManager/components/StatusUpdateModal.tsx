import React from 'react';
import {
  View,
  Text,
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
import { createStyles } from './StatusUpdateModal.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface StatusUpdateModalProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  selectedStatus: WaypointStatus | null;
  currentWaypoint?: ContainerWaypoint;
  notes: string;
  onNotesChange: (notes: string) => void;
  isLoading?: boolean;
  /** Location of the waypoint being completed (for the client-message preview). */
  currentLocationName?: string | null;
  /** Next waypoint location, if any (for the "en route vers …" preview). */
  nextLocation?: string | null;
  /** True when the active waypoint is the destination. */
  isFinalWaypoint?: boolean;
  /** True when the modal is opened to mark an arrival (vs. a status update). */
  isArrivalAction?: boolean;
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
  currentLocationName,
  nextLocation,
  isFinalWaypoint = false,
  isArrivalAction = false,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Mirror of the backend notification wording (containerWaypointNotificationBuilder)
  // so the admin sees exactly what the client will receive before confirming.
  const clientPreview = React.useMemo<string | null>(() => {
    if (isArrivalAction) {
      return currentLocationName
        ? `Vos marchandises sont arrivées à ${currentLocationName}.`
        : 'Vos marchandises sont arrivées à une nouvelle étape.';
    }
    if (selectedStatus === 'COMPLETED') {
      if (isFinalWaypoint) {
        return currentLocationName
          ? `Vos marchandises sont arrivées à ${currentLocationName} et ont terminé leur parcours.`
          : 'Vos marchandises ont terminé leur parcours.';
      }
      if (currentLocationName && nextLocation) {
        return `Vos marchandises ont quitté ${currentLocationName} et sont maintenant en route vers ${nextLocation}.`;
      }
      return 'Vos marchandises ont accompli une nouvelle étape.';
    }
    if (selectedStatus === 'DELAYED') {
      return "L'expédition de vos marchandises est retardée. L'itinéraire a été mis à jour.";
    }
    return null;
  }, [selectedStatus, isArrivalAction, isFinalWaypoint, currentLocationName, nextLocation]);

  // Handle hardware back button on Android
  React.useEffect(() => {
    if (!visible) return;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!isLoading) onDismiss();
      return true;
    });
    return () => backHandler.remove();
  }, [visible, isLoading, onDismiss]);

  if (!selectedStatus && !isArrivalAction) return null;
  if (!visible) return null;

  const currentStatus = currentWaypoint?.status as WaypointStatus | undefined;
  const newStatusColor = selectedStatus ? WAYPOINT_STATUS_COLORS[selectedStatus] : colors.primary[500];
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

        {/* Bottom sheet content */}
        <View style={styles.keyboardView} pointerEvents="box-none">
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
                {selectedStatus && (
                  <StatusTransitionDisplay currentStatus={currentStatus} newStatus={selectedStatus} />
                )}

                {clientPreview && (
                  <View
                    style={{
                      backgroundColor: colors.primary[50],
                      borderRadius: 12,
                      padding: 12,
                      marginTop: 12,
                      borderLeftWidth: 3,
                      borderLeftColor: colors.primary[500],
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: colors.primary[700],
                        marginBottom: 4,
                      }}
                    >
                      📨 Message envoyé au client
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontStyle: 'italic',
                        color: colors.neutral[700],
                        lineHeight: 18,
                      }}
                    >
                      « {clientPreview} »
                    </Text>
                  </View>
                )}

                <DelayNotesInput
                  notes={notes}
                  onNotesChange={onNotesChange}
                  selectedStatus={selectedStatus}
                  isLoading={isLoading}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 250);
                  }}
                />
                <View style={{ height: 280 }} />
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
        </View>
      </View>
    </Portal>
  );
};
