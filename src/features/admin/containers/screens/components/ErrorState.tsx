import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../../../../shared/ui';
import { styles } from '../ContainerDetailScreen.styles';

interface ErrorStateProps {
  onBack: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onBack }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.centerContent}>
      <Ionicons name="alert-circle" size={64} color={Theme.status.error} />
      <Text style={styles.errorText}>Container non trouvé</Text>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);
