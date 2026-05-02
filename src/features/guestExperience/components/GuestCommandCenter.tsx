import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoMetric } from '../types';

interface Props {
  metrics: DemoMetric[];
}

const getToneColor = (colors: ReturnType<typeof useAppTheme>['colors'], tone: DemoMetric['tone']) => {
  if (tone === 'success') return colors.status.success;
  if (tone === 'warning') return colors.status.warning;
  if (tone === 'info') return colors.status.info;
  return colors.text.secondary;
};

export const GuestCommandCenter: React.FC<Props> = ({ metrics }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Tableau de bord client</Text>
          <Text style={styles.title}>Aperçu opérationnel</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Démo</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {metrics.map((metric) => {
          const toneColor = getToneColor(colors, metric.tone);
          return (
            <View key={metric.id} style={styles.metricCard}>
              <View style={[styles.metricIcon, { backgroundColor: `${toneColor}1A` }]}>
                <FontAwesome5 name={metric.icon} size={14} color={toneColor} />
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text style={styles.metricDetail}>{metric.detail}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 14,
      borderRadius: 18,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
    },
    eyebrow: {
      color: colors.text.secondary,
      fontFamily: Fonts.bold,
      fontSize: 12,
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 22,
      marginTop: 4,
    },
    liveBadge: {
      minHeight: 34,
      borderRadius: 999,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingHorizontal: 11,
      backgroundColor: isDark ? 'rgba(74,222,128,0.12)' : '#F0FDF4',
    },
    liveDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.primary.main,
    },
    liveText: {
      color: colors.primary.main,
      fontFamily: Fonts.bold,
      fontSize: 11,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 16,
    },
    metricCard: {
      width: '48%',
      minHeight: 132,
      borderRadius: 14,
      padding: 12,
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F9FAFB',
    },
    metricIcon: {
      width: 34,
      height: 34,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    metricValue: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 22,
      marginTop: 10,
    },
    metricLabel: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 12,
      marginTop: 3,
    },
    metricDetail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 11,
      marginTop: 3,
    },
  });
