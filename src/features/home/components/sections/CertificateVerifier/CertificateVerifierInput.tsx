import React from 'react';
import { View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './CertificateVerifier.styles';
import type { VerifyState } from './useCertificateVerification';

interface CertificateVerifierInputProps {
  code: string;
  onChangeText: (text: string) => void;
  onVerify: () => void;
  onReset: () => void;
  state: VerifyState;
  onInputFocus?: () => void;
}

export const CertificateVerifierInput: React.FC<CertificateVerifierInputProps> = ({
  code,
  onChangeText,
  onVerify,
  onReset,
  state,
  onInputFocus,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const buttonInk = colors.background.default;

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
          color={colors.text.muted ?? colors.text.muted}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          placeholder="Ex: CLE-XXXX-XXXX"
          placeholderTextColor={colors.text.muted ?? colors.text.muted}
          value={code}
          onChangeText={onChangeText}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={onVerify}
          editable={state.kind !== 'loading'}
          onFocus={onInputFocus}
        />
        {code.length > 0 && state.kind !== 'loading' && (
          <Pressable onPress={onReset} hitSlop={8}>
            <FontAwesome6
              name="xmark"
              size={14}
              color={colors.text.muted ?? colors.text.muted}
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
              ? [colors.status.success, colors.status.success]
              : [colors.text.muted, colors.text.muted]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.verifyButtonGradient}
        >
          {state.kind === 'loading' ? (
            <ActivityIndicator size="small" color={buttonInk} />
          ) : (
            <FontAwesome6 name="magnifying-glass" size={16} color={buttonInk} />
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
};
