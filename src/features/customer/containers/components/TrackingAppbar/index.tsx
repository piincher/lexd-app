import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import type { RootStackScreenProps } from '@src/navigations/type';

interface TrackingAppbarProps {
  navigation: RootStackScreenProps<'ContainerTracking'>['navigation'];
  /** When set, shows a share action that creates a public tracking link. */
  onShare?: () => void;
  isSharing?: boolean;
}

export const TrackingAppbar: React.FC<TrackingAppbarProps> = ({ navigation, onShare, isSharing }) => {
  const theme = useTheme();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Suivi Container" />
      {onShare && (
        <Appbar.Action icon="share-variant" onPress={onShare} disabled={isSharing} />
      )}
      <NotificationBell
        onPress={() => navigation.navigate('Notifications' as never)}
        size={24}
        color={theme.colors.onSurface}
      />
    </Appbar.Header>
  );
};
