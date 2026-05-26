/**
 * CertificateResult
 * Success and error result displays for certificate verification
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import type { VerifiedCertificate } from '@src/shared/api/certificates';

/* ── Success Result ── */
export const CertificateSuccessResult: React.FC<{ data: VerifiedCertificate }> = ({ data }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const isActive = data.status === 'ACTIVE';
  const accentColor = isActive ? colors.status.success : colors.status.error;
  const bgGradient = isActive
    ? ([`${colors.status.success}14`, `${colors.status.success}05`] as [string, string])
    : ([`${colors.status.error}14`, `${colors.status.error}05`] as [string, string]);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return iso;
    }
  };

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <LinearGradient colors={bgGradient} style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: `${accentColor}18` }]}>
            <FontAwesome6 name={isActive ? 'circle-check' : 'circle-xmark'} size={22} color={accentColor} />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.status, { color: isActive ? colors.feedback.successDark : colors.feedback.errorDark }]}>
              {isActive ? 'Certificat Valide' : 'Certificat Revoque'}
            </Text>
            <Text style={[styles.id, { color: colors.text.secondary }]}>{data.certificateId}</Text>
          </View>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.details}>
          <ResultRow icon="user" label="Titulaire" value={data.holderName} />
          <ResultRow icon="calendar" label="Delivre le" value={formatDate(data.issuedAt)} />
          <ResultRow icon="certificate" label="Type" value={data.type === 'AUTO' ? 'Automatique' : 'Manuel'} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

/* ── Error Result ── */
export const CertificateErrorResult: React.FC<{ message: string }> = ({ message }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <View style={styles.errorBanner}>
        <FontAwesome6 name="triangle-exclamation" size={14} color={colors.status.error} />
        <Text style={styles.errorText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

/* ── Result Row ── */
const ResultRow: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.row}>
      <FontAwesome6 name={icon as any} size={12} color={colors.text.secondary} />
      <Text style={[styles.rowLabel, { color: colors.text.secondary }]}>{label}</Text>
      <Text style={[styles.rowValue, { color: colors.text.primary }]}>{value}</Text>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginTop: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  status: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  id: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  details: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    width: 70,
  },
  rowValue: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    flex: 1,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: `${colors.status.error}14`,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  errorText: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: colors.status.error,
    flex: 1,
  },
});
