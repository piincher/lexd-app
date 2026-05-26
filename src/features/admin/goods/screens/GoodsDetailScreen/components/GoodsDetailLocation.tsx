import { useAppTheme } from '@src/providers/ThemeProvider';
// GoodsDetailLocation - Location and container information

import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface Container {
  virtualContainerNumber?: string;
  shippingLine?: string;
}

interface GoodsDetailLocationProps {
  warehouseLocation?: string;
  container?: Container | null;
}

export const GoodsDetailLocation: React.FC<GoodsDetailLocationProps> = ({
  warehouseLocation,
  container,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary[600]} />
          <Text style={styles.sectionTitle}>Localisation</Text>
        </View>
        
        <View style={styles.locationGrid}>
          <View style={styles.locationItem}>
            <View style={[styles.locationIcon, { backgroundColor: colors.primary[100] }]}>
              <MaterialCommunityIcons name="warehouse" size={24} color={colors.primary[600]} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Emplacement</Text>
              <Text style={styles.locationValue}>{warehouseLocation || 'Non assigné'}</Text>
            </View>
          </View>
          
          {container && (
            <View style={styles.locationItem}>
              <View style={[styles.locationIcon, { backgroundColor: `${colors.accent.mint}20` }]}>
                <MaterialCommunityIcons name="truck-cargo-container" size={24} color={colors.accent.mint} />
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

const createStyles = (colors: any) => ({
  sectionCard: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.background.card,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.neutral[800],
    marginLeft: 10,
  },
  locationGrid: {
    gap: 12,
  },
  locationItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 14,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: colors.neutral[800],
  },
  locationSubtext: {
    fontSize: 13,
    color: colors.neutral[500],
    marginTop: 2,
  },
});
