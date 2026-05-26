/**
 * PackingListFooter Component
 * Footer with action buttons for PDF download and sharing
 * SRP: Display action buttons for packing list operations
 */

import React from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ClientPackingListScreen.styles';

interface PackingListFooterProps {
  onDownloadPDF: () => void;
  onShare: () => void;
  isDownloading: boolean;
}

export const PackingListFooter: React.FC<PackingListFooterProps> = ({
  onDownloadPDF,
  onShare,
  isDownloading,
}) => {
  const theme = useTheme();
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.actionBar}>
      <Button
        mode="outlined"
        onPress={onShare}
        icon="share-variant"
        style={[styles.actionBarButton, { borderColor: colors.border }]}
        labelStyle={styles.actionBarButtonLabel}
        disabled={isDownloading}
        accessibilityLabel="Partager la liste de colisage"
        accessibilityHint="Partager votre liste de colisage via PDF ou texte"
      >
        Partager
      </Button>
      <Button
        mode="contained"
        onPress={onDownloadPDF}
        icon="file-download"
        style={[styles.actionBarButton, styles.actionBarButtonPrimary]}
        labelStyle={styles.actionBarButtonLabelPrimary}
        loading={isDownloading}
        disabled={isDownloading}
        accessibilityLabel="Télécharger le PDF"
        accessibilityHint="Télécharger votre liste de colisage au format PDF"
      >
        Télécharger PDF
      </Button>
    </View>
  );
};

export default PackingListFooter;
