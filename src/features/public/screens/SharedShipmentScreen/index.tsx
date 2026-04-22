/**
 * SharedShipmentScreen
 *
 * Public screen for viewing a shared shipment via a secure token.
 * Accessible without authentication — designed for recipients who
 * receive a share link via WhatsApp, SMS, email, etc.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Appbar, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useSharedShipment } from '../../hooks/useSharedShipment';
import { SharedShipmentStatusCard } from './components/SharedShipmentStatusCard';
import { SharedShipmentDetails } from './components/SharedShipmentDetails';
import { SharedShipmentTimeline } from './components/SharedShipmentTimeline';
import { SharedShipmentCTA } from './components/SharedShipmentCTA';

export const SharedShipmentScreen: React.FC<RootStackScreenProps<'SharedShipment'>> = ({
  route,
  navigation,
}) => {
  const { token } = route.params;
  const { colors } = useAppTheme();
  const { data, isLoading, isError, error } = useSharedShipment(token);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background.default,
        },
        scrollContent: {
          padding: 16,
          paddingBottom: 40,
        },
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
          color: colors.text.primary,
        },
        errorText: {
          marginTop: 8,
          fontSize: 14,
          color: colors.text.secondary,
          textAlign: 'center',
        },
      }),
    [colors]
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Suivi d'envoi" />
        </Appbar.Header>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !data) {
    const status = (error as any)?.response?.status;
    const isExpired = status === 410;
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Suivi d'envoi" />
        </Appbar.Header>
        <View style={styles.center}>
          <MaterialCommunityIcons
            name={isExpired ? 'link-variant-off' : 'link-variant-remove'}
            size={56}
            color={colors.status.error}
          />
          <Text style={styles.errorTitle}>
            {isExpired ? 'Lien expiré' : 'Lien invalide'}
          </Text>
          <Text style={styles.errorText}>
            {isExpired
              ? "Ce lien de partage a expiré ou a été révoqué. Demandez à l'expéditeur de générer un nouveau lien."
              : "Ce lien de suivi n'existe pas ou n'est plus valide."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const reference =
    (data.data as any).goodsId ||
    (data.data as any).containerNumber ||
    (data.data as any).orderId ||
    token;

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Suivi d'envoi" />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SharedShipmentStatusCard
          reference={reference}
          status={data.currentStatus}
          type={data.type}
        />

        <SharedShipmentDetails
          type={data.type}
          data={data.data}
          estimatedDelivery={data.estimatedDelivery}
        />

        <SharedShipmentTimeline timeline={data.timeline} />

        <SharedShipmentCTA url={`https://chinalinkexpress.com/s/${token}`} reference={reference} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SharedShipmentScreen;
