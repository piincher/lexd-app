import React from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { SMS_LONG_LIMIT } from './composerConstants';
import { styles } from './MessageComposer.styles';

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
}) => (
  <View style={styles.inputWrapper}>
    <TextInput
      placeholder="Ecrivez votre message ici..."
      placeholderTextColor={Theme.neutral[400]}
      value={message}
      onChangeText={onMessageChange}
      multiline
      numberOfLines={4}
      style={styles.input}
      underlineColor="transparent"
      activeUnderlineColor="transparent"
      textColor={Theme.neutral[800]}
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
