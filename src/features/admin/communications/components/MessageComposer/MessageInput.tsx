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
}

export const MessageInput: React.FC<MessageInputProps> = ({
  message,
  onMessageChange,
  charCount,
  smsCount,
  recipientCount,
  isOverLimit,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
  <View style={styles.inputWrapper}>
    <TextInput
      placeholder="Ecrivez votre message ici..."
      placeholderTextColor={colors.neutral[400]}
      value={message}
      onChangeText={onMessageChange}
      multiline
      numberOfLines={4}
      style={styles.input}
      underlineColor="transparent"
      activeUnderlineColor="transparent"
      textColor={colors.neutral[800]}
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
