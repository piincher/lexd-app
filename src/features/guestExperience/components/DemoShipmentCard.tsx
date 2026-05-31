import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withTiming, withDelay } from 'react-native-reanimated';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import type { DemoShipment } from '../types';

interface Props {
  shipment: DemoShipment;
}

export const DemoShipmentCard: React.FC<Props> = ({ shipment }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withDelay(400, withTiming(shipment.progress, { duration: 1000 }));
  }, [shipment.progress, progress]);
  const barStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));
  const modeLabel = shipment.mode === 'air' ? 'Aérien' : 'Maritime';
  const modeIcon = shipment.mode === 'air' ? 'plane' : 'ship';
  const awb = shipment.mode === 'air' ? shipment.airwayBillNumber : shipment.containerNumber;
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.modeBadge}>
          <FontAwesome6 name={modeIcon} size={14} color={colors.primary.main} />
          <Text style={styles.modeText}>{modeLabel}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${shipment.statusColor}20` }]}>
          <Text style={[styles.statusText, { color: shipment.statusColor }]}>{shipment.status}</Text>
        </View>
      </View>
      <Text style={styles.awb}>{awb}</Text>
      <Text style={styles.route}>{shipment.route}</Text>
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { backgroundColor: shipment.statusColor }, barStyle]} />
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoPill}>
          <MaterialCommunityIcons name="package-variant" size={14} color={colors.text.secondary} />
          <Text style={styles.infoText}>{shipment.goodsCount} articles</Text>
        </View>
        <View style={styles.infoPill}>
          <MaterialCommunityIcons name="weight-kilogram" size={14} color={colors.text.secondary} />
          <Text style={styles.infoText}>{shipment.weight}</Text>
        </View>
        <View style={styles.infoPill}>
          <MaterialCommunityIcons name="cube-outline" size={14} color={colors.text.secondary} />
          <Text style={styles.infoText}>{shipment.volume}</Text>
        </View>
      </View>
      <Text style={styles.eta}>Arrivée estimée: {shipment.etaDate}</Text>
    </Animated.View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 20, marginTop: Theme.spacing.lg,
      borderRadius: Theme.radius['2xl'], padding: Theme.spacing.lg,
      backgroundColor: colors.background.card,
      ...Theme.shadows.md,
    },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    modeBadge: {
      flexDirection: 'row', alignItems: 'center', gap: 8,
      paddingHorizontal: 12, paddingVertical: 8,
      borderRadius: 9999,
      backgroundColor: colors.primary[50],
    },
    modeText: { fontFamily: Fonts.bold, fontSize: 12, color: colors.primary.main },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 9999 },
    statusText: { fontFamily: Fonts.bold, fontSize: 12 },
    awb: { fontFamily: Fonts.bold, fontSize: 22, color: colors.text.primary, marginTop: 8 },
    route: { fontFamily: Fonts.medium, fontSize: 14, color: colors.text.secondary, marginTop: 4 },
    progressTrack: {
      height: 6, borderRadius: 9999,
      backgroundColor: colors.neutral[200],
      marginTop: 16, overflow: 'hidden',
    },
    progressFill: { height: '100%', borderRadius: 9999 },
    infoRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
    infoPill: {
      flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4,
      paddingHorizontal: 8, paddingVertical: 8,
      borderRadius: 12,
      backgroundColor: colors.neutral[100],
    },
    infoText: { fontFamily: Fonts.medium, fontSize: 11, color: colors.text.secondary },
    eta: { fontFamily: Fonts.medium, fontSize: 13, color: colors.text.muted, marginTop: 16 },
  });
