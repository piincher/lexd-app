import { useState, useCallback, useMemo } from 'react';
import { Alert, Linking, Platform, Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useGetMyPackingList, useDownloadPackingListPDF } from '../../../hooks/useCustomerContainers';

export const useClientPackingListScreen = (containerId: string) => {
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
  const getShippingModeIcon = useCallback((m: 'SEA' | 'AIR') => m === 'SEA' ? 'ferry' : 'airplane', []);
  const getStatusColor = useCallback((s: string) => ({ BOOKED: { bg: '#EDE9FE', text: '#8B5CF6', icon: '#8B5CF6' }, IN_TRANSIT: { bg: '#E0F2FE', text: '#0EA5E9', icon: '#0EA5E9' }, ARRIVED: { bg: '#D1FAE5', text: '#10B981', icon: '#10B981' }, READY_FOR_PICKUP: { bg: '#FEF3C7', text: '#F59E0B', icon: '#F59E0B' }, DELIVERED: { bg: '#DCFCE7', text: '#22C55E', icon: '#22C55E' } }[s] || { bg: '#F3F4F6', text: '#6B7280', icon: '#6B7280' }), []);
  const statusColors = useMemo(() => packingList ? getStatusColor(packingList.tracking.status) : { bg: '#F3F4F6', text: '#6B7280', icon: '#6B7280' }, [packingList, getStatusColor]);
  const generateShareText = useCallback(() => {
    if (!packingList) return '';
    const { containerNumber, shippingLineLabel, route, consignee, items, summary, tracking } = packingList;
    const itemLines = items.map((it, i) => `${(i + 1).toString().padStart(2)}  ${it.goodsId.slice(-8).padEnd(11)}  ${(it.description || '-').slice(0, 20).padEnd(20)}  ${it.actualCBM.toFixed(2).padStart(5)}  ${`${it.weight || 0}kg`.padStart(6)}`);
    return ['═══════════════════════════════════════', '       LISTE DE COLISAGE CLIENT', '═══════════════════════════════════════', '', `Container: ${containerNumber}`, `Mode: ${shippingLineLabel}`, `Route: ${route.origin} → Dakar → ${route.destination}`, `Date: ${formatDate(packingList.generatedAt)}`, '', '── POINT DE RETRAIT ───────────────────', 'Entrepôt: ChinaLink Express Warehouse - Bamako', '', '── DESTINATAIRE ───────────────────────', `Nom: ${consignee.name}`, `Téléphone: ${consignee.phone}`, `Adresse: ${consignee.warehouseAddress}`, '', '── DOCUMENTS REQUIS ───────────────────', "• Pièce d'identité", '• Reçu de paiement', '', '── MARCHANDISES ───────────────────────', "N°  ID           Description          CBM    Poids", '──  ───────────  ───────────────────  ─────  ──────', ...itemLines, '', '── TOTAUX ─────────────────────────────', `Total Marchandises: ${summary.totalItems}`, `Volume Total: ${summary.totalCBM.toFixed(2)} m³`, `Poids Total: ${summary.totalWeight.toFixed(0)} kg`, '', '── STATUT ─────────────────────────────', `Statut: ${tracking.statusLabel}`, ...(tracking.estimatedArrival ? [`Arrivée Estimée: ${formatDate(tracking.estimatedArrival)}`] : []), '', '═══════════════════════════════════════', 'ChinaLink Express - Transport International', 'Route: Chine → Dakar (Sénégal) → Bamako (Mali)', '═══════════════════════════════════════'].join('\n');
  }, [packingList, formatDate]);
  const blobToBase64 = async (blob: Blob): Promise<string> => new Promise((res, rej) => { const r = new FileReader(); r.onloadend = () => res(r.result?.toString().split(',')[1] || ''); r.onerror = rej; r.readAsDataURL(blob); });
  const handleDownloadPDF = useCallback(async () => {
    if (!packingList) return;
    try {
      setDownloadProgress(0.1); const pdfBlob = await downloadMutation.mutateAsync(containerId); setDownloadProgress(0.5);
      const filename = `PackingList_${packingList.containerNumber}_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`;
      if (Platform.OS === 'web') { const url = window.URL.createObjectURL(pdfBlob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); document.body.removeChild(a); window.URL.revokeObjectURL(url); showSnackbar('PDF téléchargé avec succès'); return; }
      const fileUri = `${FileSystem.cacheDirectory}${filename}`; const base64 = await blobToBase64(pdfBlob); setDownloadProgress(0.7); await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 }); setDownloadProgress(1); showSnackbar('PDF téléchargé avec succès'); Alert.alert('Téléchargement terminé', 'Voulez-vous ouvrir le PDF ?', [{ text: 'Plus tard', style: 'cancel' }, { text: 'Ouvrir', onPress: async () => { if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(fileUri, { mimeType: 'application/pdf', dialogTitle: 'Ouvrir le PDF' }); } }]);
    } catch { Alert.alert('Erreur de téléchargement', 'Impossible de télécharger le PDF. Veuillez réessayer.'); } finally { setTimeout(() => setDownloadProgress(0), 1000); }
  }, [packingList, containerId, downloadMutation, showSnackbar]);
  const handleShare = useCallback(async () => {
    if (!packingList) return;
    try {
      if (packingList.generatedAt && Platform.OS !== 'web') {
        try { setDownloadProgress(0.3); const pdfBlob = await downloadMutation.mutateAsync(containerId); setDownloadProgress(0.7); const filename = `PackingList_${packingList.containerNumber}_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`; const fileUri = `${FileSystem.cacheDirectory}${filename}`; const base64 = await blobToBase64(pdfBlob); await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 }); setDownloadProgress(1); await Sharing.shareAsync(fileUri, { mimeType: 'application/pdf', dialogTitle: 'Partager ma liste de colisage', UTI: 'com.adobe.pdf' }); setTimeout(() => setDownloadProgress(0), 500); return; } catch {}
      }
      await Share.share({ message: generateShareText(), title: `Liste de Colisage - ${packingList.containerNumber}` });
    } catch { Alert.alert('Erreur', 'Impossible de partager la liste de colisage'); }
  }, [packingList, containerId, downloadMutation, generateShareText]);

  return { packingList, isLoading, isError, error, isFetching, contactDialogVisible, setContactDialogVisible, snackbarVisible, setSnackbarVisible, snackbarMessage, downloadProgress, downloadMutation, handleRefresh, showSnackbar, handleCallConsignee, handleOpenMaps, handleDownloadPDF, handleShare, generateShareText, getShippingModeIcon, getStatusColor, formatDate, statusColors };
};
