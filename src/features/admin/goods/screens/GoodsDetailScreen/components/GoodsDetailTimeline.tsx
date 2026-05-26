/* Hallmark · macrostructure: Narrative Workflow · component: lifecycle journey rail (spine)
 * genre: modern-minimal · theme: brand-aligned app theme
 * Vertical rail — the shipment's lifecycle is the page's organizing spine, not a buried
 * horizontal strip. Completed = green check, current = primary node + emphasis, pending = muted.
 * Mode-aware steps mirror the canonical flow in features/goods/lib/goodsHelpers.ts:
 *   SEA → Réception · Assignation conteneur · Chargement · Transit · Arrivée · Retrait · Livré
 *   AIR → Réception · Préparation (lettre de transport) · Transit aérien · Arrivée · Retrait · Livré
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 */
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface GoodsDetailTimelineProps {
  status: string;
  shippingMode?: string;
}

type Step = { key: string; label: string; caption: string; icon: keyof typeof Ionicons.glyphMap };

// Sea freight: assigned to a container, then loaded into it.
const SEA_STEPS: Step[] = [
  { key: 'RECEIVED_AT_WAREHOUSE', label: 'Réception', caption: 'Marchandise reçue à l’entrepôt', icon: 'cube-outline' },
  { key: 'ASSIGNED_TO_CONTAINER', label: 'Assignation', caption: 'Affectée au conteneur', icon: 'link-outline' },
  { key: 'LOADED_IN_CONTAINER', label: 'Chargement', caption: 'Chargée dans le conteneur', icon: 'arrow-up-circle-outline' },
  { key: 'IN_TRANSIT', label: 'Transit', caption: 'En cours d’acheminement', icon: 'boat-outline' },
  { key: 'ARRIVED_DESTINATION', label: 'Arrivée', caption: 'Arrivée à destination', icon: 'location-outline' },
  { key: 'READY_FOR_PICKUP', label: 'Prêt pour retrait', caption: 'Disponible pour le client', icon: 'hand-left-outline' },
  { key: 'DELIVERED', label: 'Livré', caption: 'Remis au client', icon: 'checkmark-done-outline' },
];

// Air freight: no container — prepared & assigned to a lettre de transport (LTA), then flown.
const AIR_STEPS: Step[] = [
  { key: 'RECEIVED_AT_WAREHOUSE', label: 'Réception', caption: 'Marchandise reçue à l’entrepôt', icon: 'cube-outline' },
  { key: 'PACKED', label: 'Préparation', caption: 'Préparée et affectée à la lettre de transport', icon: 'document-attach-outline' },
  { key: 'IN_TRANSIT', label: 'Transit aérien', caption: 'En cours d’acheminement', icon: 'airplane-outline' },
  { key: 'ARRIVED_DESTINATION', label: 'Arrivée', caption: 'Arrivée à destination', icon: 'location-outline' },
  { key: 'READY_FOR_PICKUP', label: 'Prêt pour retrait', caption: 'Disponible pour le client', icon: 'hand-left-outline' },
  { key: 'DELIVERED', label: 'Livré', caption: 'Remis au client', icon: 'checkmark-done-outline' },
];

