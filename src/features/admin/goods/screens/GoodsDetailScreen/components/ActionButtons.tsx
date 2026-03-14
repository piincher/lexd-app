import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { styles } from '../GoodsDetailScreen.styles';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => (
  <View style={styles.actionButtons}>
    <Button
      mode="contained"
      onPress={onEdit}
      style={styles.editButton}
      contentStyle={styles.buttonContent}
      icon="pencil"
    >
      Modifier
    </Button>
    <Button
      mode="outlined"
      onPress={onDelete}
      style={styles.deleteButton}
      contentStyle={styles.buttonContent}
      textColor={Theme.status.error}
      icon="delete"
    >
      Supprimer
    </Button>
  </View>
);
