import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoGoodsItem } from '../types';

interface Props {
  goods: DemoGoodsItem[];
}

export const DemoGoodsPreview: React.FC<Props> = ({ goods }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Marchandises exemple</Text>
          <Text style={styles.subtitle}>Ce type de vue est réservé aux clients connectés.</Text>
        </View>
        <FontAwesome5 name="lock" size={14} color={colors.accent.gold} />
      </View>

      {goods.map((item) => (
        <View key={item.id} style={styles.item}>
          <View style={styles.itemHeader}>
            <View style={styles.iconBox}>
              <FontAwesome5 name={item.mode === 'air' ? 'plane' : 'box'} size={14} color={colors.primary.main} />
            </View>
            <View style={styles.itemTitleBlock}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.tracking}>{item.trackingCode}</Text>
            </View>
          </View>
          <Text style={styles.status}>{item.status}</Text>
          <Text style={styles.route}>{item.route}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>Qté {item.quantity}</Text>
            <Text style={styles.meta}>{item.volume}</Text>
            <Text style={styles.meta}>{item.balance}</Text>
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
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 10,
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
    },
    subtitle: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 4,
    },
    item: {
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : '#EEF2F7',
    },
    itemHeader: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    iconBox: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(74,222,128,0.12)' : '#F0FDF4',
    },
    itemTitleBlock: {
      flex: 1,
    },
    itemName: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
    tracking: {
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      fontSize: 11,
      marginTop: 3,
    },
    status: {
      color: colors.primary.main,
      fontFamily: Fonts.bold,
      fontSize: 12,
      marginTop: 8,
    },
    route: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      marginTop: 4,
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 10,
    },
    meta: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 11,
      borderRadius: 999,
      overflow: 'hidden',
      paddingHorizontal: 9,
      paddingVertical: 5,
      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F3F4F6',
    },
  });
