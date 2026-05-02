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

const ACTION_META: Record<string, { icon: IoniconName; tint: string; gradient: readonly [string, string]; sublabel: string }> = {
  'view-goods': {
    icon: 'cube',
    tint: '#8B5CF6',
    gradient: ['#8B5CF6', '#A78BFA'] as const,
    sublabel: 'Voir vos colis',
  },
  'view-containers': {
    icon: 'airplane',
    tint: '#0EA5E9',
    gradient: ['#0EA5E9', '#38BDF8'] as const,
    sublabel: 'Maritime et aérien',
  },
  'support': {
    icon: 'chatbubble-ellipses',
    tint: '#F59E0B',
    gradient: ['#F59E0B', '#FBBF24'] as const,
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
        label: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
        sublabel: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)', marginTop: 2 },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Actions Rapides</Text>
      <View style={styles.grid}>
        {actions.map((action) => {
          const meta = ACTION_META[action.id] || { icon: 'apps' as IoniconName, tint: colors.primary.main, gradient: ['#64748B', '#94A3B8'] as const, sublabel: 'Appuyez pour voir' };
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
                  <Ionicons name={meta.icon} size={22} color="#FFFFFF" />
                </View>
                <View style={styles.arrow}>
                  <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
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
