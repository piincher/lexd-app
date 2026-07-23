import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createHomeRedesignStyles } from './HomeRedesign.styles';

export const HomeIntro: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createHomeRedesignStyles(colors, isDark);

  return (
    <View style={styles.intro}>
      <View style={styles.routeTag}>
        <View style={styles.routeDot} />
        <Text style={styles.routeTagText}>Chine → Afrique</Text>
      </View>
      <Text style={styles.introTitle}>Vos marchandises, sans zone grise.</Text>
      <Text style={styles.introBody}>
        Achat, réception en Chine, contrôle et livraison au Mali — un parcours clair dans une seule application.
      </Text>
      <View style={styles.routeLine}>
        <View style={styles.routePlace}>
          <Text style={styles.routeLabel}>Départ</Text>
          <Text style={styles.routeCity}>Guangzhou</Text>
        </View>
        <View style={styles.routeModes} accessibilityLabel="Transport aérien et maritime">
          <Ionicons
            name="airplane-outline"
            size={18}
            color={isDark ? colors.accent.amberLight : colors.accent.amberDark}
          />
          <View style={styles.routeModeRule} />
          <Ionicons name="boat-outline" size={18} color={colors.primary.main} />
        </View>
        <View style={[styles.routePlace, styles.routePlaceRight]}>
          <Text style={styles.routeLabel}>Arrivée</Text>
          <Text style={styles.routeCity}>Bamako</Text>
        </View>
      </View>
    </View>
  );
};
