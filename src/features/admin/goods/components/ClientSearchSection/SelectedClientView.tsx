import React from 'react';
import { View } from 'react-native';
import { Avatar, Chip, Text } from 'react-native-paper';
import { userData } from '@src/shared/types/user';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useClientSearchStyles } from './ClientSearchSection.styles';

interface SelectedClientViewProps {
  client: userData;
  onChange: () => void;
}

export const SelectedClientView: React.FC<SelectedClientViewProps> = ({ client, onChange }) => {
  const { colors } = useAppTheme();
  const styles = useClientSearchStyles();

  return (
    <View style={styles.selectedClient}>
      <Avatar.Text
        size={48}
        label={`${client.firstName?.[0] || ''}${client.lastName?.[0] || ''}`}
        style={styles.selectedAvatar}
        color={colors.text.inverse}
      />
      <View style={styles.selectedInfo}>
        <Text style={styles.selectedName}>
          {client.firstName} {client.lastName}
        </Text>
        <Text style={styles.selectedPhone}>{client.phoneNumber}</Text>
        {client.shippingClientId ? (
          <Text style={styles.selectedPhone}>ID client: {client.shippingClientId}</Text>
        ) : null}
      </View>
      <Chip onPress={onChange} style={styles.changeChip} textStyle={styles.changeChipText} mode="outlined">
        Changer
      </Chip>
    </View>
  );
};
