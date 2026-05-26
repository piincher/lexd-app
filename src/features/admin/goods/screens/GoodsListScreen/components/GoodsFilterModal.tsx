/**
 * GoodsFilterModal - Advanced filter bottom sheet
 * Client selector + Date range picker
 */

import React, { useState, useCallback } from 'react';
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text, Button, Chip, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { userData } from '@src/shared/types/user';
import { ClientSearchSection } from '../../../components/ClientSearchSection';
import { DateRangePicker, DateRange, DateRangePreset } from '@src/components/DateRangePicker';
import { createStyles } from './GoodsFilterModal.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsFilterModalProps {
  visible: boolean;
  onDismiss: () => void;
  selectedClient: userData | null;
  onSelectClient: (client: userData | null) => void;
  dateRange: { startDate: string; endDate: string } | null;
  onDateRangeChange: (range: { startDate: string; endDate: string } | null) => void;
  onClear: () => void;
}

export const GoodsFilterModal: React.FC<GoodsFilterModalProps> = ({
  visible,
  onDismiss,
  selectedClient,
  onSelectClient,
  dateRange,
  onDateRangeChange,
  onClear,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateConfirm = useCallback((range: DateRange, _preset: DateRangePreset) => {
    onDateRangeChange({
      startDate: range.startDate.toISOString(),
      endDate: range.endDate.toISOString(),
    });
    setShowDatePicker(false);
  }, [onDateRangeChange]);

  const formatRange = (range: { startDate: string; endDate: string }) => {
    const start = new Date(range.startDate).toLocaleDateString('fr-FR');
    const end = new Date(range.endDate).toLocaleDateString('fr-FR');
    return `${start} - ${end}`;
  };

  const hasFilters = !!selectedClient || !!dateRange;

  const { colors, isDark } = useAppTheme();

  const styles = createStyles(colors, isDark);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtres avancés</Text>
            <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.neutral[600]} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
            {/* Client Selector */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Client</Text>
              <ClientSearchSection
                selectedClient={selectedClient}
                onSelectClient={onSelectClient}
              />
            </View>

            {/* Date Range */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Période de réception</Text>
              {dateRange ? (
                <View style={styles.dateChipRow}>
                  <Chip icon="calendar" onClose={() => onDateRangeChange(null)} style={styles.dateChip}>
                    {formatRange(dateRange)}
                  </Chip>
                </View>
              ) : (
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                  <Ionicons name="calendar-outline" size={20} color={colors.primary[500]} />
                  <Text style={styles.dateButtonText}>Choisir une période</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              mode="outlined"
              onPress={onClear}
              disabled={!hasFilters}
              style={styles.clearButton}
            >
              Réinitialiser
            </Button>
            <Button mode="contained" onPress={onDismiss} style={styles.applyButton}>
              Appliquer
            </Button>
          </View>
        </Card>
      </View>

      <DateRangePicker
        visible={showDatePicker}
        onDismiss={() => setShowDatePicker(false)}
        onConfirm={handleDateConfirm}
        initialRange={dateRange ? {
          startDate: new Date(dateRange.startDate),
          endDate: new Date(dateRange.endDate),
        } : undefined}
      />
    </Modal>
  );
};

export default GoodsFilterModal;
