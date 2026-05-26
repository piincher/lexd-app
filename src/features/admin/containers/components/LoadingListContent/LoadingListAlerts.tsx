import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, type ThemeContextType } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { LoadingListItem } from '../../types/packingList';

interface LoadingListAlertsProps {
  remainingItems: number;
  missingInfoCount: number;
  nextPendingItem?: LoadingListItem;
}

export const LoadingListAlerts: React.FC<LoadingListAlertsProps> = ({
  remainingItems,
  missingInfoCount,
  nextPendingItem,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  if (remainingItems === 0 && missingInfoCount === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {remainingItems > 0 && (
        <View style={[styles.alert, styles.pendingAlert]}>
          <View style={styles.alertIcon}>
            <Ionicons name="alert-circle-outline" size={20} color={colors.status.warning} />
          </View>
          <View style={styles.alertBody}>
            <Text style={styles.alertTitle}>{remainingItems} article(s) à charger</Text>
            {nextPendingItem && (
              <Text style={styles.alertText} numberOfLines={2}>
                Prochain: #{nextPendingItem.sequenceNumber} {nextPendingItem.goods.goodsId || 'Sans ID'} · {nextPendingItem.clientName}
              </Text>
            )}
          </View>
        </View>
      )}

      {missingInfoCount > 0 && (
        <View style={[styles.alert, styles.missingAlert]}>
          <View style={styles.alertIcon}>
            <Ionicons name="information-circle-outline" size={20} color={colors.status.error} />
          </View>
          <View style={styles.alertBody}>
            <Text style={styles.alertTitle}>{missingInfoCount} article(s) à vérifier</Text>
            <Text style={styles.alertText}>
              Poids, volume ou identifiant manquant avant le chargement.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const createStyles = (colors: ThemeContextType['colors'], isDark?: boolean) => StyleSheet.create({
  container: {
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  alert: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    borderWidth: 1,
    backgroundColor: colors.background.card,
  },
  pendingAlert: {
    borderColor: colors.status.warning + '55',
    backgroundColor: isDark ? colors.background.elevated : colors.feedback.warningBg,
  },
  missingAlert: {
    borderColor: colors.status.error + '55',
    backgroundColor: isDark ? colors.background.elevated : colors.feedback.errorBg,
  },
  alertIcon: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBody: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text.primary,
  },
  alertText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    lineHeight: 17,
  },
});
