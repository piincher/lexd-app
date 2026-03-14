import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../../../../../shared/ui';
import { styles } from '../ContainerDetailScreen.styles';

export const LoadingState: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Theme.primary[500]} />
      <Text style={styles.loadingText}>Chargement...</Text>
    </View>
  </SafeAreaView>
);
