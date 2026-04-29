/**
 * SharedShipmentScreen
 *
 * Public screen for viewing a shared shipment via a secure token.
 * Accessible without authentication — designed for recipients who
 * receive a share link via WhatsApp, SMS, email, etc.
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useSharedShipment } from '../../hooks/useSharedShipment';
import { SharedShipmentLoading } from '../../components/SharedShipmentLoading';
import { SharedShipmentError } from '../../components/SharedShipmentError';
import { SharedShipmentContent } from '../../components/SharedShipmentContent';
import { styles } from './SharedShipmentScreen.styles';

export const SharedShipmentScreen: React.FC<RootStackScreenProps<'SharedShipment'>> = ({
  route,
  navigation,
}) => {
  const { token } = route.params;
  const { colors } = useAppTheme();
  const { data, isLoading, isError, error } = useSharedShipment(token);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Suivi d'envoi" />
      </Appbar.Header>

      {isLoading && <SharedShipmentLoading color={colors.primary.main} />}
      {(isError || !data) && <SharedShipmentError error={error} />}
      {data && <SharedShipmentContent data={data} token={token} />}
    </SafeAreaView>
  );
};

export default SharedShipmentScreen;
