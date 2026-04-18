/**
 * WaypointUpdateModal - Modal for updating waypoint status
 * Updated: Port-specific status changes for different locations (Dakar Port, Border, Warehouse)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Portal, Modal, Button } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { WaypointStatus } from '../types/WaypointStatus';
import { ContainerWaypoint, SegmentType } from '../types';
import {
  ExtendedWaypointStatus,
  PortStatusOption,
  QuickAction,
  getLocationCategory,
  getStatusOptionsForLocation,
  getQuickActions,
  getExtendedStatusLabel,
  getExtendedStatusColor,
  getExtendedStatusIcon,
  DISCHARGE_PORT_STATUSES,
  BORDER_STATUSES,
  WAREHOUSE_STATUSES,
  STANDARD_STATUSES,
} from '../types/waypointStatus';

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
  const [status, setStatus] = useState<ExtendedWaypointStatus>('PENDING');
  const [actualArrival, setActualArrival] = useState<Date | null>(null);
  const [actualDeparture, setActualDeparture] = useState<Date | null>(null);
  const [notes, setNotes] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);

  // Reset form when waypoint changes
  useEffect(() => {
    if (waypoint) {
      setStatus(waypoint.status as ExtendedWaypointStatus);
      setActualArrival(waypoint.actualArrival ? new Date(waypoint.actualArrival) : null);
      setActualDeparture(waypoint.actualDeparture ? new Date(waypoint.actualDeparture) : null);
      setNotes(waypoint.notes || '');
    }
  }, [waypoint]);

  // Get location category and available statuses
  const locationCode = waypoint?.location?.portCode || '';
  const locationCategory = getLocationCategory(locationCode);

  const availableStatuses = getStatusOptionsForLocation(locationCode, status);

  const quickActions = locationCode ? getQuickActions(locationCode, status) : [];

  const handleSave = () => {
    const updates: Partial<ContainerWaypoint> & { status?: WaypointStatus } = {
      status: status as WaypointStatus,
      actualArrival: actualArrival?.toISOString(),
      actualDeparture: actualDeparture?.toISOString(),
      notes: notes || undefined,
    };

    // Remove undefined values
    Object.keys(updates).forEach((key) => {
      if (updates[key as keyof typeof updates] === undefined) {
        delete updates[key as keyof typeof updates];
      }
    });

    onSave(waypointIndex, updates);
    onDismiss();
  };

  const handleQuickAction = (action: QuickAction) => {
    setStatus(action.targetStatus);
    // Auto-set actual arrival for arrival actions
    if (action.targetStatus === 'ARRIVED_AT_PORT' && !actualArrival) {
      setActualArrival(new Date());
    }
  };

  const onArrivalChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowArrivalPicker(false);
    if (selectedDate) {
      setActualArrival(selectedDate);
    }
  };

  const onDepartureChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDeparturePicker(false);
    if (selectedDate) {
      setActualDeparture(selectedDate);
    }
  };

  const formatDateTime = (date: Date | null): string => {
    if (!date) return 'Sélectionner une date';
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get location-specific title
  const getLocationTitle = (): string => {
    switch (locationCategory) {
      case 'DISCHARGE_PORT':
        return 'Port de Déchargement';
      case 'BORDER':
        return 'Point de Frontière';
      case 'WAREHOUSE':
        return 'Entrepôt';
      case 'LOADING_PORT':
        return 'Port de Chargement';
      case 'TRANSIT_PORT':
        return 'Port de Transit';
      default:
        return 'Waypoint';
    }
  };

  // Get all possible statuses for dropdown based on location
  const getAllStatusesForLocation = (): PortStatusOption[] => {
    switch (locationCategory) {
      case 'DISCHARGE_PORT':
        return DISCHARGE_PORT_STATUSES;
      case 'BORDER':
        return BORDER_STATUSES;
      case 'WAREHOUSE':
        return WAREHOUSE_STATUSES;
      default:
        return STANDARD_STATUSES;
    }
  };

  const allStatuses = getAllStatusesForLocation();

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
            {/* Header */}
            <View style={styles.header}>
              <View style={[styles.headerIcon, { backgroundColor: getExtendedStatusColor(status) + '20' }]}>
                <Ionicons name="location" size={28} color={getExtendedStatusColor(status)} />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>{getLocationTitle()}</Text>
                <Text style={styles.headerSubtitle}>
                  {waypoint?.location?.city || waypoint?.location?.toString() || 'Location'} 
                  {locationCode && ` (${locationCode})`}
                </Text>
                {locationCategory === 'DISCHARGE_PORT' && (
                  <View style={styles.portBadge}>
                    <Text style={styles.portBadgeText}>🚢 PORT PRINCIPAL</Text>
                  </View>
                )}
                {locationCategory === 'BORDER' && (
                  <View style={[styles.portBadge, { backgroundColor: '#FEF3C7' }]}>
                    <Text style={[styles.portBadgeText, { color: '#D97706' }]}>🛂 FRONTIÈRE</Text>
                  </View>
                )}
                {locationCategory === 'WAREHOUSE' && (
                  <View style={[styles.portBadge, { backgroundColor: '#E0E7FF' }]}>
                    <Text style={[styles.portBadgeText, { color: '#4338CA' }]}>📦 ENTREPÔT</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={Theme.neutral[500]} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Quick Actions Section - Port-specific actions */}
              {quickActions.length > 0 && (
                <Animated.View entering={FadeIn.delay(50)} style={styles.section}>
                  <Text style={styles.sectionTitle}>Actions Rapides</Text>
                  <View style={styles.quickActionsGrid}>
                    {quickActions.map((action) => (
                      <TouchableOpacity
                        key={action.id}
                        style={[styles.quickActionButton, { backgroundColor: action.color + '15' }]}
                        onPress={() => handleQuickAction(action)}
                      >
                        <Ionicons name={action.icon as any} size={20} color={action.color} />
                        <Text style={[styles.quickActionText, { color: action.color }]}>
                          {action.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Animated.View>
              )}

              {/* Status Section with Port-specific Options */}
              <Animated.View entering={FadeIn.delay(100)} style={styles.section}>
                <Text style={styles.sectionTitle}>Statut</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowStatusDropdown(!showStatusDropdown)}
                >
                  <View
                    style={[
                      styles.statusIndicator,
                      { backgroundColor: getExtendedStatusColor(status) },
                    ]}
                  />
                  <Text style={styles.dropdownText}>
                    {getExtendedStatusLabel(status)}
                  </Text>
                  <Ionicons
                    name={showStatusDropdown ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={Theme.neutral[500]}
                  />
                </TouchableOpacity>

                {showStatusDropdown && (
                  <View style={styles.dropdownMenu}>
                    {allStatuses.map((option) => (
                      <TouchableOpacity
                        key={option.status}
                        style={[
                          styles.dropdownItem,
                          status === option.status && styles.dropdownItemActive,
                        ]}
                        onPress={() => {
                          setStatus(option.status);
                          setShowStatusDropdown(false);
                        }}
                      >
                        <View
                          style={[
                            styles.statusIndicator,
                            { backgroundColor: option.color },
                          ]}
                        />
                        <View style={styles.dropdownItemContent}>
                          <Text
                            style={[
                              styles.dropdownItemText,
                              status === option.status && styles.dropdownItemTextActive,
                            ]}
                          >
                            {option.label}
                          </Text>
                          {option.description && (
                            <Text style={styles.dropdownItemDescription}>
                              {option.description}
                            </Text>
                          )}
                        </View>
                        {status === option.status && (
                          <Ionicons name="checkmark" size={18} color={Theme.primary[600]} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Status Flow Indicator */}
                <View style={styles.statusFlowContainer}>
                  <Text style={styles.statusFlowLabel}>Progression:</Text>
                  <View style={styles.statusFlow}>
                    <View style={[styles.statusFlowDot, { backgroundColor: '#10B981' }]} />
                    <View style={styles.statusFlowLine} />
                    <View style={[styles.statusFlowDot, { backgroundColor: getExtendedStatusColor(status) }]} />
                    <View style={styles.statusFlowLine} />
                    <View style={[styles.statusFlowDot, { backgroundColor: Theme.neutral[300] }]} />
                  </View>
                </View>
              </Animated.View>

              {/* Date/Time Section */}
              <Animated.View entering={FadeIn.delay(200)} style={styles.section}>
                <Text style={styles.sectionTitle}>Horaires</Text>

                {/* Actual Arrival */}
                <View style={styles.dateField}>
                  <Text style={styles.dateLabel}>Arrivée Réelle</Text>
                  <TouchableOpacity
                    style={styles.datePicker}
                    onPress={() => setShowArrivalPicker(true)}
                  >
                    <Ionicons name="calendar" size={20} color={Theme.primary[500]} />
                    <Text style={styles.datePickerText}>
                      {formatDateTime(actualArrival)}
                    </Text>
                  </TouchableOpacity>
                  {actualArrival && (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setActualArrival(null)}
                    >
                      <Ionicons name="close-circle" size={18} color={Theme.status.error} />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Actual Departure */}
                <View style={styles.dateField}>
                  <Text style={styles.dateLabel}>Départ Réel</Text>
                  <TouchableOpacity
                    style={styles.datePicker}
                    onPress={() => setShowDeparturePicker(true)}
                  >
                    <Ionicons name="calendar" size={20} color={Theme.primary[500]} />
                    <Text style={styles.datePickerText}>
                      {formatDateTime(actualDeparture)}
                    </Text>
                  </TouchableOpacity>
                  {actualDeparture && (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setActualDeparture(null)}
                    >
                      <Ionicons name="close-circle" size={18} color={Theme.status.error} />
                    </TouchableOpacity>
                  )}
                </View>

                {showArrivalPicker && (
                  <DateTimePicker
                    value={actualArrival || new Date()}
                    mode="datetime"
                    display="default"
                    onChange={onArrivalChange}
                  />
                )}

                {showDeparturePicker && (
                  <DateTimePicker
                    value={actualDeparture || new Date()}
                    mode="datetime"
                    display="default"
                    onChange={onDepartureChange}
                  />
                )}
              </Animated.View>

              {/* Port-specific Details Section */}
              {locationCategory === 'DISCHARGE_PORT' && (
                <Animated.View entering={FadeIn.delay(250)} style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="boat" size={18} color={Theme.status.info} />
                    <Text style={styles.sectionTitle}>Détails Portuaires</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Ionicons name="information-circle" size={20} color={Theme.status.info} />
                    <Text style={styles.infoText}>
                      Pour les détails du navire (nom, IMO, etc.), utilisez l'onglet "Segments Maritimes"
                    </Text>
                  </View>
                </Animated.View>
              )}

              {locationCategory === 'BORDER' && (
                <Animated.View entering={FadeIn.delay(250)} style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="flag" size={18} color={Theme.status.warning} />
                    <Text style={styles.sectionTitle}>Informations Frontière</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Ionicons name="information-circle" size={20} color={Theme.status.warning} />
                    <Text style={styles.infoText}>
                      Pour les détails du transport routier, utilisez l'onglet "Segments Routiers"
                    </Text>
                  </View>
                </Animated.View>
              )}

              {/* Notes Section */}
              <Animated.View entering={FadeIn.delay(300)} style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="document-text" size={18} color={Theme.neutral[500]} />
                  <Text style={styles.sectionTitle}>Notes</Text>
                </View>
                <TextInput
                  style={[styles.textInput, styles.notesInput]}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Ajoutez des notes ou commentaires..."
                  placeholderTextColor={Theme.neutral[400]}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </Animated.View>

              {/* Document Upload Section */}
              {onUploadDocument && (
                <Animated.View entering={FadeIn.delay(350)} style={styles.section}>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => onUploadDocument(waypointIndex)}
                  >
                    <Ionicons name="cloud-upload" size={24} color={Theme.primary[600]} />
                    <Text style={styles.uploadButtonText}>Télécharger un Document</Text>
                    <Text style={styles.uploadButtonSubtext}>
                      Manifest, BL, ou autres documents
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              )}

              {/* Footer Spacer */}
              <View style={styles.footerSpacer} />
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.footer}>
              <Button
                mode="outlined"
                onPress={onDismiss}
                style={styles.cancelButton}
                labelStyle={styles.cancelButtonLabel}
              >
                Annuler
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                style={styles.saveButton}
                labelStyle={styles.saveButtonLabel}
              >
                Enregistrer
              </Button>
            </View>
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
    backgroundColor: Theme.neutral.white,
    borderTopLeftRadius: Theme.radius['3xl'],
    borderTopRightRadius: Theme.radius['3xl'],
    maxHeight: '90%',
    ...Theme.shadows.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  headerSubtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  portBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    alignSelf: 'flex-start',
    marginTop: Theme.spacing.xs,
  },
  portBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  closeButton: {
    padding: Theme.spacing.sm,
  },
  scrollView: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.xs,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[50],
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dropdownText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  dropdownMenu: {
    backgroundColor: Theme.neutral.white,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.lg,
    marginTop: Theme.spacing.sm,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  dropdownItemActive: {
    backgroundColor: Theme.primary[50],
  },
  dropdownItemContent: {
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 14,
    color: Theme.neutral[700],
  },
  dropdownItemTextActive: {
    fontWeight: '600',
    color: Theme.primary[600],
  },
  dropdownItemDescription: {
    fontSize: 11,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  statusFlowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.sm,
  },
  statusFlowLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginRight: Theme.spacing.md,
  },
  statusFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusFlowDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusFlowLine: {
    flex: 1,
    height: 2,
    backgroundColor: Theme.neutral[300],
    marginHorizontal: 4,
  },
  dateField: {
    marginBottom: Theme.spacing.md,
  },
  dateLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.xs,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[50],
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  datePickerText: {
    flex: 1,
    fontSize: 15,
    color: Theme.neutral[800],
  },
  clearButton: {
    position: 'absolute',
    right: Theme.spacing.md,
    top: 32,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.primary[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[600],
  },
  textInput: {
    backgroundColor: Theme.neutral[50],
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    fontSize: 15,
    color: Theme.neutral[800],
  },
  notesInput: {
    height: 100,
    paddingTop: Theme.spacing.md,
  },
  uploadButton: {
    backgroundColor: Theme.primary[50],
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Theme.primary[200],
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  uploadButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.primary[600],
  },
  uploadButtonSubtext: {
    fontSize: 12,
    color: Theme.neutral[500],
  },
  footerSpacer: {
    height: Theme.spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    padding: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
  },
  cancelButton: {
    flex: 1,
    borderColor: Theme.neutral[300],
  },
  cancelButtonLabel: {
    color: Theme.neutral[600],
  },
  saveButton: {
    flex: 2,
    backgroundColor: Theme.primary[600],
  },
  saveButtonLabel: {
    color: '#FFF',
    fontWeight: '700',
  },
});

export default WaypointUpdateModal;
