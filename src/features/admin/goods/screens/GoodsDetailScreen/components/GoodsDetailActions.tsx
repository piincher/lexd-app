// GoodsDetailActions - Bottom action buttons

import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@src/constants/Theme';

interface GoodsDetailActionsProps {
  onEdit?: () => void;
  onDelete: () => void;
}

export const GoodsDetailActions: React.FC<GoodsDetailActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.actionButtons}>
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
        textColor={Theme.status.error}
        icon="delete"
      >
        Supprimer
      </Button>
    </View>
  );
};

const styles = {
  actionButtons: {
    flexDirection: 'row' as const,
    gap: 12,
    marginTop: 20,
    marginBottom: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: Theme.primary[600],
    borderRadius: 12,
    elevation: 2,
  },
  deleteButton: {
    flex: 1,
    borderColor: Theme.status.error,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
};
