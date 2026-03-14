/**
 * PackingListAppBar Component
 * App bar for packing list screen
 * SRP: Display header with navigation and actions
 */

import React from 'react';
import { Appbar } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { StyleSheet } from 'react-native';

interface PackingListAppBarProps {
  onBack: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export const PackingListAppBar: React.FC<PackingListAppBarProps> = ({
  onBack,
  onShare,
  onDownload,
}) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title="Liste de Colisage" titleStyle={styles.headerTitle} />
      <Appbar.Action icon="share-variant" onPress={onShare} />
      <Appbar.Action icon="download" onPress={onDownload} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: Fonts.bold,
  },
});

export default PackingListAppBar;
