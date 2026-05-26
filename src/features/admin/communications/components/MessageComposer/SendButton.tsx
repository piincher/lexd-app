import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './MessageComposer.styles';

interface SendButtonProps {
  canSend: boolean;
  isSending: boolean;
  recipientCount: number;
  onSend: () => void;
}

export const SendButton: React.FC<SendButtonProps> = ({ canSend, isSending, recipientCount, onSend }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <TouchableOpacity onPress={onSend} disabled={!canSend} style={styles.sendWrapper} activeOpacity={0.8}>
      <LinearGradient
        colors={canSend ? [colors.primary.main, colors.primary.dark] : [colors.neutral[200], colors.neutral[300]]}
        style={styles.sendButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {isSending ? (
          <Text style={styles.sendText}>Envoi en cours...</Text>
        ) : (
          <>
            <Ionicons name="send" size={18} color={colors.text.inverse} />
            <Text style={styles.sendText}>
              Envoyer a {recipientCount} destinataire{recipientCount > 1 ? 's' : ''}
            </Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
