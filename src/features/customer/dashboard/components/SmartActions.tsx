import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { QuickAction } from '../types';
import * as Haptics from 'expo-haptics';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface Props {
  actions: QuickAction[];
  onActionPress: (action: QuickAction) => void;
}

type ActionMeta = { icon: IoniconName; tint: string; gradient: readonly [string, string]; sublabel: string };

const getActionMeta = (colors: any): Record<string, ActionMeta> => ({
  'view-goods': {
    icon: 'cube',
    tint: colors.primary.main,
    gradient: [colors.primary.main, colors.primary.light] as const,
    sublabel: 'Voir vos colis',
  },
  'view-containers': {
    icon: 'airplane',
    tint: colors.status.info,
    gradient: [colors.status.info, `${colors.status.info}80`] as const,
    sublabel: 'Maritime et aérien',
  },
  'support': {
    icon: 'chatbubble-ellipses',
    tint: colors.status.warning,
    gradient: [colors.status.warning, `${colors.status.warning}80`] as const,
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
        header: { fontSize: 16, fontWeight: '700', color: colors.text.primary, marginBottom: 12 },
        grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
        card: {
          width: CARD_SIZE,
          height: CARD_SIZE * 0.85,
          borderRadius: 20,
          padding: 16,
          justifyContent: 'space-between',
          overflow: 'hidden',
        },
        iconRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
        iconCircle: {
          width: 44,
          height: 44,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
        },
        arrow: {
          width: 28,
          height: 28,
          borderRadius: 10,
          backgroundColor: colors.neutral.white + '33',
          justifyContent: 'center',
          alignItems: 'center',
        },
        label: { fontSize: 14, fontWeight: '700', color: colors.text.inverse },
        sublabel: { fontSize: 12, fontWeight: '500', color: colors.text.inverse, marginTop: 2 },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Actions Rapides</Text>
      <View style={styles.grid}>
        {actions.map((action) => {
          const meta = actionMeta[action.id] || { icon: 'apps' as IoniconName, tint: colors.primary.main, gradient: [colors.text.secondary, `${colors.text.secondary}80`] as const, sublabel: 'Appuyez pour voir' };
          return (
            <Pressable
              key={action.id}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onActionPress(action);
              }}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: meta.tint },
                pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
              ]}
            >
              <View style={styles.iconRow}>
                <View style={[styles.iconCircle, { backgroundColor: colors.neutral.white + '33' }]}>
                  <Ionicons name={meta.icon} size={22} color={colors.text.inverse} />
                </View>
                <View style={styles.arrow}>
                  <Ionicons name="arrow-forward" size={14} color={colors.text.inverse} />
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
