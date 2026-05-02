import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const GuestPrivacyNotice: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <FontAwesome5 name="shield-alt" size={16} color={colors.status.info} />
      <Text style={styles.text}>
        Mode invité : consultation uniquement. Les expéditions, factures et notifications réelles
        restent protégées et demandent une connexion client.
      </Text>
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 14,
      borderRadius: 14,
      padding: 12,
      flexDirection: 'row',
      gap: 10,
      backgroundColor: isDark ? 'rgba(96,165,250,0.10)' : '#EFF6FF',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(96,165,250,0.22)' : '#BFDBFE',
    },
    text: {
      flex: 1,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      fontSize: 12,
      lineHeight: 18,
    },
  });
