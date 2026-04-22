/**
 * PackingListExportActions Component
 * Export buttons (PDF, Excel, Share)
 * SRP: Display export action buttons
 */

import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PackingListExportActions.styles';

interface PackingListExportActionsProps {
  onShare: () => void;
  onDownload: () => void;
  isDownloading: boolean;
}

export const PackingListExportActions: React.FC<PackingListExportActionsProps> = ({
  onShare,
  onDownload,
  isDownloading,
}) => {
  const theme = useTheme();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.actionBar}>
      <Button
        mode="outlined"
        onPress={onShare}
        icon="share-variant"
        style={styles.actionBarButton}
        labelStyle={styles.actionBarButtonLabel}
        disabled={isDownloading}
      >
        Partager
      </Button>
      <Button
        mode="contained"
        onPress={onDownload}
        icon="download"
        style={[styles.actionBarButton, styles.actionBarButtonPrimary]}
        labelStyle={styles.actionBarButtonLabelPrimary}
        loading={isDownloading}
        disabled={isDownloading}
      >
        Télécharger PDF
      </Button>
    </View>
  );
};

export default PackingListExportActions;
