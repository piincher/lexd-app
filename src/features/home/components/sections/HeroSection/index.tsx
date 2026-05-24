/**
 * HeroSection
 * Route-console hero for the guest accueil screen.
 */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './HeroSection.styles';
import { HeroBadge } from './HeroBadge';
import { HeroTitle } from './HeroTitle';
import { HeroCTA } from './HeroCTA';

export const HeroSection: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Animated.View entering={FadeInDown.duration(420)}>
      <LinearGradient
        colors={isDark
          ? [colors.background.paper, colors.background.default]
          : [colors.primary[50], colors.background.default]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.container}
      >
        <View style={styles.content}>
          <HeroBadge />
          <HeroTitle />
          <View style={styles.routeCard}>
            <View style={styles.routeEndpoint}>
              <Text style={styles.routeLabel}>Depart</Text>
              <Text style={[styles.routeCity, { color: colors.text.primary }]}>Guangzhou</Text>
            </View>
            <View style={styles.routeLine}>
              <FontAwesome6 name="plane" size={13} color={colors.status.info} />
              <View style={[styles.routeRule, { backgroundColor: colors.border }]} />
              <FontAwesome6 name="ship" size={13} color={colors.primary.main} />
            </View>
            <View style={[styles.routeEndpoint, styles.routeEndpointRight]}>
              <Text style={styles.routeLabel}>Arrivee</Text>
              <Text style={[styles.routeCity, { color: colors.text.primary }]}>Bamako</Text>
            </View>
          </View>
          <HeroCTA />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
