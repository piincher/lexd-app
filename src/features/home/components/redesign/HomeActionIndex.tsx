import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createHomeRedesignStyles } from './HomeRedesign.styles';

interface HomeActionIndexProps {
  onTrack: () => void;
  onPreview: () => void;
  onLogin: () => void;
}

const ACTIONS = [
  { key: 'track', title: 'Suivre un envoi', subtitle: 'Recherchez avec votre code d’expédition', icon: 'locate-outline' },
  { key: 'preview', title: 'Voir le parcours client', subtitle: 'Explorez une expédition de démonstration', icon: 'map-outline' },
  { key: 'login', title: 'Se connecter', subtitle: 'Retrouvez vos envois, paiements et documents', icon: 'person-outline' },
] as const;

export const HomeActionIndex: React.FC<HomeActionIndexProps> = ({ onTrack, onPreview, onLogin }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createHomeRedesignStyles(colors, isDark);
  const handlers = { track: onTrack, preview: onPreview, login: onLogin };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Commencer ici</Text>
        <Text style={styles.sectionBody}>Choisissez ce que vous voulez faire maintenant.</Text>
      </View>
      <View style={styles.indexList}>
        {ACTIONS.map((action, index) => (
          <Pressable
            key={action.key}
            onPress={handlers[action.key]}
            accessibilityRole="button"
            accessibilityLabel={action.title}
            style={({ pressed }) => [styles.indexRow, pressed && styles.indexRowPressed]}
          >
            <Text style={styles.indexNumber}>{String(index + 1).padStart(2, '0')}</Text>
            <View style={styles.indexIcon}>
              <Ionicons name={action.icon} size={21} color={colors.primary.main} />
            </View>
            <View style={styles.indexCopy}>
              <Text style={styles.indexTitle} numberOfLines={1}>{action.title}</Text>
              <Text style={styles.indexSubtitle}>{action.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.disabled} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};
