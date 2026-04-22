import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import {  createStyles  } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';


interface LocationCardProps {
  warehouseLocation?: string;
  container: any;
  airwayBill?: any;
}

export const LocationCard: React.FC<LocationCardProps> = ({ warehouseLocation, container, airwayBill }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
  <Card style={styles.sectionCard}>
    <Card.Content>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="map-marker" size={20} color={Theme.primary[600]} />
        <Text style={styles.sectionTitle}>Localisation</Text>
      </View>

      <View style={styles.locationGrid}>
        <View style={styles.locationItem}>
          <View style={[styles.locationIcon, { backgroundColor: Theme.primary[100] }]}>
            <MaterialCommunityIcons name="warehouse" size={24} color={Theme.primary[600]} />
          </View>
          <View>
            <Text style={styles.locationLabel}>Emplacement</Text>
            <Text style={styles.locationValue}>{warehouseLocation || 'Non assigné'}</Text>
          </View>
        </View>

        {airwayBill && (
          <View style={styles.locationItem}>
            <View style={[styles.locationIcon, { backgroundColor: Theme.accent.mint + '20' }]}>
              <MaterialCommunityIcons name="airplane" size={24} color={Theme.accent.mint} />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Lettre de transport</Text>
              <Text style={styles.locationValue} numberOfLines={1}>
                {airwayBill.awbNumber}
              </Text>
              <Text style={styles.locationSubtext}>{airwayBill.airline} · {airwayBill.flightNumber}</Text>
            </View>
          </View>
        )}

        {container && (
          <View style={styles.locationItem}>
            <View style={[styles.locationIcon, { backgroundColor: Theme.accent.mint + '20' }]}>
              <MaterialCommunityIcons name="truck-container" size={24} color={Theme.accent.mint} />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Conteneur</Text>
              <Text style={styles.locationValue} numberOfLines={1}>
                {container.virtualContainerNumber}
              </Text>
              <Text style={styles.locationSubtext}>{container.shippingLine}</Text>
            </View>
          </View>
        )}
      </View>
    </Card.Content>
  </Card>
);
};
