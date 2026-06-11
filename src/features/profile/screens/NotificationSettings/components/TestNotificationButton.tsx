import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { sendTestNotification } from '@src/services/pushNotificationService';

/**
 * Diagnostic: fires a push to the current device via the backend so an operator
 * can confirm end-to-end delivery (registration → backend → Expo → device),
 * including the foreground heads-up banner.
 */
export const TestNotificationButton: React.FC = () => {
  const { colors } = useAppTheme();
  const [sending, setSending] = useState(false);

  const handlePress = async () => {
    setSending(true);
    const ok = await sendTestNotification(
      'Notification de test',
      'Si vous voyez ceci, les notifications fonctionnent ✅',
    );
    setSending(false);
    Alert.alert(
      ok ? 'Envoyée' : 'Échec',
      ok
        ? "La notification a été envoyée. Elle devrait apparaître dans quelques secondes (bannière en avant-plan, ou dans la barre d'état)."
        : "Impossible d'envoyer la notification de test. Vérifiez que l'appareil est bien enregistré et que les permissions sont accordées.",
    );
  };

  return (
    <View style={styles.wrap}>
      <Button
        mode="outlined"
        icon="bell-ring-outline"
        loading={sending}
        disabled={sending}
        onPress={handlePress}
        textColor={colors.primary.main}
      >
        Envoyer une notification de test
      </Button>
      <Text style={[styles.hint, { color: colors.text.secondary }]}>
        Vérifie l'enregistrement de l'appareil et la livraison de bout en bout.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { marginHorizontal: 16, marginTop: 8, marginBottom: 4 },
  hint: { fontSize: 12, marginTop: 6, textAlign: 'center' },
});
