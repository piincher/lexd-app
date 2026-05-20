import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import type { InAppNotification } from '../../types';

const DATA_FIELDS: { key: 'orderId' | 'containerId' | 'ticketId' | 'invoiceId' | 'certificateId'; label: string }[] = [
  { key: 'orderId', label: 'Commande' },
  { key: 'containerId', label: 'Conteneur' },
  { key: 'ticketId', label: 'Demande' },
  { key: 'invoiceId', label: 'Facture' },
  { key: 'certificateId', label: 'Certificat' },
];

interface EntitiesSectionProps {
  data: NonNullable<InAppNotification['data']>;
  styles: ReturnType<typeof import('./NotificationDetailDataCard.styles').getStyles>;
}

export const EntitiesSection: React.FC<EntitiesSectionProps> = ({ data, styles }) => (
  <>
    <Text style={styles.dataTitle}>Informations associées</Text>
    {DATA_FIELDS.map(
      (field) =>
        data[field.key] && (
          <View key={field.key} style={styles.dataItem}>
            <Text style={styles.dataLabel}>{field.label}</Text>
            <Text style={styles.dataValue}>#{String(data[field.key]).slice(-6)}</Text>
          </View>
        )
    )}
  </>
);
