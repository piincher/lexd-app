/* Hallmark · macrostructure: Stat-Led · genre: modern-minimal · tone: utilitarian
 * theme: brand-aligned app theme (useAppTheme) · anchor hue: brand green
 * KPI: 1 gradient hero (Total) + 2 flat halves (En attente / Traitées) with share bars
 * pre-emit critique: P4 H5 E4 S5 R4 V4
 */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@src/constants/Theme';
import { GoodsListStatCard } from './GoodsListStatCard';
import { GoodsListHeaderActions } from './GoodsListHeaderActions';
import { GoodsModeTabs } from './GoodsModeTabs';
import { SkeletonBlock } from './GoodsListSkeleton';
import type { ShippingMode } from '../../../hooks/useGoodsListFilters';
import { styles } from './GoodsListHeader.styles';

interface GoodsListHeaderProps {
  total: number;
  pendingCount: number;
  mode: ShippingMode;
  onChangeMode: (mode: ShippingMode) => void;
  loading?: boolean;
  onScanPress?: () => void;
  onExportPress?: () => void;
  onStatsPress?: () => void;
  isSelectionMode?: boolean;
  onToggleSelectionMode?: () => void;
}

export const GoodsListHeader: React.FC<GoodsListHeaderProps> = ({
  total,
  pendingCount,
  mode,
  onChangeMode,
  loading = false,
  onScanPress,
  onExportPress,
  onStatsPress,
  isSelectionMode,
  onToggleSelectionMode,
}) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();

  const processed = Math.max(0, total - pendingCount);
  const pendingShare = total > 0 ? pendingCount / total : 0;
  const processedShare = total > 0 ? processed / total : 0;

  // Per-mode hero identity — recoloring is the anti-mix-up signal.
  const isAir = mode === 'AIR';
  const heroGradient = isAir ? Theme.gradients.purple : Theme.gradients.ocean;
  const heroIcon = isAir ? 'airplane' : 'boat';
  const heroLabel = isAir ? 'marchandises aériennes' : 'marchandises maritimes';

  return (
    <View style={[styles.header, { backgroundColor: colors.background.default }]}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Marchandises</Text>
        <View style={styles.toolbarActions}>
          <GoodsListHeaderActions
            onScanPress={onScanPress}
            onToggleSelectionMode={onToggleSelectionMode}
            onExportPress={onExportPress}
            onStatsPress={onStatsPress}
            isSelectionMode={isSelectionMode}
            primaryColor={colors.primary.main}
            errorColor={colors.status.error}
            cardBgColor={colors.background.card}
          />
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={24}
            color={colors.text.primary}
          />
        </View>
      </View>

      {/* Mode switch — separates AIR / SEA */}
      <View style={styles.modeTabs}>
        <GoodsModeTabs mode={mode} onChange={onChangeMode} />
      </View>

      {/* Hero KPI — recolors per mode so the active view is unmistakable */}
      <LinearGradient
        colors={heroGradient}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.hero}
      >
        <View style={styles.heroCircleLg} />
        <View style={styles.heroCircleSm} />
        <View style={styles.heroBody}>
          <View style={styles.heroChip}>
            <Ionicons name={heroIcon as any} size={26} color="#FFFFFF" />
          </View>
          <View style={styles.heroText}>
            {loading ? (
              <SkeletonBlock
                width={92}
                height={40}
                radius={Theme.radius.md}
                style={styles.heroValueSkeleton}
              />
            ) : (
              <Text style={styles.heroValue}>{total}</Text>
            )}
            <Text style={styles.heroLabel}>{heroLabel}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Asymmetric secondary stats */}
      <View style={styles.statsRow}>
        <GoodsListStatCard
          value={pendingCount}
          label="En attente"
          icon="time-outline"
          accentColor={colors.status.warning}
          progress={pendingShare}
          loading={loading}
        />
        <GoodsListStatCard
          value={processed}
          label="Traitées"
          icon="checkmark-done"
          accentColor={colors.status.success}
          progress={processedShare}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default GoodsListHeader;
