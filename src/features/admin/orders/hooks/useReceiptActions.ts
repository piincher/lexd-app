import { useState, useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { sharePDFOnWhatsApp, sharePDFGeneric } from '@src/shared/lib/pdfShare';

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  CASH: 'Espèces',
  BANK_TRANSFER: 'Virement Bancaire',
  MOBILE_MONEY: 'Mobile Money',
  ORANGE_MONEY: 'Orange Money',
  WAVE: 'Wave',
  CARD: 'Carte Bancaire',
};

interface UseReceiptActionsParams {
  receiptUrl?: string;
  clientName: string;
  clientPhone?: string;
  amount: number;
  orderCode?: string;
  paymentMethod?: string;
  receiptNumber?: string;
  paidAt?: string;
}

const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  let cleaned = phone.replace(/[\s\-().+]/g, '');
  if (cleaned.startsWith('00')) cleaned = cleaned.substring(2);
  if (!cleaned.startsWith('223') && cleaned.length === 8) cleaned = '223' + cleaned;
  return cleaned;
};

export const useReceiptActions = (params: UseReceiptActionsParams) => {
  const [isSharing, setIsSharing] = useState(false);
  const { receiptUrl, clientName, clientPhone, amount, orderCode, paymentMethod, receiptNumber, paidAt } = params;

  const buildCaption = useCallback((): string => {
    const methodLabel = paymentMethod ? (PAYMENT_METHOD_LABELS[paymentMethod] || paymentMethod) : '';
    const dateStr = paidAt ? format(new Date(paidAt), 'dd MMMM yyyy', { locale: fr }) : '';
    let caption = `✅ *Reçu de Paiement - ChinaLink Express*\n\nClient: *${clientName}*\n`;
    caption += `💰 Montant: *${amount.toLocaleString('fr-FR')} FCFA*\n`;
    if (methodLabel) caption += `💳 Mode: ${methodLabel}\n`;
    if (orderCode) caption += `📦 Commande: ${orderCode}\n`;
    if (receiptNumber) caption += `🧾 N° Reçu: ${receiptNumber}\n`;
    if (dateStr) caption += `📅 Date: ${dateStr}\n`;
    caption += `\nMerci pour votre confiance!\n_ChinaLink Express_`;
    return caption;
  }, [clientName, amount, orderCode, paymentMethod, receiptNumber, paidAt]);

  const handleViewReceipt = useCallback(() => {
    if (receiptUrl) { Linking.openURL(receiptUrl); }
    else { Alert.alert('Erreur', 'Le reçu n\'est pas disponible'); }
  }, [receiptUrl]);

  const handleDownloadReceipt = useCallback(() => {
    if (receiptUrl) { Linking.openURL(receiptUrl); Alert.alert('Téléchargement', 'Le reçu est en cours de téléchargement'); }
    else { Alert.alert('Erreur', 'Le reçu n\'est pas disponible'); }
  }, [receiptUrl]);

  const executeShare = useCallback(async (shareFn: () => Promise<void>) => {
    setIsSharing(true);
    try { await shareFn(); } catch (error) { console.error('PDF share error:', error); Alert.alert('Erreur', 'Impossible de partager le PDF.'); }
    finally { setIsSharing(false); }
  }, []);

  const handleShareWhatsApp = useCallback(() => {
    if (!receiptUrl) { Alert.alert('Erreur', 'Le reçu n\'est pas disponible'); return; }
    return executeShare(() => sharePDFOnWhatsApp({
      url: receiptUrl, filename: `recu_${receiptNumber || 'payment'}.pdf`,
      message: buildCaption(), phone: clientPhone ? formatPhoneNumber(clientPhone) : undefined,
    }));
  }, [receiptUrl, clientPhone, receiptNumber, buildCaption, executeShare]);

  const handleShareGeneric = useCallback(() => {
    if (!receiptUrl) { Alert.alert('Erreur', 'Le reçu n\'est pas disponible'); return; }
    return executeShare(() => sharePDFGeneric({
      url: receiptUrl, filename: `recu_${receiptNumber || 'payment'}.pdf`, message: buildCaption(),
    }));
  }, [receiptUrl, receiptNumber, buildCaption, executeShare]);

  return { isSharing, handleViewReceipt, handleDownloadReceipt, handleShareWhatsApp, handleShareGeneric };
};
