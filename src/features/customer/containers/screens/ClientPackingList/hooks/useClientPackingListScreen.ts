import { useState, useCallback, useMemo } from 'react';
import { Alert, Linking, Platform, Share } from 'react-native';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CUSTOMER_CONTAINER_STATUS_LABELS, customerStatusLabel } from '@src/shared/lib/customerStatus';
import { useGetMyPackingList, useDownloadPackingListPDF } from '../../../hooks/useCustomerContainers';

export const useClientPackingListScreen = (containerId: string) => {
  const { colors } = useAppTheme();
  const [contactDialogVisible, setContactDialogVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const { data: packingList, isLoading, isError, error, refetch, isFetching } = useGetMyPackingList(containerId);
  const downloadMutation = useDownloadPackingListPDF();

  const showSnackbar = useCallback((msg: string) => { setSnackbarMessage(msg); setSnackbarVisible(true); }, []);
  const handleRefresh = useCallback(() => refetch(), [refetch]);
  const handleCallConsignee = useCallback(() => {
    if (packingList?.consignee?.phone) Linking.openURL(`tel:${packingList.consignee.phone}`);
    setContactDialogVisible(false);
  }, [packingList]);
  const handleOpenMaps = useCallback(() => {
    if (packingList?.consignee?.warehouseAddress) Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(packingList.consignee.warehouseAddress)}`);
  }, [packingList]);
  const formatDate = useCallback((d?: string) => d ? format(new Date(d), 'dd MMMM yyyy', { locale: fr }) : 'Non disponible', []);
  const formatDateTime = useCallback((d?: string | null) => d ? format(new Date(d), 'dd MMMM yyyy HH:mm', { locale: fr }) : 'Non disponible', []);
  const getShippingModeIcon = useCallback((m: string) => m === 'SEA' ? 'ferry' : 'airplane', []);
  const getStatusColor = useCallback((s: string) => ({ BOOKED: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info }, EMPTY_TO_WAREHOUSE: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info }, LOADING: { bg: colors.feedback.warningBg, text: colors.status.warning, icon: colors.status.warning }, LOADED: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info }, GATE_IN_FULL: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info }, LOADED_ON_VESSEL: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info }, IN_TRANSIT: { bg: colors.feedback.infoBg, text: colors.status.info, icon: colors.status.info }, ARRIVED: { bg: colors.feedback.successBg, text: colors.status.success, icon: colors.status.success }, DISCHARGED: { bg: colors.feedback.successBg, text: colors.status.success, icon: colors.status.success }, READY_FOR_PICKUP: { bg: colors.feedback.warningBg, text: colors.status.warning, icon: colors.status.warning }, DELIVERED: { bg: colors.feedback.successBg, text: colors.status.success, icon: colors.status.success } }[s] || { bg: colors.background.paper, text: colors.text.secondary, icon: colors.text.secondary }), [colors]);
  const getStatusLabel = useCallback((s?: string | null) => customerStatusLabel(CUSTOMER_CONTAINER_STATUS_LABELS, s), []);
  const statusColors = useMemo(() => packingList?.tracking ? getStatusColor(packingList.tracking.status) : { bg: colors.background.paper, text: colors.text.secondary, icon: colors.text.secondary }, [packingList, getStatusColor]);
  const generateShareText = useCallback(() => {
    if (!packingList) return '';
    const { containerNumber, shippingLineLabel, route, consignee, items, summary } = packingList;
    const tracking = packingList.tracking || {};
    const signature = packingList.signature;
    const loadDate = packingList.schedule?.loadDate || tracking.loadingCompletedAt;
    const dakarPortArrivalAt = packingList.schedule?.dakarPortArrivalAt || tracking.dakarPortArrivalAt || tracking.estimatedArrival;
    const totalQuantity = items.reduce((sum: number, it) => sum + (it.quantity || 1), 0);
    const itemLines = items.map((it, i: number) => `${(i + 1).toString().padStart(2)}  ${it.goodsId.slice(-8).padEnd(11)}  ${(it.description || '-').slice(0, 20).padEnd(20)}  ${(it.quantity || 1).toString().padStart(3)}  ${it.actualCBM.toFixed(2).padStart(5)}  ${`${it.weight || 0}kg`.padStart(6)}`);
    return ['═══════════════════════════════════════', '       LISTE DE COLISAGE CLIENT', '═══════════════════════════════════════', '', `Container: ${containerNumber}`, `Mode: ${shippingLineLabel}`, `Route: ${route.origin} → Dakar → ${route.destination}`, `Date: ${formatDate(packingList.generatedAt)}`, ...(loadDate ? [`Date de chargement: ${formatDateTime(loadDate)}`] : []), ...(dakarPortArrivalAt ? [`Arrivée estimée au port de Dakar: ${formatDateTime(dakarPortArrivalAt)}`] : []), '', '── POINT DE RETRAIT ───────────────────', 'Entrepôt: LEXD Warehouse - Bamako', '', '── DESTINATAIRE ───────────────────────', `Nom: ${consignee.name}`, `Téléphone: ${consignee.phone}`, `Adresse: ${consignee.warehouseAddress}`, '', '── DOCUMENTS REQUIS ───────────────────', "• Pièce d'identité", '• Reçu de paiement', '', '── MARCHANDISES ───────────────────────', "N°  ID           Description          Qté  CBM    Poids", '──  ───────────  ───────────────────  ───  ─────  ──────', ...itemLines, '', '── TOTAUX ─────────────────────────────', `Total Marchandises: ${summary.totalItems} colis`, `Total Articles: ${summary.totalQuantity || totalQuantity}`, `Volume Total: ${summary.totalCBM.toFixed(2)} m³`, `Poids Total: ${summary.totalWeight.toFixed(0)} kg`, '', '── STATUT ─────────────────────────────', `Statut: ${tracking.statusLabel}`, ...(dakarPortArrivalAt ? [`Arrivée Dakar: ${formatDateTime(dakarPortArrivalAt)}`] : []), ...(signature?.signed ? ['', '── SIGNATURE ──────────────────────────', signature.signatureLabel || `Signé par ${signature.signedBy || 'LEXD'}`, `Signataire: ${signature.signerName || 'Service Logistique'}`, `Date signature: ${formatDateTime(signature.signedAt)}`] : []), '', '═══════════════════════════════════════', 'LEXD - Transport International', 'Route: Chine → Dakar (Sénégal) → Bamako (Mali)', '═══════════════════════════════════════'].join('\n');
  }, [packingList, formatDate, formatDateTime]);
  const blobToBase64 = async (blob: Blob): Promise<string> => new Promise((res, rej) => { const r = new FileReader(); r.onloadend = () => res(r.result?.toString().split(',')[1] || ''); r.onerror = rej; r.readAsDataURL(blob); });
  const handleDownloadPDF = useCallback(async () => {
    if (!packingList) return;
    try {
      setDownloadProgress(0.1); const pdfBlob = await downloadMutation.mutateAsync(containerId); setDownloadProgress(0.5);
      const filename = `PackingList_${packingList.containerNumber}_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`;
      if (Platform.OS === 'web') { const url = window.URL.createObjectURL(pdfBlob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); document.body.removeChild(a); window.URL.revokeObjectURL(url); showSnackbar('PDF téléchargé avec succès'); return; }
      const destFile = new File(Paths.cache, filename); const base64 = await blobToBase64(pdfBlob); setDownloadProgress(0.7); await destFile.write(base64, { encoding: 'base64' }); setDownloadProgress(1); showSnackbar('PDF téléchargé avec succès'); Alert.alert('Téléchargement terminé', 'Voulez-vous ouvrir le PDF ?', [{ text: 'Plus tard', style: 'cancel' }, { text: 'Ouvrir', onPress: async () => { if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(destFile.uri, { mimeType: 'application/pdf', dialogTitle: 'Ouvrir le PDF' }); } }]);
    } catch { Alert.alert('Erreur de téléchargement', 'Impossible de télécharger le PDF. Veuillez réessayer.'); } finally { setTimeout(() => setDownloadProgress(0), 1000); }
  }, [packingList, containerId, downloadMutation, showSnackbar]);
  const sharePackingListPDF = useCallback(async () => {
    setDownloadProgress(0.3);
    const pdfBlob = await downloadMutation.mutateAsync(containerId);
    setDownloadProgress(0.7);
    const filename = `PackingList_${packingList?.containerNumber}_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`;
    const destFile = new File(Paths.cache, filename);
    await destFile.write(await blobToBase64(pdfBlob), { encoding: 'base64' });
    setDownloadProgress(1);
    await Sharing.shareAsync(destFile.uri, { mimeType: 'application/pdf', dialogTitle: 'Partager ma liste de colisage', UTI: 'com.adobe.pdf' });
    setTimeout(() => setDownloadProgress(0), 500);
  }, [containerId, downloadMutation, packingList?.containerNumber]);

  const sharePackingListText = useCallback(async () => {
    if (!packingList) return;
    await Share.share({ message: generateShareText(), title: `Liste de Colisage - ${packingList.containerNumber}` });
  }, [generateShareText, packingList]);

  const handleShare = useCallback(async () => {
    if (!packingList) return;
    try {
      if (Platform.OS !== 'web') {
        try { await sharePackingListPDF(); return; } catch (err) {
          console.error('PDF share failed:', err);
          Alert.alert('Partage PDF indisponible', 'Impossible de partager le fichier PDF. Voulez-vous partager la version texte ?', [
            { text: 'Annuler', style: 'cancel', onPress: () => setDownloadProgress(0) },
            { text: 'Partager texte', onPress: () => sharePackingListText().finally(() => setDownloadProgress(0)) },
          ]);
          return;
        }
      }
      await sharePackingListText();
    } catch { Alert.alert('Erreur', 'Impossible de partager la liste de colisage'); }
  }, [packingList, sharePackingListPDF, sharePackingListText]);

  return { packingList, isLoading, isError, error, isFetching, contactDialogVisible, setContactDialogVisible, snackbarVisible, setSnackbarVisible, snackbarMessage, downloadProgress, downloadMutation, handleRefresh, showSnackbar, handleCallConsignee, handleOpenMaps, handleDownloadPDF, handleShare, generateShareText, getShippingModeIcon, getStatusColor, getStatusLabel, formatDate, formatDateTime, statusColors };
};
