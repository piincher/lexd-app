import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createStyles } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface LocationCardProps {
  warehouseLocation?: string;
  container: any;
  airwayBill?: any;
  isAirShipping?: boolean;
  onNavigateToContainer?: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  warehouseLocation,
  container,
  airwayBill,
  isAirShipping,
  onNavigateToContainer,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  // Air freight has no container — it travels on a lettre de transport (LTA).
  // Sea freight travels in a container. Show whichever applies to this shipment's mode.
  const assignedColor = colors.status.success;
  const mutedColor = colors.text.secondary;

  const renderAssignment = () => {
    if (isAirShipping) {
      const has = !!airwayBill;
      return (
        <View style={styles.locationItem}>
          <View style={[styles.locationIcon, { backgroundColor: has ? assignedColor + '20' : colors.background.paper }]}>
            <MaterialCommunityIcons name="airplane" size={24} color={has ? assignedColor : mutedColor} />
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Lettre de transport</Text>
            {has ? (
              <>
                <Text style={styles.locationValue} numberOfLines={1}>
                  {airwayBill.awbNumber || 'LTA'}
                </Text>
                {(airwayBill.airline || airwayBill.flightNumber) && (
                  <Text style={styles.locationSubtext}>
                    {[airwayBill.airline, airwayBill.flightNumber].filter(Boolean).join(' · ')}
                  </Text>
                )}
              </>
            ) : (
              <Text style={[styles.locationValue, { color: mutedColor }]}>Non assignée</Text>
            )}
          </View>
        </View>
      );
    }

    const has = !!container;
    const ContainerRow = (
      <>
        <View style={[styles.locationIcon, { backgroundColor: has ? assignedColor + '20' : colors.background.paper }]}>
          <MaterialCommunityIcons name="truck-cargo-container" size={24} color={has ? assignedColor : mutedColor} />
        </View>
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationLabel}>Conteneur</Text>
          {has ? (
            <>
              <Text style={styles.locationValue} numberOfLines={1}>
                {container.virtualContainerNumber || 'Conteneur'}
              </Text>
              {container.shippingLine && <Text style={styles.locationSubtext}>{container.shippingLine}</Text>}
            </>
          ) : (
            <Text style={[styles.locationValue, { color: mutedColor }]}>Non assigné</Text>
          )}
        </View>
        {has && onNavigateToContainer && (
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.text.secondary} style={styles.locationChevron} />
        )}
      </>
    );

    if (has && onNavigateToContainer) {
      return (
        <TouchableOpacity onPress={onNavigateToContainer} activeOpacity={0.7} style={styles.locationItem}>
          {ContainerRow}
        </TouchableOpacity>
      );
    }

    return <View style={styles.locationItem}>{ContainerRow}</View>;
  };

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary.main} />
          <Text style={styles.sectionTitle}>Localisation</Text>
        </View>

        <View style={styles.locationGrid}>
          <View style={styles.locationItem}>
            <View style={[styles.locationIcon, { backgroundColor: colors.primary[100] }]}>
              <MaterialCommunityIcons name="warehouse" size={24} color={colors.primary.main} />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Emplacement</Text>
              <Text style={styles.locationValue}>{warehouseLocation || 'Non assigné'}</Text>
            </View>
          </View>

          {renderAssignment()}
        </View>
      </Card.Content>
    </Card>
  );
};
