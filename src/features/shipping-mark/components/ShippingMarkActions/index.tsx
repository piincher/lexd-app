import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@src/shared/ui/Button';

interface ShippingMarkActionsProps {
  onDownload: () => void;
  onShare: () => void;
  isDownloading?: boolean;
}

export const ShippingMarkActions: React.FC<ShippingMarkActionsProps> = ({
  onDownload,
  onShare,
  isDownloading = false,
}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Télécharger"
        icon="download-outline"
        onPress={onDownload}
        loading={isDownloading}
        fullWidth
      />
      <Button
        title="Partager"
        icon="share-outline"
        variant="outline"
        onPress={onShare}
        fullWidth
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 8,
  },
});
