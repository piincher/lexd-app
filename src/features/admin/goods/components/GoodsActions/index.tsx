/**
 * GoodsActions - Action buttons for goods
 * SRP: Display edit and delete action buttons
 */

import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './GoodsActions.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsActionsProps {
  onDelete: () => void;
  onEdit?: () => void;
}

export const GoodsActions: React.FC<GoodsActionsProps> = ({ onDelete, onEdit }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={onEdit || (() => navigation.navigate('AdminGoodsList' as never))}
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
