"use no memo";

import React from 'react';
import { View } from 'react-native';
import { Surface } from 'react-native-paper';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './OrderDetailSkeleton.styles';

export const HeaderSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <Surface style={[styles.card, { backgroundColor: colors.background.card }]}>
      <View style={styles.headerRow}>
        <View style={styles.avatarSection}>
          <ShimmerBlock width={50} height={50} borderRadius={12} />
          <View style={styles.textSection}>
            <ShimmerBlock width={150} height={18} style={{ marginBottom: 8 }} />
            <ShimmerBlock width={100} height={14} />
          </View>
        </View>
        <ShimmerBlock width={80} height={28} borderRadius={14} />
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.row}>
        <ShimmerBlock width={100} height={16} />
        <ShimmerBlock width={120} height={20} />
      </View>
    </Surface>
  );
};

export const PaymentSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <Surface style={[styles.card, { backgroundColor: colors.background.card }]}>
      <ShimmerBlock width={150} height={18} style={{ marginBottom: 16 }} />
      <View style={styles.paymentStatus}>
        <ShimmerBlock width={50} height={50} borderRadius={25} />
        <View style={styles.paymentText}>
          <ShimmerBlock width={100} height={16} style={{ marginBottom: 8 }} />
          <ShimmerBlock width={150} height={22} />
        </View>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <ShimmerBlock width="100%" height={40} style={{ marginBottom: 12 }} />
      <ShimmerBlock width="100%" height={40} />
    </Surface>
  );
};

export const InfoSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <Surface style={[styles.card, { backgroundColor: colors.background.card }]}>
      <ShimmerBlock width={150} height={18} style={{ marginBottom: 16 }} />
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.infoRow}>
          <ShimmerBlock width={40} height={40} borderRadius={10} />
          <View style={styles.infoText}>
            <ShimmerBlock width={80} height={14} style={{ marginBottom: 4 }} />
            <ShimmerBlock width={150} height={16} />
          </View>
        </View>
      ))}
    </Surface>
  );
};

export const TimelineSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <Surface style={[styles.card, { backgroundColor: colors.background.card }]}>
      <ShimmerBlock width={150} height={18} style={{ marginBottom: 16 }} />
      <View style={styles.timeline}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={styles.timelineItem}>
            <ShimmerBlock width={24} height={24} borderRadius={12} />
            <ShimmerBlock width={120} height={16} />
          </View>
        ))}
      </View>
    </Surface>
  );
};

export const ActionsSkeleton: React.FC = () => (
  <View style={styles.actions}>
    <ShimmerBlock width="100%" height={48} borderRadius={10} style={{ marginBottom: 12 }} />
    <ShimmerBlock width="100%" height={48} borderRadius={10} />
  </View>
);
