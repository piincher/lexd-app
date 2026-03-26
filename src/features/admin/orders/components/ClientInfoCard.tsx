/**
 * ClientInfoCard - Displays client information with call and WhatsApp actions
 * SRP: Show client name, phone, and provide communication actions
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

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
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

    const canOpen = await Linking.canOpenURL(whatsappUrl);
    if (canOpen) {
      await Linking.openURL(whatsappUrl);
    } else {
      Alert.alert('Erreur', 'WhatsApp n\'est pas installé');
    }
  };

  return (
    <Surface style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="account" size={24} color={COLORS.blue} />
        <Text style={styles.cardTitle}>Client Information</Text>
      </View>

      <View style={styles.clientRow}>
        <MaterialCommunityIcons name="account-circle" size={40} color={COLORS.grey} />
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{clientName || 'Unknown'}</Text>
          {clientPhone && (
            <TouchableOpacity onPress={handleCallClient}>
              <Text style={styles.clientPhone}>{clientPhone}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {clientPhone && (
        <View style={styles.clientActions}>
          <Button
            mode="outlined"
            onPress={handleCallClient}
            style={styles.actionButton}
            icon="phone"
            textColor={COLORS.blue}
          >
            Call
          </Button>
          <Button
            mode="contained"
            onPress={shareReceiptOnWhatsApp}
            style={[styles.actionButton, styles.whatsappButton]}
            buttonColor="#25D366"
            icon="whatsapp"
          >
            WhatsApp
          </Button>
        </View>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    backgroundColor: '#FFF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    marginLeft: 8,
    color: '#1A1A2E',
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientInfo: {
    marginLeft: 12,
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: '#1A1A2E',
  },
  clientPhone: {
    fontSize: 14,
    color: COLORS.blue,
    fontFamily: Fonts.regular,
    marginTop: 2,
    textDecorationLine: 'underline',
  },
  clientActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
  },
  whatsappButton: {
    flex: 1,
  },
});
