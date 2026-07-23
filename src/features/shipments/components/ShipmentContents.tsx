/**
 * ShipmentContents — the packages inside a shipment.
 *
 * Goods used to be a top-level destination ("Mes Marchandises"). They are not
 * a peer of a shipment; they are what is in it. This section is where they
 * live now.
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';
import { stageShortLabel, type ShipmentItem } from '@src/entities/shipment';

interface Props {
  items: ShipmentItem[];
  totalWeightKg?: number;
  totalCbm?: number;
}

const num = (v?: number, unit = '') =>
  typeof v === 'number' && !Number.isNaN(v) ? `${Math.round(v * 100) / 100}${unit}` : '—';

export const ShipmentContents: React.FC<Props> = ({ items, totalWeightKg, totalCbm }) => {
  const { colors } = useAppTheme();

  const s = useMemo(
    () =>
      StyleSheet.create({
        empty: { fontSize: 12.5, color: colors.text.secondary, lineHeight: 18 },
        totals: {
          flexDirection: 'row',
          borderWidth: HAIRLINE,
          borderColor: colors.border,
          borderRadius: RADIUS.control,
          marginBottom: 12,
          overflow: 'hidden',
        },
        total: { flex: 1, paddingVertical: 10, paddingHorizontal: 12 },
        totalDivider: { width: HAIRLINE, backgroundColor: colors.border },
        totalValue: {
          fontSize: 15,
          fontWeight: '800',
          color: colors.text.primary,
          fontVariant: ['tabular-nums'],
        },
        totalLabel: {
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: colors.text.muted,
          marginTop: 2,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingVertical: 11,
          borderTopWidth: HAIRLINE,
          borderTopColor: colors.border,
        },
        tile: {
          width: 34,
          height: 34,
          borderRadius: RADIUS.control,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${colors.primary.main}12`,
        },
        body: { flex: 1, minWidth: 0 },
        ref: {
          fontSize: 12.5,
          fontWeight: '700',
          letterSpacing: 0.3,
          color: colors.text.primary,
        },
        desc: { fontSize: 11.5, color: colors.text.secondary, marginTop: 1 },
        measures: {
          fontSize: 10,
          color: colors.text.muted,
          marginTop: 2,
          fontVariant: ['tabular-nums'],
        },
        stage: {
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          color: colors.primary.main,
        },
      }),
    [colors],
  );

  if (items.length === 0) {
    return (
      <Text style={s.empty}>
        Le détail des colis apparaîtra ici dès leur réception à notre entrepôt.
      </Text>
    );
  }

  return (
    <View>
      <View style={s.totals}>
        <View style={s.total}>
          <Text style={s.totalValue}>{items.length}</Text>
          <Text style={s.totalLabel}>Colis</Text>
        </View>
        <View style={s.totalDivider} />
        <View style={s.total}>
          <Text style={s.totalValue}>{num(totalWeightKg, ' kg')}</Text>
          <Text style={s.totalLabel}>Poids</Text>
        </View>
        <View style={s.totalDivider} />
        <View style={s.total}>
          <Text style={s.totalValue}>{num(totalCbm)}</Text>
          <Text style={s.totalLabel}>CBM</Text>
        </View>
      </View>

      {items.map((item) => (
        <View key={item.id} style={s.row}>
          <View style={s.tile}>
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={17}
              color={colors.primary.main}
            />
          </View>
          <View style={s.body}>
            <Text style={s.ref} numberOfLines={1}>
              {item.reference}
            </Text>
            {item.description ? (
              <Text style={s.desc} numberOfLines={1}>
                {item.description}
              </Text>
            ) : null}
            <Text style={s.measures}>
              {num(item.weightKg, ' kg')} · {num(item.cbm)} CBM
            </Text>
          </View>
          <Text style={s.stage}>{stageShortLabel(item.stage)}</Text>
        </View>
      ))}
    </View>
  );
};

export default ShipmentContents;
