/**
 * CertificateVerifier
 * Public certificate verification with refined input UX
 * and beautiful result cards.
 */

import React, { useState, useCallback } from 'react';
import { View, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAuth } from '@src/store/Auth';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { verifyCertificatePublic, type VerifiedCertificate } from '@src/shared/api/certificates';
import { SectionHeader } from '../SectionHeader';
import { CertificateSuccessResult, CertificateErrorResult } from './CertificateResult';
import { LoginPromptCard } from './LoginPromptCard';

type VerifyState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; data: VerifiedCertificate }
  | { kind: 'error'; message: string };

/* ── Main Component ── */
export const CertificateVerifier: React.FC = () => {
  const { colors } = useAppTheme();
  const token = useAuth((state) => state.token);

  const [code, setCode] = useState('');
  const [state, setState] = useState<VerifyState>({ kind: 'idle' });

  const handleVerify = useCallback(async () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    setState({ kind: 'loading' });
    try {
      const response = await verifyCertificatePublic(trimmed);
      if (response.success && response.data) {
        setState({ kind: 'success', data: response.data });
      } else {
        setState({ kind: 'error', message: response.message || 'Certificat introuvable' });
      }
    } catch {
      setState({ kind: 'error', message: 'Certificat introuvable ou code invalide' });
    }
  }, [code]);

  const handleReset = useCallback(() => {
    setCode('');
    setState({ kind: 'idle' });
  }, []);

  return (
    <View style={styles.container}>
      {!token && <LoginPromptCard />}

      <SectionHeader
        title="Verifier un Certificat"
        subtitle="Entrez le code de verification pour confirmer l'authenticite"
      />

      <Animated.View entering={FadeInDown.delay(200).duration(500).springify()} style={[styles.verifyCard, { backgroundColor: colors.background.card }]}>
        <View style={styles.verifyHeader}>
          <View style={[styles.shieldCircle, { backgroundColor: `${colors.primary.main}14` }]}>
            <FontAwesome6 name="shield-halved" size={20} color={colors.primary.main} />
          </View>
          <View style={styles.verifyHeaderText}>
            <Text style={[styles.verifyTitle, { color: colors.text.primary }]}>Authentification</Text>
            <Text style={[styles.verifyHint, { color: colors.text.secondary }]}>Code inscrit sur le certificat</Text>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View
            style={[
              styles.inputWrapper,
              { backgroundColor: colors.background.paper, borderColor: colors.border },
              state.kind === 'error' && styles.inputError,
              state.kind === 'success' && styles.inputSuccess,
            ]}
          >
            <FontAwesome6 name="hashtag" size={14} color={colors.text.muted ?? Theme.colors.text.muted} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text.primary }]}
              placeholder="Ex: CLE-XXXX-XXXX"
              placeholderTextColor={colors.text.muted ?? Theme.colors.text.muted}
              value={code}
              onChangeText={(text) => {
                setCode(text.toUpperCase());
                if (state.kind !== 'idle' && state.kind !== 'loading') setState({ kind: 'idle' });
              }}
              autoCapitalize="characters"
              autoCorrect={false}
              returnKeyType="search"
              onSubmitEditing={handleVerify}
              editable={state.kind !== 'loading'}
            />
            {code.length > 0 && state.kind !== 'loading' && (
              <Pressable onPress={handleReset} hitSlop={8}>
                <FontAwesome6 name="xmark" size={14} color={colors.text.muted ?? Theme.colors.text.muted} />
              </Pressable>
            )}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.verifyButton,
              (!code.trim() || state.kind === 'loading') && styles.verifyButtonDisabled,
              pressed && styles.pressed,
            ]}
            onPress={handleVerify}
            disabled={!code.trim() || state.kind === 'loading'}
          >
            <LinearGradient
              colors={code.trim() ? [Theme.colors.status.success, Theme.colors.status.success] : [Theme.colors.text.muted, Theme.colors.text.muted]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.verifyButtonGradient}
            >
              {state.kind === 'loading' ? <ActivityIndicator size="small" color={Theme.colors.background.card} /> : <FontAwesome6 name="magnifying-glass" size={16} color={Theme.colors.background.card} />}
            </LinearGradient>
          </Pressable>
        </View>

        {state.kind === 'success' && <CertificateSuccessResult data={state.data} />}
        {state.kind === 'error' && <CertificateErrorResult message={state.message} />}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
  verifyCard: {
    borderRadius: 20,
    padding: 18,
    ...Theme.shadows.md,
  },
  verifyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  shieldCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyHeaderText: {
    flex: 1,
  },
  verifyTitle: {
    fontFamily: Fonts.bold,
    fontSize: 15,
  },
  verifyHint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginTop: 1,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.meduim,
    fontSize: 14,
    letterSpacing: 1,
    paddingVertical: 0,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputSuccess: {
    borderColor: '#22C55E',
  },
  verifyButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  verifyButtonDisabled: {
    opacity: 0.6,
  },
  verifyButtonGradient: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },

});
