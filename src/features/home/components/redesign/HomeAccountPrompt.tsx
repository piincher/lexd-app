import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createHomeRedesignStyles } from './HomeRedesign.styles';

interface HomeAccountPromptProps { onPress: () => void; }

export const HomeAccountPrompt: React.FC<HomeAccountPromptProps> = ({ onPress }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createHomeRedesignStyles(colors, isDark);

  return (
    <View style={styles.accountCard}>
      <Text style={styles.accountTitle}>Votre dossier voyage avec vous.</Text>
      <Text style={styles.accountBody}>
        Connectez-vous pour consulter vos envois, paiements, documents et notifications au même endroit.
      </Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Ouvrir mon compte LEXD"
        style={({ pressed }) => [styles.accountButton, pressed && styles.accountButtonPressed]}
      >
        <Text style={styles.accountButtonText} numberOfLines={1}>Ouvrir mon compte</Text>
        <Ionicons name="arrow-forward" size={18} color={colors.text.inverse} />
      </Pressable>
    </View>
  );
};
