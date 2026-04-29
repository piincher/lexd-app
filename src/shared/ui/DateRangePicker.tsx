/**
 * Date Range Picker Component
 * Reusable component for selecting date ranges with presets
 */

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Text, Button, IconButton, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

// ============================================
// TYPES
// ============================================

export type DateRangePreset = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateRangePickerProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (range: DateRange, preset: DateRangePreset) => void;
  initialRange?: DateRange;
  initialPreset?: DateRangePreset;
  minDate?: Date;
  maxDate?: Date;
}

interface PresetOption {
  key: DateRangePreset;
  label: string;
  icon: string;
}

// ============================================
// PRESET CONFIGURATION
// ============================================

const PRESETS: PresetOption[] = [
  { key: 'today', label: "Aujourd'hui", icon: 'calendar-today' },
  { key: 'week', label: 'Cette semaine', icon: 'calendar-week' },
  { key: 'month', label: 'Ce mois', icon: 'calendar-month' },
  { key: 'quarter', label: 'Ce trimestre', icon: 'calendar-range' },
  { key: 'year', label: 'Cette année', icon: 'calendar' },
  { key: 'custom', label: 'Personnalisé', icon: 'calendar-edit' },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

const getPresetRange = (preset: DateRangePreset): DateRange => {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  switch (preset) {
    case 'today':
      // startDate is already today at 00:00
      break;
    case 'week':
      // Start of current week (Monday)
      const dayOfWeek = startDate.getDay();
      const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      startDate.setDate(diff);
      break;
    case 'month':
      startDate.setDate(1);
      break;
    case 'quarter':
      const currentQuarter = Math.floor(startDate.getMonth() / 3);
      startDate.setMonth(currentQuarter * 3, 1);
      break;
    case 'year':
      startDate.setMonth(0, 1);
      break;
    case 'custom':
    default:
      // Default to last 30 days for custom
      startDate.setDate(startDate.getDate() - 30);
      break;
  }

  return { startDate, endDate };
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// ============================================
// MAIN COMPONENT
// ============================================

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  visible,
  onDismiss,
  onConfirm,
  initialRange,
  initialPreset = 'month',
  minDate,
  maxDate,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  
  const [selectedPreset, setSelectedPreset] = useState<DateRangePreset>(initialPreset);
  const [startDate, setStartDate] = useState<Date>(initialRange?.startDate || getPresetRange('month').startDate);
  const [endDate, setEndDate] = useState<Date>(initialRange?.endDate || getPresetRange('month').endDate);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handlePresetSelect = (preset: DateRangePreset) => {
    setSelectedPreset(preset);
    const range = getPresetRange(preset);
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };

  const handleStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowStartPicker(false);
    if (date) {
      // Ensure start date is not after end date
      if (date > endDate) {
        setStartDate(date);
        setEndDate(date);
      } else {
        setStartDate(date);
      }
      setSelectedPreset('custom');
    }
  };

  const handleEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowEndPicker(false);
    if (date) {
      // Ensure end date is not before start date
      if (date < startDate) {
        setStartDate(date);
        setEndDate(date);
      } else {
        setEndDate(date);
      }
      setSelectedPreset('custom');
    }
  };

  const handleConfirm = () => {
    onConfirm({ startDate, endDate }, selectedPreset);
  };

  const handleCancel = () => {
    // Reset to initial values
    setSelectedPreset(initialPreset);
    if (initialRange) {
      setStartDate(initialRange.startDate);
      setEndDate(initialRange.endDate);
    }
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <Card style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sélectionner une période</Text>
            <IconButton
              icon="close"
              size={20}
              onPress={handleCancel}
            />
          </View>

          {/* Preset Options */}
          <View style={styles.presetsContainer}>
            {PRESETS.map((preset) => (
              <TouchableOpacity
                key={preset.key}
                style={[
                  styles.presetButton,
                  selectedPreset === preset.key && styles.presetButtonActive,
                ]}
                onPress={() => handlePresetSelect(preset.key)}
              >
                <MaterialCommunityIcons
                  name={preset.icon as any}
                  size={20}
                  color={selectedPreset === preset.key ? colors.text.inverse : colors.text.secondary}
                />
                <Text
                  style={[
                    styles.presetLabel,
                    selectedPreset === preset.key && styles.presetLabelActive,
                  ]}
                >
                  {preset.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Date Selection */}
          {selectedPreset === 'custom' && (
            <View style={styles.customDateContainer}>
              <Text style={styles.customDateTitle}>Dates personnalisées</Text>
              
              {/* Start Date */}
              <TouchableOpacity
                style={styles.dateField}
                onPress={() => setShowStartPicker(true)}
              >
                <MaterialCommunityIcons name="calendar-start" size={20} color={colors.text.secondary} />
                <View style={styles.dateFieldContent}>
                  <Text style={styles.dateFieldLabel}>Date de début</Text>
                  <Text style={styles.dateFieldValue}>{formatDate(startDate)}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.muted} />
              </TouchableOpacity>

              {/* End Date */}
              <TouchableOpacity
                style={styles.dateField}
                onPress={() => setShowEndPicker(true)}
              >
                <MaterialCommunityIcons name="calendar-end" size={20} color="#6B7280" />
                <View style={styles.dateFieldContent}>
                  <Text style={styles.dateFieldLabel}>Date de fin</Text>
                  <Text style={styles.dateFieldValue}>{formatDate(endDate)}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.muted} />
              </TouchableOpacity>
            </View>
          )}

          {/* Selected Range Summary */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryLabel}>Période sélectionnée:</Text>
            <Text style={styles.summaryValue}>
              {formatDate(startDate)} - {formatDate(endDate)}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              Annuler
            </Button>
            <Button
              mode="contained"
              onPress={handleConfirm}
              style={styles.confirmButton}
            >
              Appliquer
            </Button>
          </View>
        </Card>
      </View>

      {/* Date Pickers */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
          minimumDate={minDate}
          maximumDate={maxDate || endDate}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          minimumDate={startDate}
          maximumDate={maxDate}
        />
      )}
    </Modal>
  );
};

// ============================================
// STYLES
// ============================================

const createStyles = (colors: any) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  presetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  presetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  presetButtonActive: {
    backgroundColor: colors.status.info,
    borderColor: colors.status.info,
  },
  presetLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  presetLabelActive: {
    color: colors.text.inverse,
  },
  customDateContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: colors.background.paper,
    borderRadius: 12,
  },
  customDateTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.background.card,
    borderRadius: 8,
    marginBottom: 8,
  },
  dateFieldContent: {
    flex: 1,
    marginLeft: 12,
  },
  dateFieldLabel: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  dateFieldValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 2,
  },
  summaryContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderColor: colors.border,
  },
  confirmButton: {
    flex: 1,
  },
});

export default DateRangePicker;
