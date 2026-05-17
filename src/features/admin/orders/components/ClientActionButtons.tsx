import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useClientInfoCardStyles } from './ClientInfoCard.styles';

interface ClientActionButtonsProps {
  clientPhone?: string;
  onCall: () => void;
  onWhatsApp: () => void;
}

export const ClientActionButtons: React.FC<ClientActionButtonsProps> = ({
  clientPhone,
  onCall,
  onWhatsApp,
}) => {
  const { colors } = useAppTheme();
  const styles = useClientInfoCardStyles();

  if (!clientPhone) return null;

  return (
    <View style={styles.clientActions}>
      <Button
        mode="outlined"
        onPress={onCall}
        style={styles.actionButton}
        icon="phone"
        textColor={colors.primary.main}
      >
        Call
      </Button>
      <Button
        mode="contained"
        onPress={onWhatsApp}
        style={[styles.actionButton, styles.whatsappButton]}
        buttonColor={colors.status.success}
        icon="whatsapp"
      >
        WhatsApp
      </Button>
    </View>
  );
};
