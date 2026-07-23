import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Dialog, Portal, Switch, Text, TextInput } from 'react-native-paper';
import type { WarehousePrinter } from '@src/entities/goodsPackage';
import type { PrinterFormInput } from '../hooks/usePrinterManagement';
import { styles } from './styles';

interface Props { visible: boolean; printer: WarehousePrinter | null; saving: boolean; onDismiss: () => void; onSave: (input: PrinterFormInput) => void }

const initial = (printer: WarehousePrinter | null): PrinterFormInput => printer ? {
  code: printer.code, name: printer.name, warehouseLocation: printer.warehouseLocation,
  protocol: 'NETWORK_ZPL', host: printer.host, port: printer.port, dpi: printer.dpi,
  labelWidthMm: printer.labelWidthMm, labelHeightMm: printer.labelHeightMm,
  isDefault: printer.isDefault, isActive: printer.isActive,
} : { code: '', name: '', warehouseLocation: '', protocol: 'NETWORK_ZPL', host: '', port: 9100, dpi: 203, labelWidthMm: 102, labelHeightMm: 51, isDefault: false, isActive: true };

export const PrinterFormDialog: React.FC<Props> = ({ visible, printer, saving, onDismiss, onSave }) => {
  const [form, setForm] = useState<PrinterFormInput>(() => initial(printer));
  useEffect(() => { if (visible) setForm(initial(printer)); }, [visible, printer]);
  const set = <K extends keyof PrinterFormInput>(key: K, value: PrinterFormInput[K]) => setForm((current) => ({ ...current, [key]: value }));
  const valid = form.code.trim() && form.name.trim() && form.warehouseLocation.trim() && form.host.trim() && form.port > 0;

  return <Portal><Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
    <Dialog.Title>{printer ? 'Modifier l’imprimante' : 'Ajouter une imprimante'}</Dialog.Title>
    <ScrollView style={styles.dialogScroll} keyboardShouldPersistTaps="handled">
      <View style={styles.row}><TextInput style={[styles.input, styles.half]} mode="outlined" label="Code" autoCapitalize="characters" value={form.code} onChangeText={(value) => set('code', value)} /><TextInput style={[styles.input, styles.half]} mode="outlined" label="Emplacement" value={form.warehouseLocation} onChangeText={(value) => set('warehouseLocation', value)} /></View>
      <TextInput style={styles.input} mode="outlined" label="Nom affiché" value={form.name} onChangeText={(value) => set('name', value)} />
      <TextInput style={styles.input} mode="outlined" label="Adresse IP ou nom réseau" autoCapitalize="none" autoCorrect={false} value={form.host} onChangeText={(value) => set('host', value)} />
      <View style={styles.row}><TextInput style={[styles.input, styles.half]} mode="outlined" label="Port" keyboardType="number-pad" value={String(form.port)} onChangeText={(value) => set('port', Number(value) || 0)} /><TextInput style={[styles.input, styles.half]} mode="outlined" label="DPI (203/300)" keyboardType="number-pad" value={String(form.dpi)} onChangeText={(value) => set('dpi', Number(value) === 300 ? 300 : 203)} /></View>
      <View style={styles.row}><TextInput style={[styles.input, styles.half]} mode="outlined" label="Largeur mm" keyboardType="decimal-pad" value={String(form.labelWidthMm)} onChangeText={(value) => set('labelWidthMm', Number(value) || 0)} /><TextInput style={[styles.input, styles.half]} mode="outlined" label="Hauteur mm" keyboardType="decimal-pad" value={String(form.labelHeightMm)} onChangeText={(value) => set('labelHeightMm', Number(value) || 0)} /></View>
      <View style={styles.switchRow}><Text style={styles.switchLabel}>Imprimante active</Text><Switch value={form.isActive} onValueChange={(value) => set('isActive', value)} /></View>
      <View style={styles.switchRow}><Text style={styles.switchLabel}>Utiliser par défaut à cet emplacement</Text><Switch value={form.isDefault} onValueChange={(value) => set('isDefault', value)} /></View>
    </ScrollView>
    <Dialog.Actions><Button onPress={onDismiss}>Annuler</Button><Button mode="contained" loading={saving} disabled={!valid || saving} onPress={() => onSave(form)}>Enregistrer</Button></Dialog.Actions>
  </Dialog></Portal>;
};
