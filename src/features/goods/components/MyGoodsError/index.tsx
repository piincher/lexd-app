// Goods Feature - MyGoodsError Component
// Error state for MyGoodsScreen with retry action

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface MyGoodsErrorProps {
  error?: Error | null;
  onRetry: () => void;
}

export const MyGoodsError: React.FC<MyGoodsErrorProps> = ({ error, onRetry }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 32,
        },
        title: {
          fontSize: 18,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginTop: 16,
        },
        message: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textAlign: 'center',
          marginTop: 8,
        },
        retryButton: {
          marginTop: 24,
        },
      }),
    [colors],
  );

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="alert-circle" size={64} color={colors.status.error} />
      <Text style={styles.title}>Erreur de chargement</Text>
      <Text style={styles.message}>
        {error?.message || "Une erreur est survenue lors du chargement de vos marchandises."}
      </Text>
      <Button mode="contained" onPress={onRetry} style={styles.retryButton}>
        Réessayer
      </Button>
    </View>
  );
};
