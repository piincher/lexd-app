import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { WarehouseMode } from '../types';
import { styles } from './WarehouseAddressCard.styles';

interface Props {
  mode: WarehouseMode;
  accent: string;
  isSharing: boolean;
  isSaving: boolean;
  onCopy: () => void;
  onShare: (mode: WarehouseMode) => void;
  onSave: (mode: WarehouseMode) => void;
}

export const WarehouseAddressActions: React.FC<Props> = ({
  mode, accent, isSharing, isSaving, onCopy, onShare, onSave,
}) => {
  const { colors } = useAppTheme();
  const busy = isSharing || isSaving;

  return (
    <View style={[styles.actions, { backgroundColor: colors.background.paper }]}>
      <Pressable
        onPress={() => onShare(mode)}
        disabled={busy}
        style={({ pressed }) => [styles.primary, { backgroundColor: accent }, (pressed || busy) && { opacity: 0.72 }]}
        accessibilityRole="button"
        accessibilityLabel="Partager l'image avec votre fournisseur"
        accessibilityState={{ busy: isSharing, disabled: busy }}
      >
        {isSharing ? <ActivityIndicator color={colors.text.inverse} /> : <Ionicons name="share-social" size={20} color={colors.text.inverse} />}
        <Text style={[styles.primaryText, { color: colors.text.inverse }]}>
          {isSharing ? 'Préparation de l’image…' : 'Partager avec mon fournisseur'}
        </Text>
      </Pressable>
      <Text style={[styles.primaryHint, { color: colors.text.secondary }]}>
        WhatsApp, Alibaba ou une autre app apparaîtra si elle est installée et accepte les images.
      </Text>
      <View style={styles.secondaryRow}>
        <Pressable
          onPress={onCopy}
          disabled={busy}
          style={({ pressed }) => [styles.secondary, { borderColor: colors.border }, pressed && { opacity: 0.65 }]}
          accessibilityRole="button"
          accessibilityLabel="Copier toute l'adresse"
        >
          <Ionicons name="copy-outline" size={17} color={colors.text.primary} />
          <Text style={[styles.secondaryText, { color: colors.text.primary }]}>Copier</Text>
        </Pressable>
        <Pressable
          onPress={() => onSave(mode)}
          disabled={busy}
          style={({ pressed }) => [styles.secondary, { borderColor: colors.border }, (pressed || busy) && { opacity: 0.65 }]}
          accessibilityRole="button"
          accessibilityLabel="Enregistrer l'image dans la galerie"
          accessibilityState={{ busy: isSaving, disabled: busy }}
        >
          {isSaving ? <ActivityIndicator size="small" color={colors.text.primary} /> : <Ionicons name="download-outline" size={17} color={colors.text.primary} />}
          <Text style={[styles.secondaryText, { color: colors.text.primary }]}>{isSaving ? 'En cours…' : 'Enregistrer'}</Text>
        </Pressable>
      </View>
    </View>
  );
};
