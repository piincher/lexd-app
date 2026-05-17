import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useClientInfoCardStyles } from './ClientInfoCard.styles';

interface ClientContactRowProps {
  clientName: string;
  clientPhone?: string;
  onPressPhone?: () => void;
}

export const ClientContactRow: React.FC<ClientContactRowProps> = ({
  clientName,
  clientPhone,
  onPressPhone,
}) => {
  const { colors } = useAppTheme();
  const styles = useClientInfoCardStyles();

  return (
    <View style={styles.clientRow}>
      <MaterialCommunityIcons name="account-circle" size={40} color={colors.text.secondary} />
      <View style={styles.clientInfo}>
        <Text style={styles.clientName}>{clientName || 'Unknown'}</Text>
        {clientPhone && (
          <TouchableOpacity onPress={onPressPhone}>
            <Text style={styles.clientPhone}>{clientPhone}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
