import React from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS } from '@src/constants/Colors';
import { styles } from '../ClientPackingListScreen.styles';

export const LoadingState: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>
          Chargement de la liste de colisage...
        </Text>
      </View>
    </SafeAreaView>
  );
};
