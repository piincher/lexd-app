import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import type { RootStackScreenProps } from '@src/navigations/type';

interface TrackingAppbarProps {
  navigation: RootStackScreenProps<'ContainerTracking'>['navigation'];
}

export const TrackingAppbar: React.FC<TrackingAppbarProps> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Suivi Container" />
      <NotificationBell
        onPress={() => navigation.navigate('Notifications' as never)}
        size={24}
        color={theme.colors.onSurface}
      />
    </Appbar.Header>
  );
};
