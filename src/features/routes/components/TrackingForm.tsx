import React, { useState } from 'react';
import { View, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { useTrackingFormStyles } from './TrackingForm.styles';
import { TrackingInputRow } from './TrackingInputRow';

const CODE_PATTERN = /^[A-Z0-9-]{0,24}$/;

export interface TrackingFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error?: string | null;
}

export const TrackingForm: React.FC<TrackingFormProps> = ({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  error,
}) => {
  const { colors } = useAppTheme();
  const styles = useTrackingFormStyles();
  const [focused, setFocused] = useState(false);

  const normalize = (next: string) => {
    const upper = next.toUpperCase().replace(/\s+/g, '');
    return CODE_PATTERN.test(upper) ? upper : value;
  };

  const handleChange = (next: string) => {
    onChange(normalize(next));
  };

  const handlePaste = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        Haptics.selectionAsync();
        onChange(normalize(text));
      }
    } catch {}
  };

  const handleClear = () => {
    Haptics.selectionAsync();
    onChange('');
  };

  const handleSubmit = () => {
    if (isSubmitting || !value.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSubmit();
  };

  const borderColor = error
    ? colors.status.error
    : focused
    ? colors.primary.main
    : colors.border;

  return (
    <View>
      <Text style={styles.label} accessibilityRole="text">
        Numéro de suivi
      </Text>
      <TrackingInputRow
        value={value}
        onChange={handleChange}
        onClear={handleClear}
        onPaste={handlePaste}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        borderColor={borderColor}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default TrackingForm;
