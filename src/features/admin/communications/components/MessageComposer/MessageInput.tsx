import React from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SMS_LONG_LIMIT } from './composerConstants';
import { createStyles } from './MessageComposer.styles';

interface MessageInputProps {
  message: string;
  onMessageChange: (text: string) => void;
  charCount: number;
  smsCount: number;
  recipientCount: number;
  isOverLimit: boolean;
  onInputFocus?: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  message,
  onMessageChange,
  charCount,
  smsCount,
  recipientCount,
  isOverLimit,
  onInputFocus,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
  <View style={styles.inputWrapper}>
    <TextInput
      placeholder="Ecrivez votre message ici..."
      placeholderTextColor={colors.text.disabled}
      value={message}
      onChangeText={onMessageChange}
      onFocus={onInputFocus}
      multiline
      numberOfLines={4}
      style={styles.input}
      underlineColor="transparent"
      activeUnderlineColor="transparent"
      textColor={colors.text.primary}
    />
    <View style={styles.inputFooter}>
      <Text style={[styles.charCount, isOverLimit && styles.charCountOver]}>
        {charCount}/{SMS_LONG_LIMIT}
      </Text>
      <Text style={styles.smsEstimate}>
        ~{smsCount} SMS x {recipientCount} = {smsCount * recipientCount} SMS
      </Text>
    </View>
  </View>
  );
};
