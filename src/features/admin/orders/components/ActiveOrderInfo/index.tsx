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

      <InfoRow icon="earth" label="Origine" value="Chine, Foshan" iconColor={colors.status.success} />
      <InfoRow icon="map-marker-check" label="Destination" value="Bamako, Mali" iconColor={colors.status.error} />
      <Divider style={styles.divider} />
      <InfoRow
        icon="package-variant"
        label="Catégorie"
        value={item?.category?.name || item?.typeOfPackage || 'Général'}
        iconColor={colors.status.warning}
      />
      <InfoRow
        icon="identifier"
        label="Conteneur"
        value={item?.contenairNumber || 'N/A'}
        iconColor={colors.primary.main}
      />
      <InfoRow
        icon="progress-check"
        label="Statut actuel"
        value={item?.currentStatus || 'Commande passée'}
        iconColor={colors.status.info}
      />
      <Divider style={styles.divider} />
      <InfoRow
        icon="calendar-arrow-right"
        label="Date de chargement"
        value={formatDate(item?.departureDate!)}
        iconColor={colors.primary.main}
      />
      <InfoRow
        icon="update"
        label="Dernière mise à jour"
        value={formatDate(item?.updatedAt!)}
        iconColor={colors.text.secondary}
      />

      {(note || item?.note) && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.noteBox}>
            <MaterialCommunityIcons name="note-text" size={16} color={colors.status.warning} />
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
