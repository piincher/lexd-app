import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import AppButton from '@src/components/AppButton/AppButton';

interface ActiveOrdersErrorStateProps {
   onRetry: () => void;
}

export const ActiveOrdersErrorState: React.FC<ActiveOrdersErrorStateProps> = ({
   onRetry,
}) => {
   return (
      <View style={styles.container}>
         <Text>Erreur lors du chargement des commandes actives</Text>
         <AppButton title="Actualiser" onPress={onRetry} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
});
