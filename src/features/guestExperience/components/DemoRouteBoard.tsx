import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoShipment } from '../types';

interface Props {
  shipment: DemoShipment;
}

export const DemoRouteBoard: React.FC<Props> = ({ shipment }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Carte de progression</Text>
        <Text style={styles.mode}>{shipment.mode === 'air' ? 'Aérien' : 'Maritime'}</Text>
      </View>
      <Text style={styles.route}>{shipment.route}</Text>

      <View style={styles.rail}>
        {shipment.timeline.map((step, index) => {
          const completed = step.status === 'done';
          const active = step.status === 'active';
          return (
            <React.Fragment key={step.id}>
              <View style={styles.stop}>
                <View style={[styles.stopDot, completed && styles.stopDone, active && styles.stopActive]}>
                  <FontAwesome5 name={step.icon} size={12} color={completed || active ? '#FFFFFF' : colors.text.secondary} />
                </View>
                <Text numberOfLines={2} style={[styles.stopLabel, active && styles.stopLabelActive]}>
                  {step.title}
                </Text>
              </View>
              {index < shipment.timeline.length - 1 && (
                <View style={[styles.connector, completed && styles.connectorDone]} />
              )}
            </React.Fragment>
          );
        })}
      </View>

      <View style={styles.nextAction}>
        <FontAwesome5 name="calendar-check" size={14} color={colors.primary.main} />
        <Text style={styles.nextText}>{shipment.eta}</Text>
      </View>
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 18,
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
    },
    mode: {
      color: colors.primary.main,
      fontFamily: Fonts.bold,
      fontSize: 12,
    },
    route: {
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      fontSize: 13,
      marginTop: 6,
    },
    rail: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 18,
    },
    stop: {
      width: 58,
      alignItems: 'center',
    },
    stopDot: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#EEF2F7',
    },
    stopDone: {
      backgroundColor: colors.primary.main,
    },
    stopActive: {
      backgroundColor: colors.status.info,
    },
    stopLabel: {
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      fontSize: 10,
      lineHeight: 13,
      textAlign: 'center',
      marginTop: 7,
    },
    stopLabelActive: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
    },
    connector: {
      flex: 1,
      height: 3,
      borderRadius: 999,
      marginTop: 18,
      backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : '#E5E7EB',
    },
    connectorDone: {
      backgroundColor: colors.primary.main,
    },
    nextAction: {
      minHeight: 42,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
      paddingHorizontal: 12,
      marginTop: 18,
      backgroundColor: isDark ? 'rgba(74,222,128,0.10)' : '#F0FDF4',
    },
    nextText: {
      flex: 1,
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 12,
    },
  });
