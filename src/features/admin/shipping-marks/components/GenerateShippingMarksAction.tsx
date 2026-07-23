import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ShippingMarkGenerationJob } from '../api/shippingMarkAdminApi';
import type { GenerateMode } from '../hooks/useShippingMarkGenerationActions';
import { createStyles } from './GenerateShippingMarksAction.styles';

interface GenerateShippingMarksActionProps {
  count: number;
  selectedCount: number;
  filtered: boolean;
  mode?: GenerateMode;
  job?: ShippingMarkGenerationJob;
  loading: boolean;
  disabled: boolean;
  onPress: () => void;
}

const scopeSuffix = (selectedCount: number, filtered: boolean, count: number) => {
  if (selectedCount) return `la sélection (${selectedCount})`;
  return filtered ? `les résultats (${count})` : `toutes les marques (${count})`;
};

export const GenerateShippingMarksAction = ({
  count, selectedCount, filtered, mode = 'missing', job, loading, disabled, onPress,
}: GenerateShippingMarksActionProps) => {
  const { colors, isDark } = useAppTheme();
  const isRegenerate = mode === 'regenerate';
  const accent = isRegenerate ? colors.status.error : colors.primary.main;
  const styles = createStyles(colors, isDark, accent, isRegenerate ? colors.background.card : undefined);
  const processed = (job?.generated ?? 0) + (job?.failed ?? 0);
  const progress = job?.total ? Math.min(100, (processed / job.total) * 100) : 0;

  const verb = isRegenerate ? 'Régénérer' : 'Générer';
  const title = `${verb} ${scopeSuffix(selectedCount, filtered, count)}`;
  const idleSubtitle = isRegenerate
    ? 'Nouveau design · écrase les marques existantes'
    : 'Crée uniquement les marques manquantes';
  const subtitle = loading && job ? `${processed}/${job.total} traitées en arrière-plan` : idleSubtitle;
  const hint = isRegenerate
    ? 'Reconstruit toutes les marques ciblées avec le nouveau design'
    : 'Programme la génération des marques manquantes';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, (disabled || loading) && styles.disabled]}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={hint}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      <View style={styles.iconBox}>
        <Ionicons name={isRegenerate ? 'refresh' : 'sparkles-outline'} size={22} color={accent} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
        {loading && <View style={styles.track}><View style={[styles.fill, { width: `${progress}%` }]} /></View>}
      </View>
      {loading
        ? <ActivityIndicator size="small" color={accent} />
        : <Ionicons name="arrow-forward" size={21} color={accent} />}
    </Pressable>
  );
};
