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
        colors={[colors.feedback.infoBg, colors.background.paper]}
        style={styles.routeFlowGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.routeFlowHeader}>
          <Ionicons name="trail-sign" size={20} color={colors.status.info} />
          <Text style={styles.routeFlowTitle}>Parcours de votre conteneur</Text>
        </View>

        {/* Route Flow: Nansha → [Transit] → DAKAR → Diboli → Bamako */}
        <View style={styles.routeFlowVisual}>
          {/* Nansha */}
          <View style={styles.routeFlowItem}>
            <View style={[styles.routeFlowDot, { backgroundColor: colors.status.info }]} />
            <Text style={styles.routeFlowText}>Nansha</Text>
            <Text style={styles.routeFlowSubtext}>Chine</Text>
          </View>

          <View style={styles.routeFlowArrow}>
            <Ionicons name="arrow-forward" size={14} color={colors.text.disabled} />
          </View>

          {/* Transit Icon */}
          <View style={styles.routeFlowTransit}>
            <Ionicons name="boat" size={18} color={colors.text.secondary} />
            <Text style={styles.routeFlowTransitText}>[Transit]</Text>
          </View>

          <View style={styles.routeFlowArrow}>
            <Ionicons name="arrow-forward" size={14} color={colors.text.disabled} />
          </View>

          {/* Dakar - Highlighted */}
          <View style={[styles.routeFlowItem, styles.routeFlowHighlight]}>
            <View style={[styles.routeFlowDot, styles.routeFlowDotDakar]}>
              <Ionicons name="boat" size={12} color={colors.text.inverse} />
            </View>
            <Text style={[styles.routeFlowText, styles.routeFlowTextHighlight]}>DAKAR</Text>
            <Text style={styles.routeFlowSubtext}>Port d'arrivée</Text>
            <View style={styles.mainPortTag}>
              <Text style={styles.mainPortTagText}>PRINCIPAL</Text>
            </View>
          </View>

          <View style={styles.routeFlowArrow}>
            <Ionicons name="arrow-forward" size={14} color={colors.text.disabled} />
          </View>

          {/* Diboli */}
          <View style={styles.routeFlowItem}>
            <View style={[styles.routeFlowDot, { backgroundColor: colors.status.warning }]} />
            <Text style={styles.routeFlowText}>Diboli</Text>
            <Text style={styles.routeFlowSubtext}>Frontière</Text>
          </View>

          <View style={styles.routeFlowArrow}>
            <Ionicons name="arrow-forward" size={14} color={colors.text.disabled} />
          </View>

          {/* Bamako */}
          <View style={[styles.routeFlowItem, styles.routeFlowFinal]}>
            <View style={[styles.routeFlowDot, { backgroundColor: colors.primary.main }]}>
              <Ionicons name="home" size={10} color={colors.text.inverse} />
            </View>
            <Text style={styles.routeFlowText}>Bamako</Text>
            <Text style={styles.routeFlowSubtext}>Retrait</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
