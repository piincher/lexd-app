/**
 * ShipmentTimeline — the single progress view for every shipment.
 *
 * Replaces six separate implementations (ContainerTimeline, TransitTimeline,
 * TimelineWaypointCard, GoodsDetailTimeline, OrderTimeline, AirwayBill
 * timeline). Whether cargo travels by sea or air no longer decides which
 * component a customer sees — the mode only changes the icons and one label.
 *
 * Two densities:
 *   detail   nine stages, vertical, with hints and dates — the record screen
 *   compact  five milestones, horizontal — cards and list rows
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';
import {
  SHIPMENT_STAGES,
  MILESTONE_STAGES,
  STAGE_BY_KEY,
  type ShipmentMode,
  type ShipmentStage,
} from '../model/lifecycle';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

/** Icons per stage. Only the transit leg differs by mode. */
const stageIcon = (stage: ShipmentStage, mode: ShipmentMode): IconName => {
  switch (stage) {
    case 'REGISTERED':
      return 'file-document-outline';
    case 'AT_WAREHOUSE':
      return 'warehouse';
    case 'PREPARING':
      return 'package-variant-closed';
    case 'CONSOLIDATED':
      return 'package-variant';
    case 'DEPARTED':
      return mode === 'AIR' ? 'airplane-takeoff' : 'anchor';
    case 'IN_TRANSIT':
      return mode === 'AIR' ? 'airplane' : 'ferry';
    case 'ARRIVED':
      return 'map-marker-check-outline';
    case 'READY_FOR_PICKUP':
      return 'hand-extended-outline';
    case 'DELIVERED':
      return 'check-circle-outline';
    default:
      return 'circle-outline';
  }
};

export interface ShipmentTimelineProps {
  stage: ShipmentStage | null;
  mode?: ShipmentMode;
  variant?: 'detail' | 'compact';
  /** Optional real dates, keyed by stage. */
  dates?: Partial<Record<ShipmentStage, string | undefined>>;
  /** Formats a date for display. Defaults to a short French date. */
  formatDate?: (iso: string) => string;
  testID?: string;
}

const defaultFormat = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

export const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({
  stage,
  mode = 'UNKNOWN',
  variant = 'detail',
  dates,
  formatDate = defaultFormat,
  testID,
}) => {
  const { colors } = useAppTheme();
  const currentIndex = stage ? STAGE_BY_KEY[stage].index : -1;
  const steps = variant === 'compact' ? MILESTONE_STAGES : SHIPMENT_STAGES;

  const s = useMemo(
    () =>
      StyleSheet.create({
        // --- compact ---
        compactRow: { flexDirection: 'row', alignItems: 'flex-start' },
        compactStep: { flex: 1, alignItems: 'center' },
        compactNode: {
          width: 26,
          height: 26,
          borderRadius: RADIUS.control,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
        },
        compactConnector: { position: 'absolute', top: 12, height: 2, zIndex: -1 },
        compactLabel: {
          fontSize: 8.5,
          fontWeight: '700',
          letterSpacing: 0.4,
          textTransform: 'uppercase',
          marginTop: 6,
          textAlign: 'center',
        },

        // --- detail ---
        detailRow: { flexDirection: 'row' },
        spine: { width: 40, alignItems: 'center' },
        node: {
          width: 34,
          height: 34,
          borderRadius: RADIUS.control,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
        },
        connector: { width: 2, flex: 1, minHeight: 18, marginVertical: 3 },
        body: { flex: 1, paddingBottom: 18, paddingLeft: 4 },
        labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
        label: { fontSize: 14, fontWeight: '700' },
        date: {
          fontSize: 9.5,
          fontWeight: '700',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          marginLeft: 'auto',
        },
        hint: { fontSize: 12, lineHeight: 17, marginTop: 2 },
        nowTag: {
          alignSelf: 'flex-start',
          marginTop: 6,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: RADIUS.badge,
          borderWidth: HAIRLINE,
        },
        nowText: {
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 0.6,
          textTransform: 'uppercase',
        },
      }),
    [],
  );

  /** Colors for a step given its position relative to the current stage. */
  const tone = (index: number) => {
    const done = currentIndex > index;
    const now = currentIndex === index;
    if (now) {
      return {
        fill: colors.primary.main,
        border: colors.primary.main,
        icon: colors.text.inverse,
        text: colors.text.primary,
        line: colors.primary.main,
      };
    }
    if (done) {
      return {
        fill: `${colors.primary.main}1A`,
        border: colors.primary.main,
        icon: colors.primary.main,
        text: colors.text.secondary,
        line: colors.primary.main,
      };
    }
    return {
      fill: 'transparent',
      border: colors.border,
      icon: colors.text.disabled,
      text: colors.text.disabled,
      line: colors.border,
    };
  };

  // ---------------------------------------------------------- compact
  if (variant === 'compact') {
    return (
      <View style={s.compactRow} testID={testID}>
        {steps.map((step, i) => {
          const t = tone(step.index);
          const prev = i > 0 ? tone(steps[i - 1].index) : null;
          return (
            <View key={step.key} style={s.compactStep}>
              {prev ? (
                <View
                  style={[
                    s.compactConnector,
                    {
                      backgroundColor:
                        currentIndex >= step.index ? prev.line : colors.border,
                      left: '-50%',
                      right: '50%',
                    },
                  ]}
                  pointerEvents="none"
                />
              ) : null}
              <View style={[s.compactNode, { backgroundColor: t.fill, borderColor: t.border }]}>
                <MaterialCommunityIcons
                  name={stageIcon(step.key, mode)}
                  size={13}
                  color={t.icon}
                />
              </View>
              <Text style={[s.compactLabel, { color: t.text }]} numberOfLines={1}>
                {step.short}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

  // ---------------------------------------------------------- detail
  return (
    <View testID={testID}>
      {steps.map((step, i) => {
        const t = tone(step.index);
        const isLast = i === steps.length - 1;
        const iso = dates?.[step.key];
        const when = iso ? formatDate(iso) : '';
        const isNow = currentIndex === step.index;

        return (
          <View key={step.key} style={s.detailRow}>
            <View style={s.spine}>
              <View style={[s.node, { backgroundColor: t.fill, borderColor: t.border }]}>
                <MaterialCommunityIcons
                  name={stageIcon(step.key, mode)}
                  size={17}
                  color={t.icon}
                />
              </View>
              {!isLast ? (
                <View
                  style={[
                    s.connector,
                    { backgroundColor: currentIndex > step.index ? t.line : colors.border },
                  ]}
                />
              ) : null}
            </View>

            <View style={s.body}>
              <View style={s.labelRow}>
                <Text style={[s.label, { color: t.text }]}>{step.label}</Text>
                {when ? <Text style={[s.date, { color: colors.text.muted }]}>{when}</Text> : null}
              </View>

              {/* Only the current stage explains itself — showing nine hints at
                  once buries the one the customer is actually living in. */}
              {isNow ? (
                <>
                  <Text style={[s.hint, { color: colors.text.secondary }]}>{step.hint}</Text>
                  <View
                    style={[
                      s.nowTag,
                      {
                        borderColor: colors.primary.main,
                        backgroundColor: `${colors.primary.main}12`,
                      },
                    ]}
                  >
                    <Text style={[s.nowText, { color: colors.primary.dark }]}>Étape actuelle</Text>
                  </View>
                </>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ShipmentTimeline;
