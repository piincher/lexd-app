import React, { memo, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { normalizePhotos } from '@src/shared/lib';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { PackingListGoods } from '@src/shared/types/packingListGoods';
import { createCardStyles } from './PackingListCard.styles';

interface PackingListCardProps {
  item: PackingListGoods;
  index: number;
  showPhotos?: boolean;
}

export const PackingListCard = memo(({ item, index, showPhotos = false }: PackingListCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { colors, isDark } = useAppTheme();
  const styles = createCardStyles(colors, isDark);
  const photo = normalizePhotos(item)[0];
  const weight = Number(item.weight);
  const cbm = Number(item.actualCBM);
  const missingWeight = !Number.isFinite(weight) || weight <= 0;
  const missingCBM = !Number.isFinite(cbm) || cbm <= 0;
  const accessibilityMetrics = `${missingCBM ? 'CBM manquant' : `CBM ${cbm.toFixed(2)}`}, ${missingWeight ? 'poids manquant' : `poids ${weight.toFixed(0)} kilogrammes`}, quantité ${item.quantity || 1}`;

  return (
    <Pressable
      onPress={() => setExpanded((value) => !value)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Colis ${item.goodsId}, ${item.description || 'sans description'}, ${accessibilityMetrics}`}
      accessibilityHint={expanded ? 'Masque les détails du colis' : 'Affiche les détails du colis'}
      accessibilityState={{ expanded }}
    >
      <View style={styles.topRow}>
        <View style={styles.indexBadge}><Text style={styles.indexText}>{index}</Text></View>
        <View style={styles.heading}>
          <Text style={styles.goodsId} numberOfLines={1}>{item.goodsId}</Text>
          <Text style={styles.description} numberOfLines={expanded ? undefined : 2}>
            {item.description || 'Sans description'}
          </Text>
        </View>
        {showPhotos && photo ? <Image source={{ uri: photo }} style={styles.photo} /> : null}
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={colors.text.secondary} />
      </View>

      <View style={styles.metrics}>
        <Metric icon="cube-outline" label="CBM" value={missingCBM ? 'Manquant' : cbm.toFixed(2)} warning={missingCBM} styles={styles} />
        <Metric icon="barbell-outline" label="Poids" value={missingWeight ? 'Manquant' : `${weight.toFixed(0)} kg`} warning={missingWeight} styles={styles} />
        <Metric icon="layers-outline" label="Quantité" value={item.quantity || 1} styles={styles} />
      </View>

      {expanded && (
        <View style={styles.details}>
          <Detail label="Statut" value={item.status?.replaceAll('_', ' ') || 'Non renseigné'} styles={styles} />
          <Detail label="Suivi express" value={item.expressTrackingNumber || 'Non renseigné'} styles={styles} />
          <Detail label="Emplacement" value={item.warehouseLocation || 'Non renseigné'} styles={styles} />
        </View>
      )}
    </Pressable>
  );
});

PackingListCard.displayName = 'PackingListCard';

const Metric = ({ icon, label, value, warning, styles }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string | number; warning?: boolean; styles: ReturnType<typeof createCardStyles> }) => (
  <View style={styles.metric}>
    <Ionicons name={icon} size={16} style={warning ? styles.warningIcon : styles.metricIcon} />
    <View><Text style={styles.metricLabel}>{label}</Text><Text style={warning ? styles.warningValue : styles.metricValue}>{value}</Text></View>
  </View>
);

const Detail = ({ label, value, styles }: { label: string; value: string; styles: ReturnType<typeof createCardStyles> }) => (
  <View style={styles.detailRow}><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>
);
