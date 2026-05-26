/**
 * PackingListHeader Component
 * App bar header with back button and actions for packing list screen
 */

import React from 'react';
import { View } from 'react-native';
import { Appbar, ProgressBar } from 'react-native-paper';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ClientPackingListScreen.styles';

export interface PackingListHeaderProps {
  onBack: () => void;
  onDownload: () => void;
  onShare: () => void;
  downloadProgress: number;
}

export const PackingListHeader: React.FC<PackingListHeaderProps> = ({
  onBack,
  onDownload,
  onShare,
  downloadProgress,
}) => {
  const navigation = useNavigation();
  const isDownloading = downloadProgress > 0;
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Liste de Colisage" />
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={22}
          color={colors.text.primary}
        />
        <Appbar.Action
          icon="file-download"
          onPress={onDownload}
          disabled={isDownloading}
          accessibilityLabel="Télécharger PDF"
        />
        <Appbar.Action
          icon="share-variant"
          onPress={onShare}
          accessibilityLabel="Partager"
        />
      </Appbar.Header>
      {isDownloading && (
        <ProgressBar
          progress={downloadProgress}
          style={styles.progressBar}
        />
      )}
    </View>
  );
};

export default PackingListHeader;
