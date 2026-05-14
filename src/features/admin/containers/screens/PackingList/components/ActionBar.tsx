import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface ActionBarProps {
  isGeneratingPDF: boolean;
  hasClients: boolean;
  onShare: () => void;
  onPrint: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  isGeneratingPDF,
  hasClients,
  onShare,
  onPrint,
}) => {
  const { colors } = useAppTheme();
  return (
    <Animated.View entering={FadeInUp.delay(400)} style={styles.actionBar}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onShare}
        disabled={!hasClients}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={Theme.gradients.ocean}
          style={styles.actionGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="share-social" size={20} color={Theme.colors.text.inverse} />
          <Text style={styles.actionButtonText}>Partager</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, styles.actionButtonPrimary]}
        onPress={onPrint}
        disabled={!hasClients || isGeneratingPDF}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={Theme.gradients.primary}
          style={styles.actionGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {isGeneratingPDF ? (
            <ActivityIndicator size="small" color={Theme.colors.text.inverse} />
          ) : (
            <>
              <Ionicons name="print" size={20} color={Theme.colors.text.inverse} />
              <Text style={styles.actionButtonText}>PDF / Imprimer</Text>
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
    gap: Theme.spacing.md,
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
    flex: 1.2,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.text.inverse,
  },
});
