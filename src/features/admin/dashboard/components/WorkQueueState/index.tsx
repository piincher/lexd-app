import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './WorkQueueState.styles';

interface WorkQueueStateProps {
  variant: 'empty' | 'error';
  onRetry?: () => void;
}

export const WorkQueueState: React.FC<WorkQueueStateProps> = ({ variant, onRetry }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isError = variant === 'error';

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={isError ? 'cloud-alert-outline' : 'check-circle-outline'} size={42} color={isError ? colors.status.error : colors.status.success} />
      <Text style={styles.title}>{isError ? 'File indisponible' : 'Aucune priorité ici'}</Text>
      <Text style={styles.body}>{isError ? 'Vérifiez votre connexion puis réessayez.' : 'Les éléments correspondant à ce filtre sont traités.'}</Text>
      {isError && onRetry ? (
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel="Réessayer de charger la file"
          android_ripple={{ color: colors.text.inverse + '28' }}
        >
          <Text style={styles.buttonText}>Réessayer</Text>
        </Pressable>
      ) : null}
    </View>
  );
};
