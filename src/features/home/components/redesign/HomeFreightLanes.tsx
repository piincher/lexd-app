import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createHomeRedesignStyles } from './HomeRedesign.styles';

interface HomeFreightLanesProps { onSelect: () => void; }

const LANES = [
  { key: 'air', title: 'Fret aérien', meta: 'Pour les marchandises urgentes ou légères', time: '2–3 semaines', icon: 'airplane-outline' },
  { key: 'sea', title: 'Fret maritime', meta: 'Pour les volumes importants et les budgets maîtrisés', time: '6–8 semaines', icon: 'boat-outline' },
] as const;

export const HomeFreightLanes: React.FC<HomeFreightLanesProps> = ({ onSelect }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createHomeRedesignStyles(colors, isDark);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Deux façons d’avancer</Text>
        <Text style={styles.sectionBody}>Le délai change. Le suivi reste le même.</Text>
      </View>
      <View style={styles.laneList}>
        {LANES.map((lane) => (
          <Pressable
            key={lane.key}
            onPress={onSelect}
            accessibilityRole="button"
            accessibilityLabel={`${lane.title}, ${lane.time}`}
            style={({ pressed }) => [styles.lane, pressed && styles.lanePressed]}
          >
            <View style={styles.laneTop}>
              <View style={styles.laneMarker}>
                <Ionicons name={lane.icon} size={22} color={lane.key === 'air' ? colors.accent.amberDark : colors.primary.main} />
              </View>
              <View style={styles.laneCopy}>
                <Text style={styles.laneTitle}>{lane.title}</Text>
                <Text style={styles.laneMeta}>{lane.meta}</Text>
              </View>
            </View>
            <View style={styles.laneFooter}>
              <Text style={styles.laneTime}>{lane.time}</Text>
              <View style={styles.laneTop}>
                <Text style={styles.laneAction} numberOfLines={1}>Vérifier un trajet</Text>
                <Ionicons name="arrow-forward" size={17} color={colors.text.primary} />
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
