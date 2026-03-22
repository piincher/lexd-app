/**
 * CertificateVerifier
 * Public certificate verification input + login prompt for unauthenticated users
 */

import React, { useState, useCallback } from 'react';
import { View, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers';
import { useAuth } from '@src/store/Auth';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import {
  verifyCertificatePublic,
  type VerifiedCertificate,
} from '@src/features/profile/api/certificateApi';

type VerifyState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; data: VerifiedCertificate }
  | { kind: 'error'; message: string };

export const CertificateVerifier: React.FC = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();
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

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  return (
    <View style={styles.container}>
      {/* ── Login Prompt (unauthenticated only) ── */}
      {!token && (
        <Animated.View
          entering={FadeInDown.delay(400).duration(500).springify()}
          style={[styles.loginCard, { backgroundColor: colors.background.card }]}
        >
          <LinearGradient
            colors={['#22C55E', '#15803D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.loginIconCircle}
          >
            <FontAwesome6 name="user-lock" size={18} color="#FFF" />
          </LinearGradient>

          <View style={styles.loginTextBlock}>
            <Text style={[styles.loginTitle, { color: colors.text.primary }]}>
              Connectez-vous
            </Text>
            <Text style={[styles.loginSubtitle, { color: colors.text.secondary }]}>
              Accedez a vos envois, suivi et tableau de bord
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.loginButton, pressed && styles.pressed]}
            onPress={() => navigation.navigate('Login')}
          >
            <LinearGradient
              colors={['#22C55E', '#16A34A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButtonGradient}
            >
              <Text style={styles.loginButtonText}>Se connecter</Text>
              <FontAwesome6 name="arrow-right" size={12} color="#FFF" />
            </LinearGradient>
          </Pressable>
        </Animated.View>
      )}

      {/* ── Certificate Verification ── */}
      <Animated.View entering={FadeInDown.delay(500).duration(500).springify()}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Verifier un Certificat
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
          Entrez le code de verification pour confirmer l'authenticite
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(600).duration(500).springify()}
        style={[styles.verifyCard, { backgroundColor: colors.background.card }]}
      >
        {/* Shield icon header */}
        <View style={styles.verifyHeader}>
          <View style={[styles.shieldCircle, { backgroundColor: `${colors.primary?.main ?? '#22C55E'}14` }]}>
            <FontAwesome6 name="shield-halved" size={20} color={colors.primary?.main ?? '#22C55E'} />
          </View>
          <View style={styles.verifyHeaderText}>
            <Text style={[styles.verifyTitle, { color: colors.text.primary }]}>
              Authentification
            </Text>
            <Text style={[styles.verifyHint, { color: colors.text.secondary }]}>
              Code inscrit sur le certificat
            </Text>
          </View>
        </View>

        {/* Input row */}
        <View style={styles.inputRow}>
          <View
            style={[
              styles.inputWrapper,
              { backgroundColor: colors.background.paper, borderColor: colors.border ?? '#E5E7EB' },
              state.kind === 'error' && styles.inputError,
              state.kind === 'success' && styles.inputSuccess,
            ]}
          >
            <FontAwesome6
              name="hashtag"
              size={14}
              color={colors.text.muted ?? '#9CA3AF'}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: colors.text.primary }]}
              placeholder="Ex: CLE-XXXX-XXXX"
              placeholderTextColor={colors.text.muted ?? '#9CA3AF'}
              value={code}
              onChangeText={(text) => {
                setCode(text.toUpperCase());
                if (state.kind !== 'idle' && state.kind !== 'loading') {
                  setState({ kind: 'idle' });
                }
              }}
              autoCapitalize="characters"
              autoCorrect={false}
              returnKeyType="search"
              onSubmitEditing={handleVerify}
              editable={state.kind !== 'loading'}
            />
            {code.length > 0 && state.kind !== 'loading' && (
              <Pressable onPress={handleReset} hitSlop={8}>
                <FontAwesome6 name="xmark" size={14} color={colors.text.muted ?? '#9CA3AF'} />
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
              colors={code.trim() ? ['#22C55E', '#16A34A'] : ['#9CA3AF', '#9CA3AF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.verifyButtonGradient}
            >
              {state.kind === 'loading' ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <FontAwesome6 name="magnifying-glass" size={16} color="#FFF" />
              )}
            </LinearGradient>
          </Pressable>
        </View>

        {/* ── Result: Success ── */}
        {state.kind === 'success' && (
          <Animated.View entering={FadeIn.duration(300)} style={styles.resultContainer}>
            <LinearGradient
              colors={
                state.data.status === 'ACTIVE'
                  ? ['rgba(34,197,94,0.08)', 'rgba(34,197,94,0.02)']
                  : ['rgba(239,68,68,0.08)', 'rgba(239,68,68,0.02)']
              }
              style={styles.resultCard}
            >
              <View style={styles.resultHeader}>
                <View
                  style={[
                    styles.resultIconCircle,
                    {
                      backgroundColor:
                        state.data.status === 'ACTIVE'
                          ? 'rgba(34,197,94,0.15)'
                          : 'rgba(239,68,68,0.15)',
                    },
                  ]}
                >
                  <FontAwesome6
                    name={state.data.status === 'ACTIVE' ? 'circle-check' : 'circle-xmark'}
                    size={22}
                    color={state.data.status === 'ACTIVE' ? '#22C55E' : '#EF4444'}
                  />
                </View>
                <View style={styles.resultHeaderText}>
                  <Text
                    style={[
                      styles.resultStatus,
                      { color: state.data.status === 'ACTIVE' ? '#15803D' : '#DC2626' },
                    ]}
                  >
                    {state.data.status === 'ACTIVE' ? 'Certificat Valide' : 'Certificat Revoque'}
                  </Text>
                  <Text style={[styles.resultId, { color: colors.text.secondary }]}>
                    {state.data.certificateId}
                  </Text>
                </View>
              </View>

              <View style={[styles.resultDivider, { backgroundColor: colors.border ?? '#E5E7EB' }]} />

              <View style={styles.resultDetails}>
                <View style={styles.resultRow}>
                  <FontAwesome6 name="user" size={12} color={colors.text.secondary} />
                  <Text style={[styles.resultLabel, { color: colors.text.secondary }]}>
                    Titulaire
                  </Text>
                  <Text style={[styles.resultValue, { color: colors.text.primary }]}>
                    {state.data.holderName}
                  </Text>
                </View>
                <View style={styles.resultRow}>
                  <FontAwesome6 name="calendar" size={12} color={colors.text.secondary} />
                  <Text style={[styles.resultLabel, { color: colors.text.secondary }]}>
                    Delivre le
                  </Text>
                  <Text style={[styles.resultValue, { color: colors.text.primary }]}>
                    {formatDate(state.data.issuedAt)}
                  </Text>
                </View>
                <View style={styles.resultRow}>
                  <FontAwesome6 name="certificate" size={12} color={colors.text.secondary} />
                  <Text style={[styles.resultLabel, { color: colors.text.secondary }]}>
                    Type
                  </Text>
                  <Text style={[styles.resultValue, { color: colors.text.primary }]}>
                    {state.data.type === 'AUTO' ? 'Automatique' : 'Manuel'}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {/* ── Result: Error ── */}
        {state.kind === 'error' && (
          <Animated.View entering={FadeIn.duration(300)} style={styles.resultContainer}>
            <View style={styles.errorBanner}>
              <FontAwesome6 name="triangle-exclamation" size={14} color="#DC2626" />
              <Text style={styles.errorText}>{state.message}</Text>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },

  /* ── Login Prompt ── */
  loginCard: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 28,
    ...Theme.shadows.md,
  },
  loginIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  loginTextBlock: {
    alignItems: 'center',
    marginBottom: 16,
  },
  loginTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    marginBottom: 4,
  },
  loginSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  loginButton: {
    borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
  },
  loginButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  loginButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: '#FFF',
    letterSpacing: 0.3,
  },

  /* ── Section Header ── */
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    marginBottom: 16,
  },

  /* ── Verify Card ── */
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

  /* ── Input Row ── */
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
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },

  /* ── Result: Success ── */
  resultContainer: {
    marginTop: 16,
  },
  resultCard: {
    borderRadius: 16,
    padding: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultHeaderText: {
    flex: 1,
  },
  resultStatus: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  resultId: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  resultDivider: {
    height: 1,
    marginVertical: 14,
  },
  resultDetails: {
    gap: 10,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    width: 70,
  },
  resultValue: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    flex: 1,
  },

  /* ── Result: Error ── */
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  errorText: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: '#DC2626',
    flex: 1,
  },
});
