/**
 * TicketReplyForm Component
 * Input form for sending replies to tickets
 */

import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface TicketReplyFormProps {
  onSend: (message: string) => void;
  isPending: boolean;
  onFocus?: () => void;
}

export const TicketReplyForm: React.FC<TicketReplyFormProps> = ({ onSend, isPending, onFocus }) => {
  const theme = useTheme();
  const { colors, isDark } = useAppTheme();
  const [message, setMessage] = useState('');
  const inputRef = useRef<RNTextInput>(null);

  const handleSend = () => {
    if (!message.trim() || isPending) return;
    onSend(message);
    setMessage('');
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.default,
      borderTopWidth: 1,
      borderTopColor: colors.neutral[200],
      padding: 12,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
      borderRadius: 24,
      paddingHorizontal: 16,
      minHeight: 48,
    },
    textInput: {
      flex: 1,
      fontFamily: Fonts.regular,
      fontSize: 15,
      color: colors.text.primary,
      maxHeight: 100,
      paddingTop: 8,
      paddingBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <RNTextInput
          ref={inputRef}
          style={styles.textInput}
          placeholder="Écrivez votre message..."
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={1000}
          placeholderTextColor={colors.text.secondary}
          onFocus={onFocus}
        />
        <IconButton
          icon="send"
          size={24}
          iconColor={theme.colors.primary}
          onPress={handleSend}
          disabled={!message.trim() || isPending}
          loading={isPending}
        />
      </View>
    </View>
  );
};
