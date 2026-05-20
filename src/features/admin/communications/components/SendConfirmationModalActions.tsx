import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SendConfirmationModalActionsProps {
  styles: any;
  isSending: boolean;
  colors: any;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SendConfirmationModalActions: React.FC<SendConfirmationModalActionsProps> = ({
  styles,
  isSending,
  colors,
  onConfirm,
  onCancel,
}) => {
  const { colors: themeColors } = useAppTheme();
  return (
    <View style={styles.actions}>
      <TouchableOpacity onPress={onCancel} style={styles.cancelButton} activeOpacity={0.7}>
        <Text style={styles.cancelText}>Annuler</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={isSending ? undefined : onConfirm}
        style={[styles.confirmWrapper, isSending && styles.confirmDisabled]}
        activeOpacity={isSending ? 1 : 0.8}
        disabled={isSending}
      >
        <LinearGradient
          colors={isSending ? [colors.neutral[400], colors.neutral[400]] : [themeColors.primary.main, themeColors.primary.dark]}
          style={styles.confirmButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name={isSending ? 'hourglass' : 'send'} size={16} color={colors.text.inverse} />
          <Text style={styles.confirmText}>{isSending ? 'Envoi en cours...' : 'Envoyer'}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
