import React from 'react';
import { Appbar } from 'react-native-paper';
import { createStyles } from './ActiveOrderHeader.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ActiveOrderHeaderProps {
  title: string;
  onBack: () => void;
  rightAction?: React.ReactNode;
}

export const ActiveOrderHeader: React.FC<ActiveOrderHeaderProps> = ({
  title,
  onBack,
  rightAction,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title={title} titleStyle={styles.appbarTitle} />
      {rightAction}
    </Appbar.Header>
  );
};

export default ActiveOrderHeader;
