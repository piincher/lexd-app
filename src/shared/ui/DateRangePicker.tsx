import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { Text, Button, IconButton, Card } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { DateRangePickerProps, DateRangePreset } from './DateRangePicker.types';
import { getPresetRange } from './DateRangePicker.utils';
import { createStyles } from './DateRangePicker.styles';
import { PresetGrid } from './PresetGrid';
import { CustomDateSection } from './CustomDateSection';
import { DateRangeSummary } from './DateRangeSummary';

export { DateRangePreset, DateRange } from './DateRangePicker.types';

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
  const styles = createStyles(colors);

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
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sélectionner une période</Text>
            <IconButton icon="close" size={20} onPress={handleCancel} />
          </View>

          <PresetGrid
            selectedPreset={selectedPreset}
            onSelect={handlePresetSelect}
            colors={colors}
            styles={styles}
          />

          {selectedPreset === 'custom' && (
            <CustomDateSection
              startDate={startDate}
              endDate={endDate}
              onStartPress={() => setShowStartPicker(true)}
              onEndPress={() => setShowEndPicker(true)}
              colors={colors}
              styles={styles}
            />
          )}

          <DateRangeSummary startDate={startDate} endDate={endDate} styles={styles} />

          <View style={styles.buttonContainer}>
            <Button mode="outlined" onPress={handleCancel} style={styles.cancelButton}>
              Annuler
            </Button>
            <Button mode="contained" onPress={handleConfirm} style={styles.confirmButton}>
              Appliquer
            </Button>
          </View>
        </Card>
      </View>

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

export default DateRangePicker;
