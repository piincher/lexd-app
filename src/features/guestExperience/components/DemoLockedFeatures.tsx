import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import type { DemoLockedFeature } from '../types';

interface Props {
  features: DemoLockedFeature[];
}

export const DemoLockedFeatures: React.FC<Props> = ({ features }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Fonctionnalités protégées</Text>
        <MaterialCommunityIcons name="lock" size={18} color={colors.text.muted} />
      </View>

      {features.map((feature, index) => (
        <Animated.View
          key={feature.id}
          entering={FadeInDown.delay(index * 60).springify()}
          style={styles.row}
        >
          <View style={styles.iconBox}>
            <FontAwesome6 name={feature.icon as any} size={14} color={colors.text.secondary} />
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.title}>{feature.title}</Text>
            <Text style={styles.detail}>{feature.detail}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Connexion</Text>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors']) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: Theme.spacing['2xl'],
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Theme.spacing.md,
    },
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Theme.spacing.md,
      paddingVertical: Theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: Theme.radius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.neutral[100],
    },
    textBlock: {
      flex: 1,
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
    detail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 2,
    },
    badge: {
      backgroundColor: colors.neutral[100],
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: Theme.radius.md,
    },
    badgeText: {
      color: colors.text.muted,
      fontFamily: Fonts.medium,
      fontSize: 10,
    },
  });
