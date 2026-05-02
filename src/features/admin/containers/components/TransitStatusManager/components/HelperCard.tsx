import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './NonTransitView.styles';

export const HelperCard: React.FC = () => {
  return (
    <Card style={styles.helperCard}>
      <Card.Content>
        <View style={styles.helperHeader}>
          <Ionicons name="navigate-outline" size={20} color={Theme.neutral[500]} />
          <Text style={styles.helperTitle}>Prochaine étape</Text>
        </View>
        <Text style={styles.helperText}>
          Une fois le conteneur en transit, vous pourrez suivre sa progression
          à travers chaque waypoint et recevoir des mises à jour en temps réel.
        </Text>
      </Card.Content>
    </Card>
  );
};

export default HelperCard;
