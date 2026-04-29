import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../screens/AllOrdersScreen.styles';

interface AllOrdersHeaderActionsProps {
  isSelectionMode: boolean;
  isSyncing: boolean;
  onToggleSelectionMode: () => void;
  onSync: () => void;
}

export const AllOrdersHeaderActions: React.FC<AllOrdersHeaderActionsProps> = ({
  isSelectionMode,
  isSyncing,
  onToggleSelectionMode,
  onSync,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.headerActionsRow}>
      <IconButton
        icon={isSelectionMode ? 'close' : 'checkbox-multiple-marked-outline'}
        size={24}
        onPress={onToggleSelectionMode}
        iconColor={colors.primary.main}
      />
      <IconButton
        icon="sync"
        size={24}
        onPress={onSync}
        loading={isSyncing}
        disabled={isSyncing}
        iconColor={colors.primary.main}
      />
    </View>
  );
};
