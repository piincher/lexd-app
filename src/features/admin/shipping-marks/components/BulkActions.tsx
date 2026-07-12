import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@src/shared/ui/Button';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './BulkActions.styles';

interface BulkActionsProps {
  selectedCount: number;
  total: number;
  onSendSelected: () => void;
  onSendAll: () => void;
  onClearSelection: () => void;
  isSending: boolean;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  total,
  onSendSelected,
  onSendAll,
  onClearSelection,
  isSending,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const hasSelection = selectedCount > 0;

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        {hasSelection ? (
          <Pressable
            onPress={onClearSelection}
            style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Effacer la sélection"
          >
            <Ionicons name="close" size={21} color={colors.text.primary} />
          </Pressable>
        ) : (
          <View style={styles.iconBox}>
            <Ionicons name="people-outline" size={21} color={colors.primary.main} />
          </View>
        )}
        <View style={styles.summary}>
          <Text style={styles.title}>Envoi groupé</Text>
          <Text style={styles.subtitle} selectable numberOfLines={1}>
            {hasSelection ? `${selectedCount} client${selectedCount > 1 ? 's' : ''} sélectionné${selectedCount > 1 ? 's' : ''}` : `${total} clients disponibles`}
          </Text>
        </View>
        <Button
          title={hasSelection ? `Envoyer (${selectedCount})` : 'Envoyer à tous'}
          icon="logo-whatsapp"
          onPress={hasSelection ? onSendSelected : onSendAll}
          disabled={total === 0 || isSending}
          loading={isSending}
          style={styles.sendButton}
          accessibilityHint={hasSelection ? 'Ouvre la confirmation pour les clients sélectionnés' : 'Ouvre la confirmation pour tous les clients filtrés'}
        />
      </View>
    </SafeAreaView>
  );
};
