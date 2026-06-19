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
  /** Next waypoint object, used to derive the real destination city for the preview. */
  nextWaypoint?: ContainerWaypoint;
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
  nextWaypoint,
  isFinalWaypoint = false,
  isArrivalAction = false,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Mirror of the backend notification wording (containerWaypointNotificationBuilder)
  // so the admin sees exactly what the client will receive before confirming.
  // For road legs the waypoint city is the destination, so the "from" city must be
  // the origin of the leg (e.g. Dakar) to avoid "left Diboli → towards Diboli".
  const getRoadOrigin = (wp?: ContainerWaypoint): string | null => {
    if (wp?.segmentType === 'ROAD' && wp?.roadDetails?.routeDetails) {
      const stops = wp.roadDetails.routeDetails.split('→').map((s) => s.trim());
      return stops[0] || null;
    }
    return null;
  };

  const getRoadDestination = (wp?: ContainerWaypoint): string | null => {
    if (wp?.segmentType === 'ROAD' && wp?.roadDetails?.routeDetails) {
      const stops = wp.roadDetails.routeDetails.split('→').map((s) => s.trim());
      return stops[stops.length - 1] || null;
    }
    return null;
  };

  const getWaypointCity = (wp?: ContainerWaypoint): string | null =>
    wp?.location?.city || wp?.shortName || null;

  const isCustomsDescription = (description = '') =>
    /dédouanement|douane|customs clearance|customs|dédouané/i.test(description);

  const clientPreview = React.useMemo<string | null>(() => {
    const arrivalLocation = currentLocationName || getWaypointCity(currentWaypoint);

    if (isArrivalAction) {
      return arrivalLocation
        ? `Vos marchandises sont arrivées à ${arrivalLocation}.`
        : 'Vos marchandises sont arrivées à une nouvelle étape.';
    }
    if (selectedStatus === 'COMPLETED') {
      if (isFinalWaypoint) {
        return arrivalLocation
          ? `Vos marchandises sont arrivées à ${arrivalLocation} et ont terminé leur parcours.`
          : 'Vos marchandises ont terminé leur parcours.';
      }

      const fromLocation =
        getRoadOrigin(currentWaypoint) ||
        (isCustomsDescription(currentWaypoint?.description || '')
          ? getWaypointCity(currentWaypoint)
          : null) ||
        currentLocationName ||
        getWaypointCity(currentWaypoint);

      const toLocation =
        getRoadDestination(nextWaypoint) ||
        (isCustomsDescription(nextWaypoint?.description || '')
          ? getWaypointCity(nextWaypoint)
          : null) ||
        nextLocation ||
        getWaypointCity(nextWaypoint);

      if (fromLocation && toLocation) {
        return `Vos marchandises ont quitté ${fromLocation} et sont maintenant en route vers ${toLocation}.`;
      }
      return 'Vos marchandises ont accompli une nouvelle étape.';
    }
    if (selectedStatus === 'DELAYED') {
      return "L'expédition de vos marchandises est retardée. L'itinéraire a été mis à jour.";
    }
    return null;
  }, [
    selectedStatus,
    isArrivalAction,
    isFinalWaypoint,
    currentLocationName,
    nextLocation,
    currentWaypoint,
    nextWaypoint,
  ]);

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
