import React from 'react';
import { Pressable } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './AuthInput.styles';

interface AuthInputRightIconProps {
  onPress: () => void;
  icon: React.ReactNode;
}

export const AuthInputRightIcon: React.FC<AuthInputRightIconProps> = ({ onPress, icon }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <Pressable onPress={onPress} style={styles.rightIcon}>
      {icon}
    </Pressable>
  );
};
