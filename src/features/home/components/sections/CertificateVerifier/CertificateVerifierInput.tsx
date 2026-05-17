import React from 'react';
import { View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './CertificateVerifier.styles';
import type { VerifyState } from './useCertificateVerification';

interface CertificateVerifierInputProps {
  code: string;
  onChangeText: (text: string) => void;
  onVerify: () => void;
  onReset: () => void;
  state: VerifyState;
}

export const CertificateVerifierInput: React.FC<CertificateVerifierInputProps> = ({
  code,
  onChangeText,
  onVerify,
  onReset,
  state,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.inputRow}>
      <View
        style={[
          styles.inputWrapper,
          { backgroundColor: colors.background.paper, borderColor: colors.border },
          state.kind === 'error' && { borderColor: colors.status.error },
          state.kind === 'success' && { borderColor: colors.status.success },
        ]}
      >
        <FontAwesome6
          name="hashtag"
          size={14}
          color={colors.text.muted ?? Theme.colors.text.muted}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          placeholder="Ex: CLE-XXXX-XXXX"
          placeholderTextColor={colors.text.muted ?? Theme.colors.text.muted}
          value={code}
          onChangeText={onChangeText}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={onVerify}
          editable={state.kind !== 'loading'}
        />
        {code.length > 0 && state.kind !== 'loading' && (
          <Pressable onPress={onReset} hitSlop={8}>
            <FontAwesome6
              name="xmark"
              size={14}
              color={colors.text.muted ?? Theme.colors.text.muted}
            />
          </Pressable>
        )}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.verifyButton,
          (!code.trim() || state.kind === 'loading') && styles.verifyButtonDisabled,
          pressed && styles.pressed,
        ]}
        onPress={onVerify}
        disabled={!code.trim() || state.kind === 'loading'}
      >
        <LinearGradient
          colors={
            code.trim()
              ? [Theme.colors.status.success, Theme.colors.status.success]
              : [Theme.colors.text.muted, Theme.colors.text.muted]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.verifyButtonGradient}
        >
          {state.kind === 'loading' ? (
            <ActivityIndicator size="small" color={Theme.colors.background.card} />
          ) : (
            <FontAwesome6 name="magnifying-glass" size={16} color={Theme.colors.background.card} />
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
};
