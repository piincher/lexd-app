import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ShippingMarksOverview.styles';

interface ShippingMarksOverviewProps {
  total: number;
  visibleCount: number;
  readyCount: number;
  page: number;
  pages: number;
  unavailable?: boolean;
  onOpenSettings: () => void;
}

export const ShippingMarksOverview: React.FC<ShippingMarksOverviewProps> = ({
  total,
  visibleCount,
  readyCount,
  page,
  pages,
  unavailable = false,
  onOpenSettings,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <Ionicons name="qr-code-outline" size={24} color={colors.primary.main} />
        </View>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>CENTRE D&apos;EXPÉDITION</Text>
          <Text style={styles.title} selectable>{unavailable ? 'Service indisponible' : `${total} clients`}</Text>
        </View>
        <Pressable
          onPress={onOpenSettings}
          style={({ pressed }) => [styles.settingsButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Ouvrir les paramètres des marques"
          android_ripple={{ color: colors.action.selected, borderless: false }}
        >
          <Ionicons name="settings-outline" size={22} color={colors.text.primary} />
        </Pressable>
      </View>

      <Text style={styles.description}>
        Retrouvez un client, générez sa marque à la demande et partagez-la directement avec son fournisseur.
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue} selectable>{unavailable ? '—' : `${readyCount}/${visibleCount}`}</Text>
          <Text style={styles.statLabel}>prêtes sur cette page</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue} selectable>{unavailable ? '—' : `${page}/${Math.max(pages, 1)}`}</Text>
          <Text style={styles.statLabel}>page actuelle</Text>
        </View>
      </View>
    </View>
  );
};
