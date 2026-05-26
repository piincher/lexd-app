import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme, type ThemeContextType } from '@src/constants/Theme';
import { ClientGoodsGroup, ContainerSummary } from '../../../types/packingList';

type AppColors = ThemeContextType['colors'];

interface DocumentPreviewCardProps {
  allClients: ClientGoodsGroup[];
  clients: ClientGoodsGroup[];
  selectedClientId: string | null;
  summary: ContainerSummary;
}

export const DocumentPreviewCard: React.FC<DocumentPreviewCardProps> = ({
  allClients,
  clients,
  selectedClientId,
  summary,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const isSingleClient = Boolean(selectedClientId && clients.length === 1);
  const scopeLabel = isSingleClient ? clients[0].clientName : 'Tous les clients';
  const clientCount = isSingleClient ? 1 : allClients.length;
  const totalArticles = summary.totalQuantity || summary.totalPackages || 0;

  return (
    <Animated.View entering={FadeInUp.delay(80)} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="document-text-outline" size={18} color={colors.primary[600]} />
          <Text style={styles.title}>Aperçu export</Text>
        </View>
        <View style={styles.badges}>
          <Text style={styles.badgeText}>PDF</Text>
          <Text style={styles.badgeText}>Partage</Text>
        </View>
      </View>

      <Text style={styles.scope} numberOfLines={1}>
        {scopeLabel}
      </Text>

      <View style={styles.metrics}>
        <Metric label="Clients" value={clientCount} styles={styles} />
        <Metric label="Colis" value={summary.totalItems} styles={styles} />
        <Metric label="Articles" value={totalArticles} styles={styles} />
        <Metric label="CBM" value={summary.totalCBM.toFixed(2)} styles={styles} />
      </View>
    </Animated.View>
  );
};

const Metric = ({
  label,
  value,
  styles,
}: {
  label: string;
  value: string | number;
  styles: ReturnType<typeof createStyles>;
}) => (
  <View style={styles.metric}>
    <Text style={styles.metricValue} numberOfLines={1}>
      {value}
    </Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

const createStyles = (colors: AppColors, isDark?: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: Theme.radius.lg,
      borderWidth: 1,
      borderColor: isDark ? colors.neutral[700] : colors.neutral[200],
      padding: Theme.spacing.lg,
      marginBottom: Theme.spacing.lg,
      ...Theme.shadows.sm,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Theme.spacing.md,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Theme.spacing.sm,
      flex: 1,
      minWidth: 0,
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.primary,
    },
    badges: {
      flexDirection: 'row',
      gap: Theme.spacing.xs,
    },
    badgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.primary[700],
      backgroundColor: colors.primary[50],
      paddingHorizontal: Theme.spacing.sm,
      paddingVertical: 3,
      borderRadius: Theme.radius.sm,
    },
    scope: {
      marginTop: Theme.spacing.md,
      fontSize: 16,
      fontWeight: '800',
      color: colors.neutral[800],
    },
    metrics: {
      flexDirection: 'row',
      marginTop: Theme.spacing.md,
      gap: Theme.spacing.sm,
    },
    metric: {
      flex: 1,
      minWidth: 0,
      paddingVertical: Theme.spacing.sm,
      paddingHorizontal: Theme.spacing.xs,
      borderRadius: Theme.radius.sm,
      backgroundColor: isDark ? colors.neutral[800] : colors.neutral[50],
      alignItems: 'center',
    },
    metricValue: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.primary[600],
    },
    metricLabel: {
      marginTop: 2,
      fontSize: 11,
      fontWeight: '600',
      color: colors.text.secondary,
    },
  });
