import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import { Portal, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint, WaypointStatus } from '../../../types/waypoints';
import { WAYPOINT_STATUS_COLORS } from '@src/shared/types/containerWaypoints';
import { StatusTransitionDisplay } from './StatusTransitionDisplay';
import { DelayNotesInput } from './DelayNotesInput';

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

  if (!selectedStatus) return null;

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

  // Handle hardware back button on Android
  React.useEffect(() => {
    if (!visible) return;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleDismiss();
      return true;
    });
    return () => backHandler.remove();
  }, [visible, isLoading]);

  if (!visible) return null;

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
              <View style={styles.header}>
                <Ionicons name="swap-horizontal" size={28} color={Theme.status.info} />
                <Text style={styles.title}>Mettre à jour le statut</Text>
              </View>

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

              <View style={styles.actions}>
                <Button
                  onPress={handleDismiss}
                  disabled={isLoading}
                  textColor={Theme.neutral[500]}
                  style={styles.actionButton}
                >
                  Annuler
                </Button>
                <Button
                  mode="contained"
                  onPress={handleConfirm}
                  disabled={!isValid || isLoading}
                  loading={isLoading}
                  buttonColor={newStatusColor}
                  style={styles.actionButton}
                >
                  {isLoading ? 'Mise à jour...' : 'Confirmer'}
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    color: Theme.neutral[800],
  },
  scrollView: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  footerSpacer: {
    height: Theme.spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  actionButton: {
    minHeight: 44,
  },
});
