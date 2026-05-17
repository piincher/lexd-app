import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getStyles } from './TicketMessageBubble.styles';

interface MessageAvatarProps {
  isCustomer: boolean;
}

export const MessageAvatar: React.FC<MessageAvatarProps> = ({ isCustomer }) => {
  const { colors } = useAppTheme();
  const theme = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={[styles.avatar, { backgroundColor: isCustomer ? theme.colors.primary : colors.text.secondary }]}>
      <MaterialCommunityIcons
        name={isCustomer ? 'account' : 'account-tie'}
        size={20}
        color={colors.text.inverse}
      />
    </View>
  );
};
