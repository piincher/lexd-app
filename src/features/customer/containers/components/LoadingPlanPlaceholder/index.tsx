import React from 'react';
import { View } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useLoadingPlanPlaceholderStyles } from './LoadingPlanPlaceholder.styles';

export const LoadingPlanPlaceholder: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useLoadingPlanPlaceholderStyles();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="truck-delivery"
            size={64}
            color={colors.primary.main}
          />
        </View>
        <Text style={styles.title}>Fonctionnalité à venir</Text>
        <Divider style={styles.divider} />
        <Text style={styles.description}>
          Le plan de chargement détaillé sera bientôt disponible.{'\n\n'}
          Cette fonctionnalité vous permettra de voir :{'\n'}
          • Votre position dans la séquence de chargement{'\n'}
          • La section du conteneur où vos marchandises seront placées{'\n'}
          • L'ordre de chargement de vos articles
        </Text>
      </Card.Content>
    </Card>
  );
};
