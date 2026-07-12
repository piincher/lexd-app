import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme, type ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

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
  const styles = createStyles(colors);
  const disabledGradient = [colors.neutral[300], colors.neutral[400]] as const;
  const shareDisabled = !hasClients;
  const printDisabled = !hasClients || isGeneratingPDF;

  return (
    <View style={styles.actionBar}>
      <TouchableOpacity
        style={[styles.actionButton, shareDisabled && styles.actionButtonDisabled]}
        onPress={onShare}
        disabled={shareDisabled}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel="Partager la vue actuelle de la liste de colisage"
        accessibilityState={{ disabled: shareDisabled }}
      >
        <LinearGradient
          colors={shareDisabled ? disabledGradient : Theme.gradients.ocean}
          style={styles.actionGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="share-social" size={20} color={Theme.colors.text.inverse} />
          <View style={styles.actionTextBlock}>
            <Text style={styles.actionButtonText}>Partager</Text>
            <Text style={styles.actionButtonMeta}>Vue actuelle</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.actionButton,
          styles.actionButtonPrimary,
          printDisabled && styles.actionButtonDisabled,
        ]}
        onPress={onPrint}
        disabled={printDisabled}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel="Générer et imprimer le PDF de la liste de colisage"
        accessibilityState={{ disabled: printDisabled, busy: isGeneratingPDF }}
      >
        <LinearGradient
          colors={printDisabled && !isGeneratingPDF ? disabledGradient : Theme.gradients.primary}
          style={styles.actionGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {isGeneratingPDF ? (
            <>
              <ActivityIndicator size="small" color={Theme.colors.text.inverse} />
              <Text style={styles.actionButtonText}>Préparation...</Text>
            </>
          ) : (
            <>
              <Ionicons name="print" size={20} color={Theme.colors.text.inverse} />
              <View style={styles.actionTextBlock}>
                <Text style={styles.actionButtonText}>Générer PDF</Text>
                <Text style={styles.actionButtonMeta}>Imprimer</Text>
              </View>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    gap: Theme.spacing.md,
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  actionButton: {
    flex: 1,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
  },
  actionButtonDisabled: {
    opacity: 0.72,
  },
  actionButtonPrimary: {
    flex: 1.2,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.sm,
    gap: Theme.spacing.sm,
  },
  actionTextBlock: {
    alignItems: 'flex-start',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.text.inverse,
  },
  actionButtonMeta: {
    marginTop: 1,
    fontSize: 11,
    fontWeight: '600',
    color: Theme.colors.text.inverse,
    opacity: 0.88,
  },
});
