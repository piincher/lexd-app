import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './PaymentSection.styles';

interface PaymentAdminNoteProps {
  noteColor: string;
  styles: ReturnType<typeof createStyles>;
}

export const PaymentAdminNote: React.FC<PaymentAdminNoteProps> = ({
  noteColor,
  styles,
}) => (
  <View style={styles.adminNote}>
    <MaterialCommunityIcons name="information" size={16} color={noteColor} />
    <Text style={styles.adminNoteText}>
      Record payments made by clients via cash, bank transfer, or mobile money.
      The client will receive a notification of the recorded payment.
    </Text>
  </View>
);
