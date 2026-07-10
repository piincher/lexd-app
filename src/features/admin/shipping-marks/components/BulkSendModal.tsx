import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomModal } from '@src/shared/ui/Modal';
import { Input } from '@src/shared/ui/Input';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface BulkSendModalProps {
  visible: boolean;
  count: number;
  onClose: () => void;
  onSend: (caption: string) => void;
  isSending: boolean;
}

export const BulkSendModal: React.FC<BulkSendModalProps> = ({
  visible,
  count,
  onClose,
  onSend,
  isSending,
}) => {
  const { colors } = useAppTheme();
  const [caption, setCaption] = useState(
    "Bonjour {{name}}, voici votre marque d'expédition. Merci de la faire imprimer et coller sur vos colis.",
  );

  const handleConfirm = () => {
    if (isSending) return;
    onSend(caption);
  };

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Envoyer par WhatsApp"
      message={`Envoyer la marque d'expédition à ${count} client(s).`}
      confirmText={isSending ? 'Envoi...' : 'Envoyer'}
      cancelText="Annuler"
    >
      <View style={styles.container}>
        <Text style={[styles.label, { color: colors.text.secondary }]}>
          Message ({'{{name}}'} sera remplacé par le nom du client)
        </Text>
        <Input
          value={caption}
          onChangeText={setCaption}
          multiline
          numberOfLines={3}
          containerStyle={styles.input}
        />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    minHeight: 80,
  },
});
