import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SubmitButtonProps {
  isEditMode: boolean;
  isSubmitting: boolean;
  onPress: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isEditMode,
  isSubmitting,
  onPress,
}) => {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity
      style={styles.submitButtonContainer}
      onPress={onPress}
      disabled={isSubmitting}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={Theme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.submitButton}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color={colors.text.inverse} />
        ) : (
          <>
            <Ionicons 
              name={isEditMode ? 'save' : 'add-circle'} 
              size={22} 
              color={colors.text.inverse} 
            />
            <Text style={[styles.submitButtonText, { color: colors.text.inverse }]}>
              {isEditMode ? 'Enregistrer les modifications' : 'Créer la Route'}
            </Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButtonContainer: {
    marginTop: 24,
    borderRadius: 999,
    overflow: 'hidden',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
