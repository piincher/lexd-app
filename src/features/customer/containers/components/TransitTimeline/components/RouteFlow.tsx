/**
 * RouteFlow - Visual route flow component
 */
import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ROUTE_CITIES, ROUTE_COLORS, ROUTE_LABELS } from '../data/routeData';
import { createStyles } from '../TransitTimeline.styles';

export const RouteFlow: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const RouteItem: React.FC<{ city: string; index: number }> = ({ city, index }) => (
    <View style={[styles.routeFlowItem, city === 'DAKAR' && styles.routeFlowHighlight, city === 'Bamako' && styles.routeFlowFinal]}>
      <View style={[styles.routeFlowDot, city === 'DAKAR' && styles.routeFlowDotDakar, { backgroundColor: ROUTE_COLORS[index] }]}>
        {city === 'DAKAR' && <Ionicons name="boat" size={12} color={colors.text.inverse} />}
      </View>
      <Text style={[styles.routeFlowText, city === 'DAKAR' && styles.routeFlowTextHighlight]}>{city}</Text>
      <Text style={styles.routeFlowSubtext}>{ROUTE_LABELS[index]}</Text>
      {city === 'DAKAR' && <View style={styles.mainPortTag}><Text style={styles.mainPortTagText}>PRINCIPAL</Text></View>}
    </View>
  );

  return (
    <Animated.View entering={FadeInUp.delay(150)} style={styles.routeFlowCard}>
      <LinearGradient colors={['#E0F2FE', '#F0F9FF']} style={styles.routeFlowGradient}>
        <View style={styles.routeFlowHeader}>
          <Ionicons name="trail-sign" size={20} color={colors.primary.main} />
          <Text style={styles.routeFlowTitle}>Parcours de votre conteneur</Text>
        </View>
        <View style={styles.routeFlowVisual}>
          {ROUTE_CITIES.map((city, i) => (
            <React.Fragment key={city}>
              <RouteItem city={city} index={i} />
              {i < 4 && <View style={styles.routeFlowArrow}><Ionicons name="arrow-forward" size={14} color={colors.text.secondary} /></View>}
            </React.Fragment>
          ))}
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
