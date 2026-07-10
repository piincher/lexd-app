import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@src/shared/ui/Button';

interface BulkActionsProps {
  selectedCount: number;
  total?: number;
  onSendSelected: () => void;
  onSendAll: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  total,
  onSendSelected,
  onSendAll,
}) => (
  <View style={styles.container}>
    <Button
      title={`Envoyer WhatsApp (${selectedCount})`}
      icon="logo-whatsapp"
      onPress={onSendSelected}
      disabled={selectedCount === 0}
      style={styles.button}
    />
    <Button
      title={`Envoyer à tous les clients (${total ?? 0})`}
      icon="send"
      variant="outline"
      onPress={onSendAll}
      disabled={!total}
      style={styles.button}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  button: {
    marginBottom: 0,
  },
});
