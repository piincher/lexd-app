import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoLockedFeature } from '../types';

interface Props {
  features: DemoLockedFeature[];
}

export const DemoLockedFeatures: React.FC<Props> = ({ features }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>Accès client réel</Text>
          <Text style={styles.title}>Modules protégés</Text>
          <Text style={styles.subtitle}>
            La démo montre le fonctionnement sans exposer les données clients, paiements ou notifications privées.
          </Text>
        </View>
        <View style={styles.lockBadge}>
          <FontAwesome5 name="shield-alt" size={16} color={colors.accent.gold} />
        </View>
      </View>

      {features.map((feature) => (
        <View key={feature.id} style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <FontAwesome5 name={feature.icon} size={15} color={colors.primary.main} />
          </View>
          <View style={styles.featureCopy}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDetail}>{feature.detail}</Text>
            <Text style={styles.featureReason}>{feature.reason}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 22,
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
    },
    headerRow: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    headerCopy: {
      flex: 1,
    },
    eyebrow: {
      color: colors.text.secondary,
      fontFamily: Fonts.bold,
      fontSize: 11,
      textTransform: 'uppercase',
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
      marginTop: 4,
    },
    subtitle: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 5,
    },
    lockBadge: {
      width: 38,
      height: 38,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(251,191,36,0.12)' : '#FFFBEB',
    },
    featureCard: {
      flexDirection: 'row',
      gap: 12,
      paddingVertical: 13,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : '#EEF2F7',
    },
    featureIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(74,222,128,0.12)' : '#F0FDF4',
    },
    featureCopy: {
      flex: 1,
    },
    featureTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
    featureDetail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 4,
    },
    featureReason: {
      color: colors.primary.main,
      fontFamily: Fonts.bold,
      fontSize: 11,
      marginTop: 6,
    },
  });
