import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import {  createStyles  } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
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
      textColor={colors.status.error}
      icon="delete"
    >
      Supprimer
    </Button>
  </View>
);
};
