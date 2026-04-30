import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { styles } from './MessageComposer.styles';

interface SendButtonProps {
  canSend: boolean;
  isSending: boolean;
  recipientCount: number;
  onSend: () => void;
}

export const SendButton: React.FC<SendButtonProps> = ({ canSend, isSending, recipientCount, onSend }) => (
  <TouchableOpacity onPress={onSend} disabled={!canSend} style={styles.sendWrapper} activeOpacity={0.8}>
    <LinearGradient
      colors={canSend ? Theme.gradients.primary : [Theme.neutral[200], Theme.neutral[300]]}
      style={styles.sendButton}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {isSending ? (
        <Text style={styles.sendText}>Envoi en cours...</Text>
      ) : (
        <>
          <Ionicons name="send" size={18} color="#FFF" />
          <Text style={styles.sendText}>
            Envoyer a {recipientCount} destinataire{recipientCount > 1 ? 's' : ''}
          </Text>
        </>
      )}
    </LinearGradient>
  </TouchableOpacity>
);
