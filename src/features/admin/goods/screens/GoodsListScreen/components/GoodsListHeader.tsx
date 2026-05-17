/**
 * GoodsListHeader - Header section with stats
 * SRP: Display header with greeting, title, and statistics
 */

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@src/constants/Theme';
import { GoodsListStatCard } from './GoodsListStatCard';
import { GoodsListHeaderActions } from './GoodsListHeaderActions';
import { styles } from './GoodsListHeader.styles';

interface GoodsListHeaderProps {
  total: number;
  pendingCount: number;
  onExportPress?: () => void;
  isSelectionMode?: boolean;
  onToggleSelectionMode?: () => void;
}

export const GoodsListHeader: React.FC<GoodsListHeaderProps> = ({
  total,
  pendingCount,
  onExportPress,
  isSelectionMode,
  onToggleSelectionMode,
}) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();

  return (
    <LinearGradient colors={Theme.gradients.glass} style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={[styles.greeting, { color: colors.text.secondary }]}>
            Bonjour! 👋
          </Text>
          <Text style={[styles.title, { color: colors.text.primary }]}>
            Marchandises
          </Text>
        </View>
        <GoodsListHeaderActions
          onToggleSelectionMode={onToggleSelectionMode}
          onExportPress={onExportPress}
          isSelectionMode={isSelectionMode}
          primaryColor={colors.primary.main}
          errorColor={colors.status.error}
          cardBgColor={colors.background.card}
        />
      </View>

      <View style={styles.statsRow}>
        <GoodsListStatCard
          value={total}
          label="Total"
          icon="cube"
          gradient={Theme.gradients.primary}
          textPrimaryColor={colors.text.primary}
          textSecondaryColor={colors.text.secondary}
          iconColor={colors.text.inverse}
          cardBgColor={colors.background.card}
        />
        <GoodsListStatCard
          value={pendingCount}
          label="En attente"
          icon="time"
          gradient={Theme.gradients.ocean}
          textPrimaryColor={colors.text.primary}
          textSecondaryColor={colors.text.secondary}
          iconColor={colors.text.inverse}
          cardBgColor={colors.background.card}
        />
      </View>
      <NotificationBell
        onPress={() => navigation.navigate('Notifications' as never)}
        size={24}
        color={colors.text.primary}
      />
    </LinearGradient>
  );
};

export default GoodsListHeader;
