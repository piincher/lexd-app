import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DetailRow } from '@src/components/DetailsRow/DetailsRow';
import { COLORS } from '@src/constants/Colors';

interface OrderDetailsListProps {
  clientName?: string;
  priceTotal?: number;
  categoryName?: string;
  packageType?: string;
  currentStatus?: string;
  lastUpdate?: string;
  departureDate?: string;
  note?: string;
}

export const OrderDetailsList: React.FC<OrderDetailsListProps> = ({
  clientName,
  priceTotal,
  categoryName,
  packageType,
  currentStatus,
  lastUpdate,
  departureDate,
  note,
}) => {
  return (
    <View style={styles.container}>
      <DetailRow label="Pays d'envoie" value="Chine, Foshan" icon="earth" />
      <DetailRow label="Pays de réception" value="Bamako, Mali" icon="map-marker" />
      
      <View style={styles.card}>
        <DetailRow
          label="Client"
          value={clientName || 'Non spécifié'}
          icon="account"
        />
        <DetailRow
          label="Prix Total"
          value={`${priceTotal?.toLocaleString() || '0'} FCFA`}
          icon="cash"
        />
        <DetailRow
          label="Type de colis"
          value={categoryName || packageType || 'Général'}
          icon="package-variant"
        />
      </View>
      
      <View style={styles.card}>
        <DetailRow
          label="Statut actuel"
          value={currentStatus || 'Commande passée'}
          icon="progress-check"
        />
        <DetailRow
          label="Dernière mise à jour"
          value={lastUpdate}
          icon="update"
        />
        <DetailRow
          label="Date de chargement"
          value={departureDate}
          icon="calendar"
        />
      </View>
      
      <View style={styles.card}>
        <DetailRow
          label="Notes"
          value={note || 'Aucune note disponible'}
          icon="note-text"
          isLast
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.extra1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginVertical: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});
