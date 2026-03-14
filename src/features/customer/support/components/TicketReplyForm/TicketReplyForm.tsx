/**
 * TicketReplyForm Component
 * Input form for sending replies to tickets
 */

import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface TicketReplyFormProps {
  onSend: (message: string) => void;
  isPending: boolean;
}

export const TicketReplyForm: React.FC<TicketReplyFormProps> = ({ onSend, isPending }) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const inputRef = useRef<RNTextInput>(null);

  const handleSend = () => {
    if (!message.trim() || isPending) return;
    onSend(message);
    setMessage('');
  };

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
          placeholderTextColor={COLORS.SlateGray}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.Silver,
    padding: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.FeatherWhite,
    borderRadius: 24,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: COLORS.DarkGrey,
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
