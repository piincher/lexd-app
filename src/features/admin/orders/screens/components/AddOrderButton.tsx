import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '@src/constants/Colors';
import { styles } from './AddOrderButton.styles';
import { AuthenticatedStackParamList } from '@src/navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export const AddOrderButton: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <FAB
        icon="file-document-outline"
        style={styles.fabManual}
        onPress={() => navigation.navigate('ManualOrder')}
        color="#FFF"
        label="Nouvelle commande"
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddOrder', {
          userId: '',
          clientName: '',
          phoneNumber: '',
          pushTokens: []
        })}
        color="#FFF"
        label="New Order"
      />
    </View>
  );
};

export default AddOrderButton;
