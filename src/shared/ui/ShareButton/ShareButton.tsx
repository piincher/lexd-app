/**
 * ShareButton — reusable share affordance for detail screens.
 *
 * Drop it into any header. For shipment entities (order/goods/container) with a
 * `publicRef`, tapping offers an internal vs public link chooser; for everything
 * else it shares the internal universal link directly. All logic lives in
 * useEntityShare, so this stays purely presentational.
 *
 * @example
 *   <ShareButton config={{
 *     type: 'container',
 *     internalPath: `admin-containers/${container._id}`,
 *     publicRef: container.virtualContainerNumber,
 *     title: `Conteneur ${container.virtualContainerNumber}`,
 *   }} />
 */
import React from 'react';
import { IconButton } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useEntityShare, type ShareEntityConfig } from '@src/shared/lib/share/useEntityShare';

interface ShareButtonProps {
  config: ShareEntityConfig;
  size?: number;
  /** Override the icon colour (defaults to the theme's primary text colour). */
  color?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ config, size = 22, color }) => {
  const { colors } = useAppTheme();
  const { share, isMintingPublic } = useEntityShare(config);

  return (
    <IconButton
      icon="share-variant"
      size={size}
      iconColor={color ?? colors.text.primary}
      onPress={share}
      disabled={isMintingPublic}
      accessibilityLabel="Partager"
    />
  );
};

export default ShareButton;
