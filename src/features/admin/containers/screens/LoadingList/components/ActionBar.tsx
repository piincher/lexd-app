import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
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
  return (
    <Animated.View entering={FadeInUp.delay(300)} style={styles.actionBar}>
      <TouchableOpacity style={styles.actionButton} onPress={onReset} activeOpacity={0.9}>
        <LinearGradient
          colors={['#FEE2E2', '#FECACA']}
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
          colors={['#D1FAE5', '#A7F3D0']}
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
          colors={['#D97706', '#B45309']}
          style={styles.actionGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {isGeneratingPDF ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>
              <Ionicons name="print" size={20} color="#FFF" />
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
    backgroundColor: Theme.neutral.white,
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
    color: '#FFF',
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
