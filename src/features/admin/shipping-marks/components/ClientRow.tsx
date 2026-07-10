import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Checkbox } from '@src/shared/ui/Checkbox';
import { Button } from '@src/shared/ui/Button';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ShippingMarkClient } from '../api/shippingMarkAdminApi';

interface ClientRowProps {
  client: ShippingMarkClient;
  selected: boolean;
  onToggle: () => void;
  onPreview: () => void;
  onDownload: () => void;
  onSend: () => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
  isSending: boolean;
}

export const ClientRow: React.FC<ClientRowProps> = ({
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
  const { colors } = useAppTheme();
  const name = `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.phoneNumber;

  return (
    <View style={[styles.row, { backgroundColor: colors.background.paper }]}>
      <Checkbox checked={selected} onPress={onToggle} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text.primary }]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[styles.meta, { color: colors.text.secondary }]}>
          {client.clientId} • {client.phoneNumber}
        </Text>
      </View>
      <Pressable onPress={onPreview} disabled={!client.shippingMarkImageUrl}>
        {client.shippingMarkImageUrl ? (
          <Image source={{ uri: client.shippingMarkImageUrl }} style={styles.thumb} />
        ) : (
          <View style={[styles.emptyThumb, { borderColor: colors.border }]}>
            <Text style={[styles.emptyThumbText, { color: colors.text.secondary }]}>—</Text>
          </View>
        )}
      </Pressable>
      <View style={styles.actions}>
        <Button title="Voir" variant="outline" size="small" onPress={onPreview} disabled={!client.shippingMarkImageUrl} />
        <Button
          title="Télécharger"
          variant="outline"
          size="small"
          onPress={onDownload}
          disabled={!client.shippingMarkImageUrl}
        />
        <Button
          title="WhatsApp"
          size="small"
          onPress={onSend}
          disabled={!client.shippingMarkImageUrl || isSending}
          loading={isSending}
        />
        <Button
          title="Régénérer"
          variant="secondary"
          size="small"
          onPress={onRegenerate}
          loading={isRegenerating}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  meta: {
    fontSize: 12,
    marginTop: 2,
  },
  thumb: {
    width: 48,
    height: 32,
    borderRadius: 4,
  },
  emptyThumb: {
    width: 48,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyThumbText: {
    fontSize: 16,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 6,
    maxWidth: 330,
  },
});
