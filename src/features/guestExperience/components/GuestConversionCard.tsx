import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Button } from '@src/shared/ui/Button';
import { Fonts } from '@src/constants/Fonts';

interface Props {
  supportPhone: string;
  onLogin: () => void;
  onContact: () => void;
}

export const GuestConversionCard: React.FC<Props> = ({ supportPhone, onLogin, onContact }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vous avez déjà des marchandises ?</Text>
      <Text style={styles.detail}>
        Connectez-vous avec le numéro enregistré chez ChinaLink. Si vous n’êtes pas encore client,
        contactez-nous sur WhatsApp {supportPhone}.
      </Text>
      <View style={styles.actions}>
        <Button title="Se connecter" onPress={onLogin} fullWidth size="large" icon="log-in-outline" />
        <Button title="Devenir client" onPress={onContact} fullWidth size="large" variant="outline" icon="logo-whatsapp" />
      </View>
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 22,
      marginBottom: 28,
      borderRadius: 16,
      padding: 16,
      backgroundColor: isDark ? 'rgba(74,222,128,0.10)' : '#F0FDF4',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(74,222,128,0.24)' : '#BBF7D0',
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
    },
    detail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 8,
    },
    actions: {
      gap: 10,
      marginTop: 16,
    },
  });
