/* Hallmark · genre: modern-minimal · macrostructure: Operations command surface · designed-as-app */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CapacityUsageBar } from '../../../components/CapacityUsageBar';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ClientGoodsGroup, ContainerSummary } from '../../../types/packingList';
import { createStyles } from './PackingListCommandPanel.styles';

interface PackingListCommandPanelProps {
  allClients: ClientGoodsGroup[];
  clients: ClientGoodsGroup[];
  selectedClientId: string | null;
  summary: ContainerSummary;
}

export const PackingListCommandPanel: React.FC<PackingListCommandPanelProps> = ({
  allClients,
  clients,
  selectedClientId,
  summary,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const isSingleClient = Boolean(selectedClientId && clients.length === 1);
  const scopeLabel = isSingleClient ? clients[0].clientName : 'Container complet';
  const totalArticles = summary.totalQuantity || summary.totalPackages || 0;
  const maxCBM = summary.maxCBM || 67;
  const overCapacity = summary.totalCBM > maxCBM;

  return (
    <View style={styles.panel}>
      <View style={styles.heroRow}>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>Liste de colisage</Text>
          <Text style={styles.scope} numberOfLines={1}>{scopeLabel}</Text>
          <Text style={styles.meta}>
            {isSingleClient ? 'Vue client' : `${allClients.length} clients`} · {summary.totalItems} colis
          </Text>
        </View>
        <View style={styles.articleHero}>
          <Text style={styles.articleValue}>{totalArticles}</Text>
          <Text style={styles.articleLabel}>articles</Text>
        </View>
      </View>

      <View style={styles.capacityBlock}>
        <View style={styles.capacityHeader}>
          <Ionicons name="cube-outline" size={17} color={colors.primary[600]} />
          <Text style={styles.capacityTitle}>Capacité container</Text>
          <Text style={styles.capacityMeta}>{summary.totalCBM.toFixed(2)} m³</Text>
        </View>
        <CapacityUsageBar
          used={summary.totalCBM}
          max={maxCBM}
          unit="m³"
          showPercentage
          showLabels
          height={24}
          variant="cbm"
        />
        {overCapacity && (
          <View style={styles.capacityWarning}>
            <Ionicons name="warning-outline" size={17} color={colors.status.error} />
            <Text style={styles.capacityWarningText}>Capacité dépassée de {(summary.totalCBM - maxCBM).toFixed(2)} m³</Text>
          </View>
        )}
      </View>

      <View style={styles.metrics}>
        <Metric label="Clients" value={isSingleClient ? 1 : allClients.length} styles={styles} />
        <Metric label="Colis" value={summary.totalItems} styles={styles} />
        <Metric label="Poids" value={`${summary.totalWeight.toFixed(0)} kg`} styles={styles} />
      </View>
    </View>
  );
};

const Metric = ({ label, value, styles }: {
  label: string; value: string | number; styles: ReturnType<typeof createStyles>;
}) => (
  <View style={styles.metric}>
    <Text style={styles.metricValue} numberOfLines={1}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);
