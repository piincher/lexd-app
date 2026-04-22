import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

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
  const { colors, isDark } = useAppTheme();
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

  const styles = useMemo(
    () =>
      StyleSheet.create({
        label: {
          fontSize: 13,
          fontFamily: Fonts.meduim,
          color: colors.text.secondary,
          marginBottom: 6,
          marginLeft: 4,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 12,
          borderWidth: 1,
          backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
          paddingHorizontal: 12,
          minHeight: 52,
        },
        input: {
          flex: 1,
          fontSize: 16,
          fontFamily: Fonts.meduim,
          color: colors.text.primary,
          paddingVertical: 12,
          letterSpacing: 1,
        },
        iconButton: {
          width: 36,
          height: 36,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        },
        submitButton: {
          marginLeft: 8,
          width: 40,
          height: 40,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primary.main,
        },
        submitButtonDisabled: {
          opacity: 0.5,
        },
        errorText: {
          color: colors.status.error,
          fontSize: 12,
          fontFamily: Fonts.regular,
          marginTop: 6,
          marginLeft: 4,
        },
      }),
    [colors, isDark]
  );

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
      <View style={[styles.row, { borderColor }]}>
        <MaterialCommunityIcons
          name="barcode-scan"
          size={20}
          color={colors.text.secondary}
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          placeholder="CLEXXXXXXXX"
          placeholderTextColor={colors.text.disabled}
          autoCapitalize="characters"
          autoCorrect={false}
          autoComplete="off"
          returnKeyType="search"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={handleSubmit}
          maxLength={24}
          accessibilityLabel="Numéro de suivi du colis"
          editable={!isSubmitting}
        />
        {value.length > 0 ? (
          <Pressable
            onPress={handleClear}
            style={styles.iconButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Effacer"
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={18}
              color={colors.text.disabled}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={handlePaste}
            style={styles.iconButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Coller depuis le presse-papiers"
          >
            <MaterialCommunityIcons
              name="content-paste"
              size={18}
              color={colors.primary.main}
            />
          </Pressable>
        )}
        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting || !value.trim()}
          style={[
            styles.submitButton,
            (isSubmitting || !value.trim()) && styles.submitButtonDisabled,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Rechercher"
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color={colors.text.inverse} />
          ) : (
            <MaterialCommunityIcons
              name="magnify"
              size={22}
              color={colors.text.inverse}
            />
          )}
        </Pressable>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default TrackingForm;
