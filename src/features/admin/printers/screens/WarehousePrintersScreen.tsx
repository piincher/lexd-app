import React, { useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { Button, FAB, Text } from 'react-native-paper';
import type { RootStackScreenProps } from '@src/app/navigation/type';
import { Screen } from '@src/shared/ui';
import { printErrorMessage, type LabelPrintJobSummary, type WarehousePrinter } from '@src/entities/goodsPackage';
import { PrinterCard } from '../components/PrinterCard';
import { PrinterFormDialog } from '../components/PrinterFormDialog';
import { PrintJobHistory } from '../components/PrintJobHistory';
import { styles } from '../components/styles';
import { usePrinterManagement, type PrinterFormInput, type PrintJobAction } from '../hooks/usePrinterManagement';

export default function WarehousePrintersScreen({ navigation }: RootStackScreenProps<'WarehousePrinters'>) {
  const manager = usePrinterManagement();
  const [editing, setEditing] = useState<WarehousePrinter | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const open = (printer: WarehousePrinter | null) => { setEditing(printer); setDialogVisible(true); };
  const save = (input: PrinterFormInput) => manager.save.mutate({ id: editing?._id, input }, { onSuccess: () => setDialogVisible(false), onError: (error) => Alert.alert('Erreur', error.message) });
  const test = (printer: WarehousePrinter) => manager.test.mutate(printer, { onSuccess: (result) => Alert.alert('Connexion réussie', `Imprimante joignable en ${result.durationMs} ms.`), onError: (error) => Alert.alert('Connexion impossible', printErrorMessage(error, 'Connexion impossible.')) });
  const recover = (job: LabelPrintJobSummary, action: PrintJobAction) => {
    const run = () => manager.recoverJob.mutate({ jobId: job.jobId, action }, { onError: (error) => Alert.alert('Action impossible', printErrorMessage(error, 'Action impossible.')) });
    if (action === 'CONFIRM_PRINTED') Alert.alert('Confirmer l’impression', 'Confirmez uniquement si les étiquettes sont physiquement sorties de l’imprimante.', [{ text: 'Retour', style: 'cancel' }, { text: 'Confirmer', onPress: run }]);
    else if (action === 'MARK_FAILED') Alert.alert('Marquer non imprimé', 'Aucune étiquette n’est sortie pour ce travail ?', [{ text: 'Retour', style: 'cancel' }, { text: 'Confirmer', style: 'destructive', onPress: run }]);
    else run();
  };

  return <>
    <Screen header={{ title: 'Imprimantes d’étiquettes', showBack: true, onBackPress: navigation.goBack }} contentStyle={styles.screenContent}>
      <Text style={styles.intro}>Configurez les imprimantes ZPL accessibles sur le même réseau Wi-Fi/LAN que les téléphones de l’entrepôt. Le port Zebra standard est 9100.</Text>
      {manager.isLoading ? <View style={styles.state}><ActivityIndicator /><Text>Chargement…</Text></View> : null}
      {manager.error ? <View style={styles.state}><Text>Impossible de charger les imprimantes.</Text><Button onPress={() => manager.refetch()}>Réessayer</Button></View> : null}
      {!manager.isLoading && !manager.error && !manager.printers.length ? <View style={styles.state}><Text>Aucune imprimante configurée.</Text><Button mode="outlined" icon="plus" onPress={() => open(null)}>Ajouter la première</Button></View> : null}
      {manager.printers.map((printer) => <PrinterCard key={printer._id} printer={printer} testing={manager.test.isPending && manager.test.variables?._id === printer._id} onEdit={() => open(printer)} onTest={() => test(printer)} onToggle={() => manager.update.mutate({ id: printer._id, input: { isActive: !printer.isActive } })} />)}
      <PrintJobHistory jobs={manager.jobs} pendingJobId={manager.recoverJob.isPending ? manager.recoverJob.variables?.jobId : undefined} onAction={recover} />
    </Screen>
    <FAB icon="plus" label="Ajouter" style={styles.fab} onPress={() => open(null)} />
    <PrinterFormDialog visible={dialogVisible} printer={editing} saving={manager.save.isPending} onDismiss={() => setDialogVisible(false)} onSave={save} />
  </>;
}
