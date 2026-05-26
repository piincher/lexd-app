import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme, type ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

interface ErrorStateProps {
  onBack: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onBack }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <View style={styles.errorIcon}>
          <Ionicons name="alert-circle-outline" size={42} color={colors.status.error} />
        </View>
        <Text style={styles.errorTitle}>Liste indisponible</Text>
        <Text style={styles.errorText}>
          Impossible de charger la liste de colisage pour ce container.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.85}
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors: AppColors, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing['2xl'],
  },
  errorIcon: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? colors.neutral[800] : colors.feedback.errorBg,
  },
  errorTitle: {
    marginTop: Theme.spacing.lg,
    fontSize: 20,
    fontWeight: '800',
    color: colors.text.primary,
  },
  errorText: {
    marginTop: Theme.spacing.sm,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  backButton: {
    marginTop: Theme.spacing.xl,
    minHeight: 48,
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    backgroundColor: colors.primary[600],
    borderRadius: Theme.radius.lg,
  },
  backButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '700',
  },
});
