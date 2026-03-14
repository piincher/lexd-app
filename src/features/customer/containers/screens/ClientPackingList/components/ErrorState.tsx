import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { styles } from '../ClientPackingListScreen.styles';

interface ErrorStateProps {
  onRetry: () => void;
  onBack: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry, onBack }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.centerContent}>
      <Ionicons name="alert-circle" size={64} color={COLORS.Red} />
      <Text style={styles.errorText}>Impossible de charger la liste de colisage</Text>
      <Button mode="contained" onPress={onRetry} style={styles.actionButton}>
        Réessayer
      </Button>
      <Button mode="outlined" onPress={onBack} style={styles.actionButton}>
        Retour
      </Button>
    </View>
  </SafeAreaView>
);