export const GoodsDetailTimeline: React.FC<GoodsDetailTimelineProps> = ({ status, shippingMode }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const isAir = shippingMode === 'AIR';
  const steps = isAir ? AIR_STEPS : SEA_STEPS;

  // Air parcels reuse the shared status enum but skip the container stages. If an air
  // parcel ever carries a container status, fold it onto the air "Préparation" step so
  // the rail still resolves a current position.
  const normalizedStatus =
    isAir && (status === 'ASSIGNED_TO_CONTAINER' || status === 'LOADED_IN_CONTAINER') ? 'PACKED' : status;

  const currentIndex = steps.findIndex((s) => s.key === normalizedStatus);
  const currentStep = currentIndex >= 0 ? steps[currentIndex] : undefined;

  return (
    <Card style={[styles.card, { backgroundColor: colors.background.card, borderWidth: 1, borderColor: colors.border }]}>
      <Card.Content>
        <View style={styles.head}>
          <View style={styles.headTitleRow}>
            <Ionicons name="git-commit-outline" size={20} color={colors.primary.main} />
            <Text style={styles.title}>Suivi du parcours</Text>
            <View style={[styles.modeChip, { backgroundColor: colors.primary[100] }]}>
              <Ionicons name={isAir ? 'airplane' : 'boat'} size={11} color={colors.primary[700]} />
              <Text style={[styles.modeChipText, { color: colors.primary[700] }]}>{isAir ? 'Aérien' : 'Maritime'}</Text>
            </View>
          </View>
          {currentStep ? (
            <Text style={styles.headCaption}>
              {`Étape ${currentIndex + 1} sur ${steps.length} · ${currentStep.label}`}
            </Text>
          ) : null}
        </View>

        <View style={styles.rail}>
          {steps.map((step, index) => {
            const isCompleted = currentIndex >= index;
            const isCurrent = currentIndex === index;
            const isLast = index === steps.length - 1;
            const isPastConnector = currentIndex > index;

            const nodeBg = isCurrent
              ? colors.primary.main
              : isCompleted
              ? colors.status.success
              : colors.background.paper;
            const nodeBorder = isCurrent
              ? colors.primary.main
              : isCompleted
              ? colors.status.success
              : colors.neutral[300];
            const iconColor = isCompleted || isCurrent ? colors.text.inverse : colors.text.disabled;
            const labelColor = isCurrent
              ? colors.primary.main
              : isCompleted
              ? colors.text.primary
              : colors.text.disabled;

            return (
              <View key={step.key} style={styles.row}>
                <View style={styles.gutter}>
                  <View style={[styles.node, isCurrent && styles.nodeCurrent, { backgroundColor: nodeBg, borderColor: nodeBorder }]}>
                    <Ionicons
                      name={(isCompleted && !isCurrent ? 'checkmark' : step.icon) as any}
                      size={isCurrent ? 16 : 14}
                      color={iconColor}
                    />
                  </View>
                  {!isLast && (
                    <View
                      style={[
                        styles.connector,
                        { backgroundColor: isPastConnector ? colors.status.success : colors.border },
                      ]}
                    />
                  )}
                </View>

                <View style={[styles.content, isLast && styles.contentLast]}>
                  <View style={styles.labelRow}>
                    <Text style={[styles.stepLabel, { color: labelColor, fontWeight: isCurrent ? '800' : '600' }]}>
                      {step.label}
                    </Text>
                    {isCurrent ? (
                      <View style={[styles.nowChip, { backgroundColor: colors.primary[100] }]}>
                        <Text style={[styles.nowChipText, { color: colors.primary[700] }]}>En cours</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text
                    style={[
                      styles.stepCaption,
                      { color: isCompleted || isCurrent ? colors.text.secondary : colors.text.disabled },
                    ]}
                  >
                    {step.caption}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Card.Content>
    </Card>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: { marginBottom: Theme.spacing.md, borderRadius: Theme.radius.xl, ...Theme.shadows.sm },
    head: { marginBottom: Theme.spacing.lg },
    headTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.sm, flexWrap: 'wrap' },
    title: { fontSize: 15, fontWeight: '700', letterSpacing: 0.2, color: colors.text.primary },
    modeChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: Theme.radius.full,
    },
    modeChipText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
    headCaption: { fontSize: 13, color: colors.text.secondary, marginTop: 4, marginLeft: 28 },
    rail: {},
    row: { flexDirection: 'row' },
    gutter: { width: 28, alignItems: 'center' },
    node: {
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
    },
    nodeCurrent: {
      ...Theme.shadows.sm,
    },
    connector: { width: 2, flex: 1, minHeight: 18, marginVertical: 2 },
    content: { flex: 1, minWidth: 0, paddingLeft: Theme.spacing.md, paddingBottom: Theme.spacing.lg },
    contentLast: { paddingBottom: 0 },
    labelRow: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.sm, flexWrap: 'wrap' },
    stepLabel: { fontSize: 15 },
    nowChip: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: Theme.radius.full },
    nowChipText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.4 },
    stepCaption: { fontSize: 13, marginTop: 2 },
  });
