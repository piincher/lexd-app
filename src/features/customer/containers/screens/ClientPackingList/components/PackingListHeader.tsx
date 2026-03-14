/**
 * PackingListHeader Component
 * App bar header with back button and actions for packing list screen
 */

import React from 'react';
import { View } from 'react-native';
import { Appbar, ProgressBar } from 'react-native-paper';
import { styles } from '../ClientPackingListScreen.styles';

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
  const isDownloading = downloadProgress > 0;

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Liste de Colisage" />
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
