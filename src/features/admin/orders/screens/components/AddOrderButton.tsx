import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../AllOrdersScreen.styles';

export const AddOrderButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddOrder' as never)}>
      <MaterialIcons name="add" size={28} color="#FFF" />
    </TouchableOpacity>
  );
};

export default AddOrderButton;
