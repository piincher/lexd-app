import { useState } from 'react';
import { Alert, Linking } from 'react-native';
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
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message + `\n\n📄 Votre reçu:\n${payment.receiptUrl}`)}`;
        Linking.openURL(whatsappUrl).catch(() => Alert.alert('Erreur', "Impossible d'ouvrir WhatsApp."));
      } finally {
        setSharingPaymentId(null);
      }
    } else {
      const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
      try {
        const canOpen = await Linking.canOpenURL(whatsappUrl);
        if (canOpen) {
          await Linking.openURL(whatsappUrl);
        } else {
          Alert.alert('WhatsApp non disponible', "WhatsApp n'est pas installé.");
        }
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
