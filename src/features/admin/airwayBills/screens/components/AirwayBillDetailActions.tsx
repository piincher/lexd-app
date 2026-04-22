import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@src/shared/ui/Button';

interface Props {
  hasGoods: boolean;
  onAssignPress: () => void;
}

export const AirwayBillDetailActions: React.FC<Props> = ({ hasGoods, onAssignPress }) => {
  return (
    <View style={styles.container}>
      <Button
        title={hasGoods ? '+ Assigner plus' : 'Assigner des marchandises'}
        onPress={onAssignPress}
        variant={hasGoods ? 'outline' : 'primary'}
        fullWidth
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
});
