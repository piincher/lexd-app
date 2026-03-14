/**
 * RouteFlow - Visual route flow component
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ROUTE_CITIES, ROUTE_COLORS, ROUTE_LABELS } from '../data/routeData';
import { styles } from '../TransitTimeline.styles';

const RouteItem: React.FC<{ city: string; index: number }> = ({ city, index }) => (
  <View style={[styles.routeFlowItem, city === 'DAKAR' && styles.routeFlowHighlight, city === 'Bamako' && styles.routeFlowFinal]}>
    <View style={[styles.routeFlowDot, city === 'DAKAR' && styles.routeFlowDotDakar, { backgroundColor: ROUTE_COLORS[index] }]}>
      {city === 'DAKAR' && <Ionicons name="boat" size={12} color="#FFF" />}
    </View>
    <Text style={[styles.routeFlowText, city === 'DAKAR' && styles.routeFlowTextHighlight]}>{city}</Text>
    <Text style={styles.routeFlowSubtext}>{ROUTE_LABELS[index]}</Text>
    {city === 'DAKAR' && <View style={styles.mainPortTag}><Text style={styles.mainPortTagText}>PRINCIPAL</Text></View>}
  </View>
);

export const RouteFlow: React.FC = () => (
  <Animated.View entering={FadeInUp.delay(150)} style={styles.routeFlowCard}>
    <LinearGradient colors={['#E0F2FE', '#F0F9FF']} style={styles.routeFlowGradient}>
      <View style={styles.routeFlowHeader}>
        <Ionicons name="trail-sign" size={20} color="#0284C7" />
        <Text style={styles.routeFlowTitle}>Parcours de votre conteneur</Text>
      </View>
      <View style={styles.routeFlowVisual}>
        {ROUTE_CITIES.map((city, i) => (
          <React.Fragment key={city}>
            <RouteItem city={city} index={i} />
            {i < 4 && <View style={styles.routeFlowArrow}><Ionicons name="arrow-forward" size={14} color="#94A3B8" /></View>}
          </React.Fragment>
        ))}
      </View>
    </LinearGradient>
  </Animated.View>
);
