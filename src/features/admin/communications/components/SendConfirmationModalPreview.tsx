import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface SendConfirmationModalPreviewProps {
  styles: any;
  messagePreview: string;
}

export const SendConfirmationModalPreview: React.FC<SendConfirmationModalPreviewProps> = ({
  styles,
  messagePreview,
}) => (
  <View style={styles.previewBox}>
    <Text style={styles.previewLabel}>Apercu du message :</Text>
    <Text style={styles.previewText} numberOfLines={3}>
      {messagePreview}
    </Text>
  </View>
);
