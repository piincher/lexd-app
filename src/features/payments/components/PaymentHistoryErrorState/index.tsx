import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS } from '@src/shared/ui/designLanguage';

interface PaymentHistoryErrorStateProps {
  error?: Error | null;
  onRetry: () => void;
}

export const PaymentHistoryErrorState: React.FC<PaymentHistoryErrorStateProps> = ({
  error,
  onRetry,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons
        name="alert-circle"
        size={48}
        color={colors.status.error}
      />
      <Text style={[styles.errorTitle, { color: colors.status.error }]}>
        Failed to Load
      </Text>
      <Text style={[styles.errorText, { color: colors.text.secondary }]}>
        {error?.message || 'Something went wrong. Please try again.'}
      </Text>
      <TouchableOpacity
        style={[styles.retryButton, { backgroundColor: colors.primary.main }]}
        onPress={onRetry}
      >
        <Text style={[styles.retryButtonText, { color: colors.text.inverse }]}>
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    borderRadius: RADIUS.control,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
});
