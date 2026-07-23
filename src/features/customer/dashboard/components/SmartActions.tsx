import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, RAIL_WIDTH, HAIRLINE } from '@src/shared/ui/designLanguage';
import { QuickAction } from '../types';
import * as Haptics from 'expo-haptics';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface Props {
  actions: QuickAction[];
  onActionPress: (action: QuickAction) => void;
}

// `gradient` was carried on this type but never rendered — dropped.
type ActionMeta = { icon: IoniconName; tint: string; sublabel: string };

// Tints stay inside the brand: green, amber, and a quiet neutral for the
// tertiary action, rather than the previous green/blue/orange spread.
const getActionMeta = (colors: any): Record<string, ActionMeta> => ({
  'view-goods': {
    icon: 'cube',
    tint: colors.primary.main,
    sublabel: 'Voir vos colis',
  },
  'view-containers': {
    icon: 'airplane',
    tint: colors.accent.amber,
    sublabel: 'Maritime et aérien',
  },
  'support': {
    icon: 'chatbubble-ellipses',
    tint: colors.text.secondary,
    sublabel: 'Contactez-nous',
  },
});

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 2;

export const SmartActions: React.FC<Props> = ({ actions, onActionPress }) => {
  const { colors } = useAppTheme();
  const actionMeta = useMemo(() => getActionMeta(colors), [colors]);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginTop: 24, paddingHorizontal: 16 },
        headerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
        headerTick: {
          width: RAIL_WIDTH,
          height: 11,
          borderRadius: 1,
          backgroundColor: colors.primary.main,
        },
        header: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          color: colors.text.secondary,
        },
        grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
        // Restrained surface: the tile is a bordered card, not a saturated
        // color block. Its tint reads through the rail and icon only.
        card: {
          width: CARD_SIZE,
          height: CARD_SIZE * 0.85,
          borderRadius: RADIUS.card,
          padding: 14,
          paddingLeft: 14 + RAIL_WIDTH,
          justifyContent: 'space-between',
          overflow: 'hidden',
          backgroundColor: colors.background.card,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
        rail: { position: 'absolute', left: 0, top: 0, bottom: 0, width: RAIL_WIDTH },
        iconRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
        iconTile: {
          width: 42,
          height: 42,
          borderRadius: RADIUS.control,
          justifyContent: 'center',
          alignItems: 'center',
        },
        arrow: {
          width: 26,
          height: 26,
          borderRadius: RADIUS.control,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
          justifyContent: 'center',
          alignItems: 'center',
        },
        label: { fontSize: 14, fontWeight: '700', color: colors.text.primary },
        sublabel: { fontSize: 11.5, fontWeight: '500', color: colors.text.secondary, marginTop: 2 },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerTick} />
        <Text style={styles.header}>Actions rapides</Text>
      </View>
      <View style={styles.grid}>
        {actions.map((action) => {
          const meta = actionMeta[action.id] || {
            icon: 'apps' as IoniconName,
            tint: colors.primary.main,
            sublabel: 'Appuyez pour voir',
          };
          return (
            <Pressable
              key={action.id}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onActionPress(action);
              }}
              style={({ pressed }) => [
                styles.card,
                pressed && { transform: [{ scale: 0.99 }], opacity: 0.9 },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`${action.label}. ${meta.sublabel}`}
            >
              <View style={[styles.rail, { backgroundColor: meta.tint }]} pointerEvents="none" />

              <View style={styles.iconRow}>
                <View style={[styles.iconTile, { backgroundColor: `${meta.tint}14` }]}>
                  <Ionicons name={meta.icon} size={21} color={meta.tint} />
                </View>
                <View style={styles.arrow}>
                  <Ionicons name="arrow-forward" size={13} color={colors.text.secondary} />
                </View>
              </View>
              <View>
                <Text style={styles.label} numberOfLines={1}>
                  {action.label}
                </Text>
                <Text style={styles.sublabel}>{meta.sublabel}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default SmartActions;
