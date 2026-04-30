import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useWavePaymentFormStyles } from './useWavePaymentFormStyles';
import { DEFAULT_COUNTRY_CODE } from './waveConstants';

interface ManualEntrySectionProps {
  phoneNumber?: string;
  disabled?: boolean;
}

export const ManualEntrySection: React.FC<ManualEntrySectionProps> = ({
  phoneNumber,
  disabled,
}) => {
  const { colors } = useAppTheme();
  const styles = useWavePaymentFormStyles();

  return (
    <View style={styles.manualEntry}>
      <Text style={styles.manualEntryTitle}>Pay to Phone Number</Text>
      <Text style={styles.manualEntryDescription}>
        Enter your Wave-registered phone number below
      </Text>

      <View style={styles.phoneInputContainer}>
        <View style={styles.countryCodeBadge}>
          <Text style={styles.countryCodeText}>{DEFAULT_COUNTRY_CODE}</Text>
        </View>

        <TouchableOpacity
          style={[styles.phoneButton, disabled && styles.phoneButtonDisabled]}
          onPress={() => {/* Open phone input modal */}}
          disabled={disabled}
        >
          <Text style={styles.phoneButtonText}>
            {phoneNumber || 'Enter phone number'}
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
