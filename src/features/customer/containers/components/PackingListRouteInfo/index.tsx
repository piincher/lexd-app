/**
 * PackingListRouteInfo Component
 * Route information banner and detailed route flow
 * SRP: Display shipping route information
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PackingListRouteInfo.styles';

interface PackingListRouteInfoProps {
  origin: string;
  destination: string;
  estimatedTransitDays?: number;
  showDetailed?: boolean;
}

export const PackingListRouteInfo: React.FC<PackingListRouteInfoProps> = ({
  origin,
  destination,
  estimatedTransitDays,
  showDetailed = false,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  if (showDetailed) {
    return (
      <Card style={styles.sectionCard}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="routes"
              size={24}
              color={colors.primary.main}
            />
            <Text style={styles.sectionTitle}>Itinéraire Détaillé</Text>
          </View>
          <View style={styles.sectionDivider} />
          
          <View style={styles.routeContainer}>
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, { backgroundColor: colors.primary.main }]} />
              <View style={styles.routeContent}>
                <Text style={styles.routeLabel}>Origine</Text>
                <Text style={styles.routeValue}>{origin}</Text>
              </View>
            </View>
            
            <View style={styles.routeLine}>
              <View style={styles.routeLineBar} />
              <View style={styles.routeTransitInfo}>
                <MaterialCommunityIcons name="ferry" size={14} color={colors.text.secondary} />
                <Text style={styles.transitDays}>~{estimatedTransitDays} jours</Text>
              </View>
            </View>
            
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, { backgroundColor: colors.status.success }]} />
              <View style={styles.routeContent}>
                <Text style={styles.routeLabel}>Port d'Arrivée</Text>
                <Text style={[styles.routeValue, { color: colors.status.success }]}>Dakar, Sénégal</Text>
              </View>
            </View>
            
            <View style={styles.routeLine}>
              <View style={styles.routeLineBar} />
              <View style={styles.routeTransitInfo}>
                <MaterialCommunityIcons name="truck-delivery" size={14} color={colors.text.secondary} />
                <Text style={styles.transitDays}>Transport routier</Text>
              </View>
            </View>
            
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, { backgroundColor: colors.status.success }]} />
              <View style={styles.routeContent}>
                <Text style={styles.routeLabel}>Destination Finale</Text>
                <Text style={styles.routeValue}>{destination}</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.routeBannerCard}>
      <LinearGradient
        colors={[colors.feedback.infoBg, colors.background.paper]}
        style={styles.routeBannerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Card.Content>
          <View style={styles.routeBannerHeader}>
            <MaterialCommunityIcons name="routes" size={24} color={colors.primary.main} />
            <Text style={styles.routeBannerTitle}>Itinéraire Via Dakar, Sénégal</Text>
          </View>
          
          <View style={styles.routeBannerFlow}>
            <View style={styles.routeBannerItem}>
              <MaterialCommunityIcons name="flag" size={20} color={colors.primary.main} />
              <Text style={styles.routeBannerLabel}>Chine</Text>
            </View>
            
            <View style={styles.routeBannerArrow}>
              <MaterialCommunityIcons name="arrow-right" size={16} color={colors.text.secondary} />
            </View>
            
            <View style={[styles.routeBannerItem, styles.routeBannerHighlight]}>
              <MaterialCommunityIcons name="ferry" size={24} color={colors.status.success} />
              <Text style={styles.routeBannerValue}>DAKAR</Text>
              <Text style={styles.routeBannerSubtext}>Sénégal</Text>
            </View>
            
            <View style={styles.routeBannerArrow}>
              <MaterialCommunityIcons name="arrow-right" size={16} color={colors.text.secondary} />
            </View>
            
            <View style={styles.routeBannerItem}>
              <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary.main} />
              <Text style={styles.routeBannerLabel}>Bamako</Text>
            </View>
          </View>
        </Card.Content>
      </LinearGradient>
    </Card>
  );
};

export default PackingListRouteInfo;
