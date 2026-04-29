import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SharedShipmentErrorProps {
  error: unknown;
}

export const SharedShipmentError: React.FC<SharedShipmentErrorProps> = ({ error }) => {
  const { colors } = useAppTheme();
  const status = (error as { response?: { status?: number } })?.response?.status;
  const isExpired = status === 410;

  return (
    <View style={styles.center}>
      <MaterialCommunityIcons
        name={isExpired ? 'link-variant-off' : 'link-variant-remove'}
        size={56}
        color={colors.status.error}
      />
      <Text style={[styles.errorTitle, { color: colors.text.primary }]}>
        {isExpired ? 'Lien expiré' : 'Lien invalide'}
      </Text>
      <Text style={[styles.errorText, { color: colors.text.secondary }]}>
        {isExpired
          ? "Ce lien de partage a expiré ou a été révoqué. Demandez à l'expéditeur de générer un nouveau lien."
          : "Ce lien de suivi n'existe pas ou n'est plus valide."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});
