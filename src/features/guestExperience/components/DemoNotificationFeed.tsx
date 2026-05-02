import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoNotification } from '../types';

interface Props {
  notifications: DemoNotification[];
}

export const DemoNotificationFeed: React.FC<Props> = ({ notifications }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Exemples d’alertes client</Text>
      <Text style={styles.sectionIntro}>
        Les vraies alertes sont envoyées uniquement aux clients concernés.
      </Text>
      {notifications.map((item) => (
        <View key={item.id} style={styles.item}>
          <View style={styles.iconBox}>
            <FontAwesome5 name={item.icon} size={14} color={colors.status.info} />
          </View>
          <View style={styles.textBlock}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.detail}>{item.detail}</Text>
            <Text style={styles.channel}>{item.channel}</Text>
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
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
    },
    sectionIntro: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 8,
      marginBottom: 10,
    },
    item: {
      flexDirection: 'row',
      gap: 12,
      paddingVertical: 11,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : '#EEF2F7',
    },
    iconBox: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(96,165,250,0.12)' : '#EFF6FF',
    },
    textBlock: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    title: {
      flex: 1,
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
    time: {
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      fontSize: 11,
    },
    detail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 4,
    },
    channel: {
      color: colors.primary.main,
      fontFamily: Fonts.bold,
      fontSize: 11,
      marginTop: 6,
    },
  });
