import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { Button, Checkbox, IconButton, Menu, Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { usePackageLabelPrintModal } from '../../hooks/usePackageLabelPrintModal';
import { styles } from './styles';
import { printErrorMessage, useReplacePackageLabel } from '@src/entities/goodsPackage';
import { LabelReplacementDialog } from './LabelReplacementDialog';

interface Props { goodsId: string; visible: boolean; onPrinted: () => void }

export const PackageLabelPrintPanel: React.FC<Props> = ({ goodsId, visible, onPrinted }) => {
  const { colors } = useAppTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [replacementId, setReplacementId] = useState<string | null>(null);
  const state = usePackageLabelPrintModal(goodsId, visible);
  const replacement = useReplacePackageLabel(goodsId);
  const selectedPrinter = state.printers.find((printer) => printer._id === state.printerId);

  if (state.isLoading) return <View style={styles.state}><ActivityIndicator /><Text>Préparation des étiquettes…</Text></View>;
  if (state.isError) return <View style={styles.state}><MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.error} /><Text>Impossible de charger les étiquettes.</Text><Button onPress={state.retry}>Réessayer</Button></View>;
  if (!state.packages.length) return <View style={styles.state}><MaterialCommunityIcons name="package-variant" size={42} color={colors.text.disabled} /><Text>Aucun colis physique trouvé.</Text></View>;

  const handlePrint = async () => {
    try {
      await state.print();
      onPrinted();
    } catch {
      // The mutation exposes the actionable error directly in the panel.
    }
  };

  return <>
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.toolbar}>
        <Text style={[styles.count, { color: colors.text.secondary }]}>{state.selectedIds.length}/{state.packages.length} sélectionné(s)</Text>
        <Button compact onPress={state.selectAll}>Tout sélectionner</Button>
      </View>
      {state.packages.map((item) => {
        const label = item.label;
        const selected = !!label && state.selectedIds.includes(label.labelId);
        return <Pressable key={item._id} disabled={!label} onPress={() => label && state.toggle(label.labelId)} style={[styles.row, { borderColor: selected ? colors.primary.main : colors.border, backgroundColor: colors.background.paper }]}>
          <Checkbox status={selected ? 'checked' : 'unchecked'} disabled={!label} onPress={() => label && state.toggle(label.labelId)} />
          <View style={styles.rowText}>
            <Text style={[styles.packageCode, { color: colors.text.primary }]}>{item.packageCode}</Text>
            <Text style={[styles.packageMeta, { color: colors.text.secondary }]}>Colis {item.sequence}/{item.packageCount} · {item.weight.toFixed(2)} kg</Text>
            {(label?.printCount || 0) > 0 ? <Text style={[styles.printed, { color: colors.status.warning }]}>Déjà imprimée {label?.printCount} fois</Text> : null}
          </View>
          <IconButton icon="label-off-outline" accessibilityLabel={`Remplacer l’étiquette ${item.packageCode}`} onPress={(event) => { event.stopPropagation(); setReplacementId(item._id); }} />
        </Pressable>;
      })}
      <Text style={[styles.fieldLabel, { color: colors.text.secondary }]}>IMPRIMANTE</Text>
      {state.printers.length ? <Menu visible={menuVisible} onDismiss={() => setMenuVisible(false)} anchor={
        <Pressable onPress={() => setMenuVisible(true)} style={[styles.printerButton, { borderColor: colors.border }]}>
          <View style={styles.printerRow}><Text style={[styles.printerName, { color: colors.text.primary }]}>{selectedPrinter?.name || 'Choisir'}</Text><MaterialCommunityIcons name="chevron-down" size={22} color={colors.text.secondary} /></View>
        </Pressable>}>
        {state.printers.map((printer) => <Menu.Item key={printer._id} title={`${printer.name} · ${printer.warehouseLocation}`} onPress={() => { state.setPrinterId(printer._id); setMenuVisible(false); }} />)}
      </Menu> : <Text style={[styles.hint, { color: colors.status.error }]}>Aucune imprimante active. Configurez une imprimante réseau dans les outils administrateur.</Text>}
      {state.needsReason ? <TextInput mode="outlined" label="Motif de réimpression" value={state.reprintReason} onChangeText={state.setReprintReason} maxLength={300} style={styles.reasonInput} /> : null}
      <Text style={[styles.hint, { color: colors.text.secondary }]}>Android envoie directement le ZPL à l’imprimante réseau. iPhone ouvre le dialogue d’impression système.</Text>
    </ScrollView>
    <View style={[styles.footer, { borderTopColor: colors.border }]}>
      {state.error ? <Text style={[styles.error, { color: colors.status.error }]}>{printErrorMessage(state.error)}</Text> : null}
      <Button mode="contained" icon="printer" loading={state.isPrinting} disabled={!state.canPrint || state.isPrinting} onPress={handlePrint} style={styles.printButton}>Imprimer {state.selectedIds.length || ''}</Button>
    </View>
    <LabelReplacementDialog packageCode={state.packages.find((item) => item._id === replacementId)?.packageCode} visible={!!replacementId} loading={replacement.isPending} onDismiss={() => setReplacementId(null)} onConfirm={(reason) => replacement.mutate({ packageId: replacementId as string, reason }, { onSuccess: () => setReplacementId(null) })} />
  </>;
};
