import React from 'react';
import { Appbar } from 'react-native-paper';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useClientLoadingListHeaderStyles } from './ClientLoadingListHeader.styles';

interface ClientLoadingListHeaderProps {
  navigation: RootStackScreenProps<'ClientLoadingList'>['navigation'];
}

export const ClientLoadingListHeader: React.FC<ClientLoadingListHeaderProps> = ({
  navigation,
}) => {
  const styles = useClientLoadingListHeaderStyles();

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction color={styles.backAction.color} onPress={() => navigation.goBack()} />
      <Appbar.Content title="Plan de Chargement" titleStyle={styles.title} />
      <NotificationBell
        onPress={() => navigation.navigate('Notifications' as never)}
        size={24}
        color={styles.notification.color}
      />
    </Appbar.Header>
  );
};
