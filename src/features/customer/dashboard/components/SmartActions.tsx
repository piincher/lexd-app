import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { QuickAction } from '../types';
import * as Haptics from 'expo-haptics';
import { Theme } from '@src/constants/Theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface Props {
  actions: QuickAction[];
  onActionPress: (action: QuickAction) => void;
}

const ACTION_META: Record<string, { icon: IoniconName; tint: string; gradient: readonly [string, string]; sublabel: string }> = {
  'view-goods': {
    icon: 'cube',
    tint: Theme.colors.primary.main,
    gradient: [Theme.colors.primary.main, Theme.colors.primary.light] as const,
    sublabel: 'Voir vos colis',
  },
  'view-containers': {
    icon: 'airplane',
    tint: Theme.colors.status.info,
    gradient: [Theme.colors.status.info, `${Theme.colors.status.info}80`] as const,
    sublabel: 'Maritime et aérien',
  },
  'support': {
    icon: 'chatbubble-ellipses',
    tint: Theme.colors.status.warning,
    gradient: [Theme.colors.status.warning, `${Theme.colors.status.warning}80`] as const,
    sublabel: 'Contactez-nous',
  },
};

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 2;

export const SmartActions: React.FC<Props> = ({ actions, onActionPress }) => {
  const { colors } = useAppTheme();
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
          backgroundColor: 'rgba(255,255,255,0.2)',
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
          const meta = ACTION_META[action.id] || { icon: 'apps' as IoniconName, tint: colors.primary.main, gradient: [colors.text.secondary, `${colors.text.secondary}80`] as const, sublabel: 'Appuyez pour voir' };
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
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
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
