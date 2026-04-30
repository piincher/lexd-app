/**
 * RouteFlow - Visual route flow component
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../TransitTimeline.styles';

export const RouteFlow: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <Animated.View entering={FadeInUp.delay(150)} style={styles.routeFlowCard}>
      <LinearGradient
        colors={['#E0F2FE', '#F0F9FF']}
        style={styles.routeFlowGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.routeFlowHeader}>
          <Ionicons name="trail-sign" size={20} color="#0284C7" />
          <Text style={styles.routeFlowTitle}>Parcours de votre conteneur</Text>
        </View>

        {/* Route Flow: Nansha → [Transit] → DAKAR → Diboli → Bamako */}
        <View style={styles.routeFlowVisual}>
          {/* Nansha */}
          <View style={styles.routeFlowItem}>
            <View style={[styles.routeFlowDot, { backgroundColor: '#0EA5E9' }]} />
            <Text style={styles.routeFlowText}>Nansha</Text>
            <Text style={styles.routeFlowSubtext}>Chine</Text>
          </View>

          <View style={styles.routeFlowArrow}>
            <Ionicons name="arrow-forward" size={14} color="#94A3B8" />
          </View>

          {/* Transit Icon */}
          <View style={styles.routeFlowTransit}>
            <Ionicons name="boat" size={18} color="#64748B" />
            <Text style={styles.routeFlowTransitText}>[Transit]</Text>
          </View>

          <View style={styles.routeFlowArrow}>
            <Ionicons name="arrow-forward" size={14} color="#94A3B8" />
          </View>

          {/* Dakar - Highlighted */}
          <View style={[styles.routeFlowItem, styles.routeFlowHighlight]}>
            <View style={[styles.routeFlowDot, styles.routeFlowDotDakar]}>
              <Ionicons name="boat" size={12} color="#FFF" />
            </View>
            <Text style={[styles.routeFlowText, styles.routeFlowTextHighlight]}>DAKAR</Text>
            <Text style={styles.routeFlowSubtext}>Port d'arrivée</Text>
            <View style={styles.mainPortTag}>
              <Text style={styles.mainPortTagText}>PRINCIPAL</Text>
            </View>
          </View>

          <View style={styles.routeFlowArrow}>
            <Ionicons name="arrow-forward" size={14} color="#94A3B8" />
          </View>

          {/* Diboli */}
          <View style={styles.routeFlowItem}>
            <View style={[styles.routeFlowDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.routeFlowText}>Diboli</Text>
            <Text style={styles.routeFlowSubtext}>Frontière</Text>
          </View>

          <View style={styles.routeFlowArrow}>
            <Ionicons name="arrow-forward" size={14} color="#94A3B8" />
          </View>

          {/* Bamako */}
          <View style={[styles.routeFlowItem, styles.routeFlowFinal]}>
            <View style={[styles.routeFlowDot, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="home" size={10} color="#FFF" />
            </View>
            <Text style={styles.routeFlowText}>Bamako</Text>
            <Text style={styles.routeFlowSubtext}>Retrait</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
