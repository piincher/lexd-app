/**
 * GoodsPdfExportScreen
 *
 * Screen for selecting a date range and exporting goods as PDF
 */

import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button, Chip, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { DateRangePicker, DateRange, DateRangePreset } from '@src/components/DateRangePicker';
import { format } from 'date-fns/format';
import { useGoodsPdfExport } from '../hooks/useGoodsPdfExport';

export const GoodsPdfExportScreen: React.FC = () => {
  const navigation = useNavigation();
  const params = (useRoute().params || {}) as { startDate?: string; endDate?: string };
  const [start, setStart] = useState<string | null>(params.startDate || null);
  const [end, setEnd] = useState<string | null>(params.endDate || null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const { isLoading, goodsCount, fetchPreview, exportPdf } = useGoodsPdfExport();

  useEffect(() => {
    if (start && end) fetchPreview({ startDate: start, endDate: end });
  }, [start, end, fetchPreview]);

  const onConfirm = useCallback((range: DateRange, _preset: DateRangePreset) => {
    setStart(range.startDate.toISOString());
    setEnd(range.endDate.toISOString());
    setPickerVisible(false);
  }, []);

  const onExport = useCallback(() => {
    if (start && end) exportPdf({ startDate: start, endDate: end });
  }, [start, end, exportPdf]);

  const fmt = (d: string) => format(new Date(d), 'dd/MM/yyyy');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Theme.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.title}>Exporter en PDF</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.label}>Période d'export</Text>
        {start && end ? (
          <Chip
            icon="calendar"
            onClose={() => { setStart(null); setEnd(null); }}
            style={styles.chip}
          >
            {fmt(start)} - {fmt(end)}
          </Chip>
        ) : (
          <TouchableOpacity style={styles.dateBtn} onPress={() => setPickerVisible(true)}>
            <Ionicons name="calendar-outline" size={20} color={Theme.primary[500]} />
            <Text style={styles.dateBtnText}>Choisir une période</Text>
          </TouchableOpacity>
        )}

        {start && end && (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Marchandises trouvées</Text>
            {isLoading && goodsCount === 0 ? (
              <ActivityIndicator size="small" color={Theme.primary[500]} />
            ) : (
              <Text style={styles.cardValue}>{goodsCount}</Text>
            )}
          </View>
        )}

        <Button
          mode="contained"
          onPress={onExport}
          disabled={!start || !end || isLoading}
          loading={isLoading}
          style={styles.exportBtn}
          icon="file-pdf-box"
        >
          Générer le PDF
        </Button>
      </ScrollView>

      <DateRangePicker
        visible={pickerVisible}
        onDismiss={() => setPickerVisible(false)}
        onConfirm={onConfirm}
        initialRange={start && end ? { startDate: new Date(start), endDate: new Date(end) } : undefined}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F7FC' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Theme.spacing.xl, paddingVertical: Theme.spacing.lg },
  backButton: { padding: 4, width: 32 },
  title: { fontSize: 18, fontWeight: '700', color: Theme.neutral[800] },
  body: { padding: Theme.spacing.xl },
  label: { fontSize: 14, fontWeight: '600', color: Theme.neutral[600], marginBottom: Theme.spacing.md, textTransform: 'uppercase', letterSpacing: 0.5 },
  dateBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 12, borderRadius: Theme.radius.lg, borderWidth: 1, borderColor: Theme.neutral[200], backgroundColor: Theme.neutral[50], marginBottom: Theme.spacing.xl },
  dateBtnText: { fontSize: 14, fontWeight: '500', color: Theme.neutral[700] },
  chip: { backgroundColor: Theme.primary[50], marginBottom: Theme.spacing.xl, alignSelf: 'flex-start' },
  card: { backgroundColor: Theme.neutral.white, borderRadius: Theme.radius.xl, padding: Theme.spacing.xl, marginBottom: Theme.spacing.xl, ...Theme.shadows.sm, alignItems: 'center' },
  cardLabel: { fontSize: 14, fontWeight: '600', color: Theme.neutral[500], marginBottom: 4 },
  cardValue: { fontSize: 32, fontWeight: '800', color: Theme.primary[600] },
  exportBtn: { marginTop: Theme.spacing.lg, borderRadius: Theme.radius.lg },
});

export default GoodsPdfExportScreen;
