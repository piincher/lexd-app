/**
 * ClientInfoCard - Displays client information with call and WhatsApp actions
 * SRP: Show client name, phone, and provide communication actions
 */

import React from 'react';
import { Surface } from 'react-native-paper';
import { Alert, Linking } from 'react-native';
import { openWhatsApp } from '@src/shared/lib/openWhatsApp';
import { useClientInfoCardStyles } from './ClientInfoCard.styles';
import { ClientInfoHeader } from './ClientInfoHeader';
import { ClientContactRow } from './ClientContactRow';
import { ClientActionButtons } from './ClientActionButtons';

interface ClientInfoCardProps {
  clientName: string;
  clientPhone?: string;
  amount: number;
  receiptUrl?: string;
}

const formatPhoneNumber = (phone: string) => {
  if (!phone) return '';
  let cleaned = phone.replace(/\s/g, '').replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '223' + cleaned.substring(1);
  }
  return cleaned;
};

export const ClientInfoCard: React.FC<ClientInfoCardProps> = ({
  clientName,
  clientPhone,
  amount,
  receiptUrl,
}) => {
  const styles = useClientInfoCardStyles();

  const handleCallClient = () => {
    if (!clientPhone) {
      Alert.alert('Error', 'Client phone number not available');
      return;
    }
    const telUrl = `tel:${clientPhone}`;
    Linking.canOpenURL(telUrl).then((canOpen) => {
      if (canOpen) {
        Linking.openURL(telUrl);
      } else {
        Alert.alert('Error', 'Cannot open phone dialer');
      }
    });
  };

  const shareReceiptOnWhatsApp = async () => {
    if (!clientPhone) {
      Alert.alert('Erreur', 'Le numéro de téléphone du client n\'est pas disponible');
      return;
    }

    const formattedPhone = formatPhoneNumber(clientPhone);
    let message = `Bonjour ${clientName},\n\nVotre paiement de ${amount.toLocaleString('fr-FR')} FCFA a été enregistré avec succès.\n\n`;
    if (receiptUrl) {
      message += `Voici votre reçu: ${receiptUrl}\n\n`;
    }
    message += `Merci pour votre confiance!\n_ChinaLink Express_`;

    try {
      await openWhatsApp(formattedPhone, message);
    } catch {
      Alert.alert('Erreur', 'WhatsApp n\'est pas installé');
    }
  };

  return (
    <Surface style={styles.card}>
      <ClientInfoHeader />
      <ClientContactRow
        clientName={clientName}
        clientPhone={clientPhone}
        onPressPhone={handleCallClient}
      />
      <ClientActionButtons
        clientPhone={clientPhone}
        onCall={handleCallClient}
        onWhatsApp={shareReceiptOnWhatsApp}
      />
    </Surface>
  );
};
