import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoShipment } from '../types';

interface Props {
  shipment: DemoShipment;
}

export const DemoShipmentCard: React.FC<Props> = ({ shipment }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const iconName = shipment.mode === 'air' ? 'plane-departure' : 'ship';

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.iconBox}>
            <FontAwesome5 name={iconName} size={20} color={colors.primary.main} />
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.eyebrow}>{shipment.label}</Text>
            <Text style={styles.route}>{shipment.route}</Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{shipment.status}</Text>
            <Text style={styles.metricLabel}>Statut actuel</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{shipment.goodsCount}</Text>
            <Text style={styles.metricLabel}>Marchandises</Text>
          </View>
        </View>

        <Text style={styles.eta}>{shipment.eta}</Text>
        <Text style={styles.preview}>Exemple : {shipment.goodsPreview.join(', ')}</Text>
      </View>
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 20,
      marginTop: 16,
    },
    card: {
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
    },
    headerRow: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
    },
    iconBox: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(74,222,128,0.12)' : '#F0FDF4',
    },
    titleBlock: {
      flex: 1,
    },
    eyebrow: {
      color: colors.text.secondary,
      fontFamily: Fonts.bold,
      fontSize: 12,
    },
    route: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
      lineHeight: 24,
      marginTop: 4,
    },
    statusRow: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 16,
    },
    metric: {
      flex: 1,
      borderRadius: 12,
      padding: 12,
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F9FAFB',
    },
    metricValue: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
      lineHeight: 19,
    },
    metricLabel: {
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      fontSize: 11,
      marginTop: 4,
    },
    eta: {
      color: colors.status.info,
      fontFamily: Fonts.bold,
      fontSize: 13,
      marginTop: 14,
    },
    preview: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 8,
    },
  });
