/**
 * GoodsLocationInfo - Display location and container info
 * SRP: Show warehouse location and assigned container
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './GoodsLocationInfo.styles';

interface Container {
  virtualContainerNumber?: string;
  shippingLine?: string;
}

interface GoodsLocationInfoProps {
  warehouseLocation?: string;
  container?: Container | null;
}

export const GoodsLocationInfo: React.FC<GoodsLocationInfoProps> = ({
  warehouseLocation,
  container,
}) => {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="map-marker" size={20} color={Theme.primary[600]} />
          <Text style={styles.title}>Localisation</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.item}>
            <View style={[styles.icon, { backgroundColor: Theme.primary[100] }]}>
              <MaterialCommunityIcons name="warehouse" size={24} color={Theme.primary[600]} />
            </View>
            <View>
              <Text style={styles.label}>Emplacement</Text>
              <Text style={styles.value}>{warehouseLocation || 'Non assigné'}</Text>
            </View>
          </View>

          {container && (
            <View style={styles.item}>
              <View style={[styles.icon, { backgroundColor: Theme.accent.mint + '20' }]}>
                <MaterialCommunityIcons name="truck-container" size={24} color={Theme.accent.mint} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Conteneur</Text>
                <Text style={styles.value} numberOfLines={1}>
                  {container.virtualContainerNumber}
                </Text>
                <Text style={styles.subtext}>{container.shippingLine}</Text>
              </View>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};
