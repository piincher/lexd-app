import React from 'react';
import { View } from 'react-native';
import { Card, Text, Chip, DataTable } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../ClientPackingListScreen.styles';

interface Goods {
  _id: string;
  description?: string;
  cbm?: number;
  weight?: number;
  quantity?: number;
  status?: string;
}

interface PackingListGoodsProps {
  goods: Goods[];
  getStatusColor: (status: string) => string;
}

export const PackingListGoods: React.FC<PackingListGoodsProps> = ({
  goods,
  getStatusColor,
}) => {
  if (goods.length === 0) {
    return (
      <Card style={styles.sectionCard}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={24}
              color="#6B7280"
            />
            <Text style={styles.sectionTitle}>Marchandises</Text>
          </View>
          <View style={styles.emptyStateContainer}>
            <MaterialCommunityIcons
              name="package-variant-remove"
              size={48}
              color="#9CA3AF"
            />
            <Text style={styles.emptyStateText}>Aucune marchandise</Text>
          </View>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="package-variant-closed"
            size={24}
            color="#6B7280"
          />
          <Text style={styles.sectionTitle}>
            Marchandises ({goods.length})
          </Text>
        </View>

        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.colNumber}>N°</DataTable.Title>
            <DataTable.Title style={styles.colDescription}>Description</DataTable.Title>
            <DataTable.Title numeric style={styles.colCBM}>CBM</DataTable.Title>
            <DataTable.Title numeric style={styles.colWeight}>Poids</DataTable.Title>
            <DataTable.Title numeric style={styles.colQuantity}>Qté</DataTable.Title>
            <DataTable.Title style={styles.colStatus}>Statut</DataTable.Title>
          </DataTable.Header>

          {goods.map((item, index) => {
            const statusColor = getStatusColor(item.status || '');
            return (
              <DataTable.Row key={item._id} style={styles.tableRow}>
                <DataTable.Cell style={styles.colNumber}>
                  <Text style={styles.rowNumber}>{index + 1}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.colDescription}>
                  <Text style={styles.descriptionText} numberOfLines={2}>
                    {item.description || '-'}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.colCBM}>
                  <Text style={styles.numericText}>
                    {item.cbm?.toFixed(2) || '-'}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.colWeight}>
                  <Text style={styles.numericText}>
                    {item.weight ? `${item.weight}kg` : '-'}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.colQuantity}>
                  <Text style={styles.numericText}>
                    {item.quantity || '-'}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.colStatus}>
                  <Chip
                    style={[styles.statusChip, { backgroundColor: statusColor }]}
                    textStyle={styles.statusChipText}
                  >
                    {item.status || 'N/A'}
                  </Chip>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </Card.Content>
    </Card>
  );
};

export default PackingListGoods;
