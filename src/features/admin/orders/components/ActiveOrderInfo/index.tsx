import React from 'react';
import { View, Text } from 'react-native';
import { Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatDate } from '@src/utils/formatDate';
import { InfoRow } from './InfoRow';
import { styles } from './ActiveOrderInfo.styles';

interface ActiveOrderInfoProps {
  item?: any;
  note?: string;
}

export const ActiveOrderInfo: React.FC<ActiveOrderInfoProps> = ({ item, note }) => {
  const { colors } = useAppTheme();

  return (
    <Surface style={styles.card}>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="information" size={20} color={colors.primary.main} />
        <Text style={styles.sectionTitle}>Informations</Text>
      </View>

      <InfoRow icon="earth" label="Origine" value="Chine, Foshan" iconColor="#4CAF50" />
      <InfoRow icon="map-marker-check" label="Destination" value="Bamako, Mali" iconColor="#F44336" />
      <Divider style={styles.divider} />
      <InfoRow
        icon="package-variant"
        label="Catégorie"
        value={item?.category?.name || item?.typeOfPackage || 'Général'}
        iconColor="#FF9800"
      />
      <InfoRow
        icon="identifier"
        label="Conteneur"
        value={item?.contenairNumber || 'N/A'}
        iconColor="#7B1FA2"
      />
      <InfoRow
        icon="progress-check"
        label="Statut actuel"
        value={item?.currentStatus || 'Commande passée'}
        iconColor="#1976D2"
      />
      <Divider style={styles.divider} />
      <InfoRow
        icon="calendar-arrow-right"
        label="Date de chargement"
        value={formatDate(item?.departureDate!)}
        iconColor="#9C27B0"
      />
      <InfoRow
        icon="update"
        label="Dernière mise à jour"
        value={formatDate(item?.updatedAt!)}
        iconColor="#607D8B"
      />

      {(note || item?.note) && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.noteBox}>
            <MaterialCommunityIcons name="note-text" size={16} color="#F57C00" />
            <Text style={styles.noteText}>
              {note || item?.note || 'Aucune note'}
            </Text>
          </View>
        </>
      )}
    </Surface>
  );
};

export default ActiveOrderInfo;
