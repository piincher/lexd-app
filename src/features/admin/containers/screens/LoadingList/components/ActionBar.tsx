import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface ActionBarProps {
  isGeneratingPDF: boolean;
  allLoaded: boolean;
  hasItems: boolean;
  onReset: () => void;
  onMarkAll: () => void;
  onPrint: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  isGeneratingPDF,
  allLoaded,
  hasItems,
  onReset,
  onMarkAll,
  onPrint,
}) => {
  const { colors } = useAppTheme();
  return (
    <Animated.View entering={FadeInUp.delay(300)} style={styles.actionBar}>
      <TouchableOpacity style={styles.actionButton} onPress={onReset} activeOpacity={0.9}>
        <LinearGradient
          colors={[Theme.colors.status.error + '20', Theme.colors.status.error + '10']}
          style={styles.actionGradientSecondary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="refresh" size={18} color={Theme.status.error} />
          <Text style={styles.actionButtonTextSecondary}>Réinitialiser</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onMarkAll}
        disabled={allLoaded}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[Theme.colors.status.success + '20', Theme.colors.status.success + '10']}
          style={[styles.actionGradientSecondary, allLoaded && styles.actionGradientDisabled]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="checkmark-done" size={18} color={Theme.status.success} />
          <Text style={styles.actionButtonTextSuccess}>Tout charger</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, styles.actionButtonPrimary]}
        onPress={onPrint}
        disabled={!hasItems || isGeneratingPDF}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[Theme.colors.status.warning, Theme.colors.status.error]}
          style={styles.actionGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {isGeneratingPDF ? (
            <ActivityIndicator size="small" color={Theme.colors.text.inverse} />
          ) : (
            <>
              <Ionicons name="print" size={20} color={Theme.colors.text.inverse} />
              <Text style={styles.actionButtonText}>PDF</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    backgroundColor: Theme.colors.background.card,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  actionButton: {
    flex: 1,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
  },
  actionButtonPrimary: {
    flex: 0.8,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  actionGradientSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.xs,
  },
  actionGradientDisabled: {
    opacity: 0.5,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.text.inverse,
  },
  actionButtonTextSecondary: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.status.error,
  },
  actionButtonTextSuccess: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.status.success,
  },
});
