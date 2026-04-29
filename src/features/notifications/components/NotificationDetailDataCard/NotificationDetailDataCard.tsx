import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { InAppNotification } from '../../types';

interface NotificationDetailDataCardProps {
  data: InAppNotification['data'];
}

const DATA_FIELDS: { key: 'orderId' | 'containerId' | 'ticketId' | 'invoiceId' | 'certificateId'; label: string }[] = [
  { key: 'orderId', label: 'Commande' },
  { key: 'containerId', label: 'Conteneur' },
  { key: 'ticketId', label: 'Ticket' },
  { key: 'invoiceId', label: 'Facture' },
  { key: 'certificateId', label: 'Certificat' },
];

export const NotificationDetailDataCard: React.FC<NotificationDetailDataCardProps> = ({ data }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        dataCard: {
          margin: 16,
          marginTop: 0,
          padding: 20,
          borderRadius: 16,
          backgroundColor: colors.background.card,
        },
        dataTitle: {
          fontFamily: Fonts.bold,
          fontSize: 16,
          color: colors.text.primary,
          marginBottom: 12,
        },
        dataItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        dataLabel: {
          fontFamily: Fonts.medium,
          fontSize: 14,
          color: colors.text.secondary,
        },
        dataValue: {
          fontFamily: Fonts.bold,
          fontSize: 14,
          color: colors.text.primary,
        },
      }),
    [colors]
  );

  if (!data || Object.keys(data).length === 0) return null;

  const hasData = DATA_FIELDS.some((field) => data[field.key]);
  if (!hasData) return null;

  return (
    <Animated.View entering={FadeInUp.delay(300)}>
      <Surface style={styles.dataCard} elevation={1}>
        <Text style={styles.dataTitle}>Informations associées</Text>

        {DATA_FIELDS.map(
          (field) =>
            data[field.key] && (
              <View key={field.key} style={styles.dataItem}>
                <Text style={styles.dataLabel}>{field.label}</Text>
                <Text style={styles.dataValue}>#{String(data[field.key]).slice(-6)}</Text>
              </View>
            )
        )}
      </Surface>
    </Animated.View>
  );
};
