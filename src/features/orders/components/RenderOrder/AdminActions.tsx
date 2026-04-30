import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useRenderOrderStyles } from './RenderOrder.styles';

interface AdminActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const AdminActions: React.FC<AdminActionsProps> = ({ onEdit, onDelete }) => {
  const { colors } = useAppTheme();
  const styles = useRenderOrderStyles();

  return (
    <View style={styles.adminActions}>
      <Pressable onPress={onEdit} style={styles.adminButton}>
        <AntDesign name="edit" size={20} color={colors.primary.main} />
        <Text style={styles.adminButtonText}>Modifier</Text>
      </Pressable>
      <Pressable onPress={onDelete} style={styles.adminButton}>
        <FontAwesome5 name="trash-alt" size={20} color={colors.status.error} />
        <Text style={styles.adminButtonText}>Supprimer</Text>
      </Pressable>
    </View>
  );
};
