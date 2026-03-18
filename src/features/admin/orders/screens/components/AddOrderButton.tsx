import React from 'react';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@src/constants/Colors';
import { styles } from './AddOrderButton.styles';

export const AddOrderButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={() => navigation.navigate('AddOrder' as never)}
      color="#FFF"
      label="New Order"
    />
  );
};

export default AddOrderButton;
