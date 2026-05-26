import { useState } from 'react';
import { Alert, Linking } from 'react-native';
import { openWhatsApp } from '@src/shared/lib/openWhatsApp';
import { sharePDFOnWhatsApp as sharePDFOnWhatsAppUtil } from '@src/shared/lib/pdfShare';
import { buildWhatsAppMessage } from '../lib/buildWhatsAppMessage';
import { formatPhoneForWhatsApp } from '../lib/formatPhoneForWhatsApp';

export const usePaymentHistoryActions = (
  orderCode: string,
  clientName?: string,
  clientPhone?: string,
) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sharingPaymentId, setSharingPaymentId] = useState<string | null>(null);

  const handleViewReceipt = (receiptUrl: string) => {
    Linking.openURL(receiptUrl).catch(() => Alert.alert('Erreur', "Impossible d'ouvrir le reçu."));
  };

  const handleShareOnWhatsApp = async (payment: any) => {
    const phone = clientPhone || payment.clientPhone;
    if (!phone) {
      Alert.alert('Numéro manquant', "Le numéro de téléphone du client n'est pas disponible.");
      return;
    }
    const formattedPhone = formatPhoneForWhatsApp(phone);
    const message = buildWhatsAppMessage(payment, orderCode, clientName);
    if (payment.receiptUrl) {
      setSharingPaymentId(payment._id);
      try {
        await sharePDFOnWhatsAppUtil({
          url: payment.receiptUrl,
          filename: `recu_${payment.receiptNumber || 'payment'}.pdf`,
          message,
          phone: formattedPhone,
        });
      } catch (err: any) {
        console.error('PDF share error:', err);
        openWhatsApp(formattedPhone, message + `\n\n📄 Votre reçu:\n${payment.receiptUrl}`).catch(() => Alert.alert('Erreur', "Impossible d'ouvrir WhatsApp."));
      } finally {
        setSharingPaymentId(null);
      }
    } else {
      try {
        await openWhatsApp(formattedPhone, message);
      } catch {
        Alert.alert('Erreur', "Impossible d'ouvrir WhatsApp.");
      }
    }
  };

  return {
    selectedImage,
    setSelectedImage,
    sharingPaymentId,
    handleViewReceipt,
    handleShareOnWhatsApp,
  };
};
