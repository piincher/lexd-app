import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getStyles } from './ActiveOrderActions.styles';

interface ActiveOrderActionsProps {
  isDelivered: boolean;
  isPending: boolean;
  onUpdateTransiteStatus: () => void;
  onUpdateDeliver: () => void;
  onViewGoods: () => void;
}

export const ActiveOrderActions: React.FC<ActiveOrderActionsProps> = ({
  isDelivered,
  isPending,
  onUpdateTransiteStatus,
  onUpdateDeliver,
  onViewGoods,
}) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.actionsSection}>
      {isDelivered ? (
        <View style={styles.deliveredBanner}>
          <MaterialCommunityIcons name="check-circle" size={24} color={colors.status.success} />
          <Text style={styles.deliveredText}>Le client a récupéré son colis</Text>
        </View>
      ) : (
        <Button
          mode="contained"
          onPress={onUpdateTransiteStatus}
          icon="update"
          style={styles.updateBtn}
          buttonColor={colors.primary.main}
          labelStyle={styles.btnLabel}
        >
          Mettre à jour le statut
        </Button>
      )}

      {!isDelivered && (
        <Button
          mode="contained"
          onPress={onUpdateDeliver}
          icon="package-check"
          style={styles.deliverBtn}
          buttonColor={colors.status.success}
          labelStyle={styles.btnLabel}
          loading={isPending}
          disabled={isPending}
        >
          Marquer comme livré
        </Button>
      )}

      <Button
        mode="outlined"
        onPress={onViewGoods}
        icon="package-variant"
        style={styles.goodsBtn}
        textColor={colors.primary.main}
        labelStyle={styles.btnLabel}
      >
        Voir avec Marchandises
      </Button>
    </View>
  );
};

export default ActiveOrderActions;
