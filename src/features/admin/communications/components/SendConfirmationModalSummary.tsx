import { useAppTheme } from '@src/providers/ThemeProvider';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface SendConfirmationModalSummaryProps {
  styles: any;
  recipientCount: number;
  smsCount: number;
}

export const SendConfirmationModalSummary: React.FC<SendConfirmationModalSummaryProps> = ({
  styles,
  recipientCount,
  smsCount,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.summaryBox}>
      <View style={styles.summaryRow}>
        <Ionicons name="people" size={16} color={colors.text.secondary} />
        <Text style={styles.summaryLabel}>Destinataires</Text>
        <Text style={styles.summaryValue}>{recipientCount}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.summaryRow}>
        <Ionicons name="chatbubble-ellipses" size={16} color={colors.text.secondary} />
        <Text style={styles.summaryLabel}>SMS total</Text>
        <Text style={styles.summaryValue}>{smsCount}</Text>
      </View>
    </View>
  );
};
