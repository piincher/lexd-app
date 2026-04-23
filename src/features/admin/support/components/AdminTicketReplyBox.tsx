import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface AdminTicketReplyBoxProps {
  isPending: boolean;
  disabled?: boolean;
  onSend: (message: string) => void;
}

export const AdminTicketReplyBox: React.FC<AdminTicketReplyBoxProps> = ({
  isPending,
  disabled,
  onSend,
}) => {
  const { colors } = useAppTheme();
  const [message, setMessage] = useState('');
  const canSend = message.trim().length > 0 && !isPending && !disabled;

  const handleSend = () => {
    if (!canSend) return;
    onSend(message.trim());
    setMessage('');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default, borderTopColor: colors.border }]}>
      <View style={[styles.inputWrap, { backgroundColor: colors.background.card }]}>
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          placeholder="Répondre au client..."
          placeholderTextColor={colors.text.secondary}
          multiline
          maxLength={1000}
          value={message}
          onChangeText={setMessage}
          editable={!disabled && !isPending}
        />
        <Pressable
          style={[styles.send, { backgroundColor: canSend ? colors.primary.main : colors.neutral[300] }]}
          onPress={handleSend}
          disabled={!canSend}
        >
          {isPending ? (
            <ActivityIndicator size={18} color={colors.text.inverse} />
          ) : (
            <MaterialCommunityIcons name="send" size={18} color={colors.text.inverse} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    padding: 12,
  },
  inputWrap: {
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    minHeight: 48,
    paddingLeft: 16,
    paddingRight: 6,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    maxHeight: 96,
    paddingVertical: 8,
  },
  send: {
    alignItems: 'center',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
});
