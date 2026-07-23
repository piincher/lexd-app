import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PointsBalanceHeader.styles';

interface NextReward {
  name: string;
  pointsRequired: number;
}

interface PointsBalanceHeaderProps {
  points: number;
  /** Closest reward the user is still saving toward, for the progress nudge. */
  nextReward?: NextReward | null;
  onHistory?: () => void;
  onRedemptions?: () => void;
}

export const PointsBalanceHeader: React.FC<PointsBalanceHeaderProps> = ({
  points,
  nextReward,
  onHistory,
  onRedemptions,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const gap = nextReward ? Math.max(0, nextReward.pointsRequired - points) : 0;
  const progress =
    nextReward && nextReward.pointsRequired > 0
      ? Math.max(0, Math.min(1, points / nextReward.pointsRequired))
      : 0;

  return (
    <LinearGradient
      colors={[colors.primary.light, colors.primary.main, colors.primary.dark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topRow}>
        <View style={styles.labelRow}>
          <MaterialCommunityIcons name="star-four-points" size={15} color="rgba(255,255,255,0.9)" />
          <Text style={styles.label}>Points disponibles</Text>
        </View>
        <View style={styles.headerActions}>
          {onRedemptions && (
            <Pressable onPress={onRedemptions} hitSlop={8} style={styles.iconButton} accessibilityLabel="Mes échanges">
              <MaterialCommunityIcons name="clipboard-list-outline" size={18} color={colors.text.inverse} />
            </Pressable>
          )}
          {onHistory && (
            <Pressable onPress={onHistory} hitSlop={8} style={styles.iconButton} accessibilityLabel="Historique des points">
              <MaterialCommunityIcons name="history" size={18} color={colors.text.inverse} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{points.toLocaleString('fr-FR')}</Text>
        <Text style={styles.valueUnit}>pts</Text>
      </View>

      {nextReward && gap > 0 ? (
        <View style={styles.nudge}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.nudgeText} numberOfLines={1}>
            Plus que <Text style={styles.nudgeStrong}>{gap.toLocaleString('fr-FR')} pts</Text> pour « {nextReward.name} »
          </Text>
        </View>
      ) : (
        <View style={styles.nudge}>
          <View style={styles.readyRow}>
            <MaterialCommunityIcons name="check-decagram" size={15} color={colors.text.inverse} />
            <Text style={styles.nudgeText}>
              {points > 0 ? 'Vous pouvez échanger vos points dès maintenant' : 'Gagnez des points à chaque livraison'}
            </Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};
