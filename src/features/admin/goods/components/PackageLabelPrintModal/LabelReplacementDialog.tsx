import React, { useEffect, useState } from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

interface Props {
  packageCode?: string;
  visible: boolean;
  loading: boolean;
  onDismiss: () => void;
  onConfirm: (reason: string) => void;
}

export const LabelReplacementDialog: React.FC<Props> = ({ packageCode, visible, loading, onDismiss, onConfirm }) => {
  const [reason, setReason] = useState('');
  useEffect(() => { if (visible) setReason(''); }, [visible]);

  return <Portal><Dialog visible={visible} onDismiss={onDismiss}>
    <Dialog.Title>Remplacer {packageCode}</Dialog.Title>
    <Dialog.Content>
      <TextInput mode="outlined" label="Motif (endommagée, perdue…)" value={reason} onChangeText={setReason} maxLength={300} multiline autoFocus />
    </Dialog.Content>
    <Dialog.Actions><Button onPress={onDismiss}>Annuler</Button><Button mode="contained" loading={loading} disabled={reason.trim().length < 3 || loading} onPress={() => onConfirm(reason.trim())}>Révoquer et remplacer</Button></Dialog.Actions>
  </Dialog></Portal>;
};
