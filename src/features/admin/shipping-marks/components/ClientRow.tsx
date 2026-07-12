import React, { useCallback } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from '@src/shared/ui/Checkbox';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ShippingMarkClient } from '../api/shippingMarkAdminApi';
import { createStyles } from './ClientRow.styles';
import { ClientRowAction } from './ClientRowAction';

interface ClientRowProps {
  client: ShippingMarkClient;
  selected: boolean;
  onToggle: (id: string) => void;
  onPreview: (client: ShippingMarkClient) => void;
  onDownload: (client: ShippingMarkClient) => void;
  onSend: (client: ShippingMarkClient) => void;
  onRegenerate: (id: string) => void;
  isRegenerating: boolean;
  isSending: boolean;
}

export const ClientRow = React.memo<ClientRowProps>(({
  client,
  selected,
  onToggle,
  onPreview,
  onDownload,
  onSend,
  onRegenerate,
  isRegenerating,
  isSending,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const hasImage = Boolean(client.shippingMarkImageUrl);
  const name = `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.phoneNumber;
  const toggle = useCallback(() => onToggle(client._id), [client._id, onToggle]);
  const preview = useCallback(() => onPreview(client), [client, onPreview]);
  const download = useCallback(() => onDownload(client), [client, onDownload]);
  const send = useCallback(() => onSend(client), [client, onSend]);
  const regenerate = useCallback(() => onRegenerate(client._id), [client._id, onRegenerate]);

  return (
    <View style={[styles.card, selected && styles.selectedCard]}>
      <View style={styles.mainRow}>
        <Checkbox
          checked={selected}
          onPress={toggle}
          style={styles.selectionTarget}
          accessibilityLabel={`Sélectionner ${name}`}
        />
        <Pressable
          onPress={preview}
          disabled={!hasImage}
          style={({ pressed }) => [styles.previewButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={`Aperçu de la marque de ${name}`}
          accessibilityState={{ disabled: !hasImage }}
        >
          {hasImage ? (
            <Image
              source={{ uri: client.shippingMarkImageUrl }}
              style={styles.thumb}
              contentFit="contain"
              recyclingKey={client._id}
              transition={120}
            />
          ) : (
            <Ionicons name="document-outline" size={25} color={colors.text.secondary} />
          )}
        </Pressable>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={styles.identityRow}>
            <Text style={styles.clientId} selectable numberOfLines={1}>{client.clientId}</Text>
            <View style={hasImage ? styles.readyBadge : styles.missingBadge}>
              <Ionicons
                name={hasImage ? 'checkmark-circle' : 'time-outline'}
                size={13}
                color={hasImage ? colors.feedback.successDark : colors.feedback.warningDark}
              />
              <Text style={hasImage ? styles.readyText : styles.missingText}>
                {hasImage ? 'Prête' : 'À générer'}
              </Text>
            </View>
          </View>
          <Text style={styles.phone} selectable numberOfLines={1}>{client.phoneNumber}</Text>
        </View>

        {hasImage && (
          <Pressable
            onPress={regenerate}
            disabled={isRegenerating}
            style={({ pressed }) => [styles.refreshButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={`Régénérer la marque de ${name}`}
            accessibilityState={{ busy: isRegenerating }}
          >
            {isRegenerating ? (
              <ActivityIndicator size="small" color={colors.primary.main} />
            ) : (
              <Ionicons name="refresh-outline" size={20} color={colors.text.secondary} />
            )}
          </Pressable>
        )}
      </View>

      {hasImage ? (
        <View style={styles.actions}>
          <ClientRowAction label="Aperçu" icon="eye-outline" onPress={preview} />
          <ClientRowAction label="Partager" icon="share-outline" onPress={download} />
          <ClientRowAction label="WhatsApp" icon="logo-whatsapp" onPress={send} loading={isSending} primary />
        </View>
      ) : (
        <Pressable
          onPress={regenerate}
          disabled={isRegenerating}
          style={({ pressed }) => [styles.generateButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={`Générer la marque de ${name}`}
          accessibilityState={{ busy: isRegenerating }}
        >
          {isRegenerating ? <ActivityIndicator color={colors.primary.main} /> : <Ionicons name="sparkles-outline" size={20} color={colors.primary.main} />}
          <Text style={styles.generateText}>{isRegenerating ? 'Génération…' : 'Générer la marque'}</Text>
        </Pressable>
      )}
    </View>
  );
});

ClientRow.displayName = 'ClientRow';
