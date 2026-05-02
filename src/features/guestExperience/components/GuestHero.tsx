import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const GuestHero: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <FontAwesome5 name="eye" size={13} color={colors.primary.main} />
        <Text style={styles.badgeText}>Mode démo</Text>
      </View>
      <Text style={styles.title}>Découvrez le suivi ChinaLink sans compte client</Text>
      <Text style={styles.subtitle}>
        Cette démo explique comment les vrais clients suivent leurs marchandises, reçoivent les
        alertes et consultent leurs documents. Aucune donnée réelle n’est affichée en mode invité.
      </Text>
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 12,
    },
    badge: {
      alignSelf: 'flex-start',
      minHeight: 36,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderRadius: 999,
      paddingHorizontal: 12,
      backgroundColor: isDark ? 'rgba(74,222,128,0.12)' : '#F0FDF4',
    },
    badgeText: {
      color: colors.primary.main,
      fontFamily: Fonts.bold,
      fontSize: 12,
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 28,
      lineHeight: 34,
      marginTop: 16,
    },
    subtitle: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 15,
      lineHeight: 22,
      marginTop: 10,
    },
  });
