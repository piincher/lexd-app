import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ShippingMarkGenerationJob } from '../api/shippingMarkAdminApi';
import { createStyles } from './GenerateShippingMarksAction.styles';

interface GenerateShippingMarksActionProps {
  count: number;
  selectedCount: number;
  filtered: boolean;
  job?: ShippingMarkGenerationJob;
  loading: boolean;
  disabled: boolean;
  onPress: () => void;
}

export const GenerateShippingMarksAction = ({
  count, selectedCount, filtered, job, loading, disabled, onPress,
}: GenerateShippingMarksActionProps) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const processed = (job?.generated ?? 0) + (job?.failed ?? 0);
  const progress = job?.total ? Math.min(100, (processed / job.total) * 100) : 0;
  const title = selectedCount
    ? `Générer la sélection (${selectedCount})`
    : filtered ? `Générer les résultats (${count})` : `Générer toutes les marques (${count})`;
  const subtitle = loading && job
    ? `${processed}/${job.total} traitées en arrière-plan`
    : 'Crée uniquement les marques manquantes';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, (disabled || loading) && styles.disabled]}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint="Programme la génération des marques manquantes"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      <View style={styles.iconBox}><Ionicons name="sparkles-outline" size={22} color={colors.primary.main} /></View>
      <View style={styles.copy}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
        {loading && <View style={styles.track}><View style={[styles.fill, { width: `${progress}%` }]} /></View>}
      </View>
      {loading
        ? <ActivityIndicator size="small" color={colors.primary.main} />
        : <Ionicons name="arrow-forward" size={21} color={colors.primary.main} />}
    </Pressable>
  );
};
