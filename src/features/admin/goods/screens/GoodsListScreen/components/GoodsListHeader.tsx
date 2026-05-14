/**
 * GoodsListHeader - Header section with stats
 * SRP: Display header with greeting, title, and statistics
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@src/constants/Theme';

interface GoodsListHeaderProps {
  total: number;
  pendingCount: number;
  onExportPress?: () => void;
  isSelectionMode?: boolean;
  onToggleSelectionMode?: () => void;
}

interface StatCardProps {
  value: number;
  label: string;
  icon: string;
  gradient: readonly [string, string, ...string[]];
}

const StatCard: React.FC<StatCardProps> = ({ value, label, icon, gradient }) => (
  <View style={styles.statCard}>
    <LinearGradient colors={gradient} style={styles.iconContainer}>
      <Ionicons name={icon as any} size={20} color={Theme.colors.text.inverse} />
    </LinearGradient>
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

export const GoodsListHeader: React.FC<GoodsListHeaderProps> = ({
  total,
  pendingCount,
  onExportPress,
  isSelectionMode,
  onToggleSelectionMode,
}) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  return (
    <LinearGradient colors={Theme.gradients.glass} style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.greeting}>Bonjour! 👋</Text>
          <Text style={styles.title}>Marchandises</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
        {onToggleSelectionMode && (
          <TouchableOpacity onPress={onToggleSelectionMode} style={styles.exportButton} activeOpacity={0.8}>
            <Ionicons
              name={isSelectionMode ? 'close' : 'checkbox-outline'}
              size={22}
              color={isSelectionMode ? Theme.status.error : Theme.primary[500]}
            />
          </TouchableOpacity>
        )}
        {onExportPress && (
          <TouchableOpacity onPress={onExportPress} style={styles.exportButton} activeOpacity={0.8}>
            <Ionicons name="document-text" size={22} color={Theme.primary[500]} />
          </TouchableOpacity>
        )}
        </View>
      </View>

      <View style={styles.statsRow}>
      <StatCard value={total} label="Total" icon="cube" gradient={Theme.gradients.primary} />
      <StatCard value={pendingCount} label="En attente" icon="time" gradient={Theme.gradients.ocean} />
      </View>
      <NotificationBell
        onPress={() => navigation.navigate('Notifications' as never)}
        size={24}
        color={Theme.neutral[800]}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    marginBottom: Theme.spacing.lg,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[500],
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.Theme.colors.background.card,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  exportButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.Theme.colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[400],
    marginTop: 2,
  },
});

export default GoodsListHeader;
