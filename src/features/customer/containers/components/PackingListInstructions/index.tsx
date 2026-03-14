/**
 * PackingListInstructions Component
 * Pickup instructions card
 * SRP: Display pickup instructions
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './PackingListInstructions.styles';

interface PackingListInstructionsProps {
  instructions: string;
}

export const PackingListInstructions: React.FC<PackingListInstructionsProps> = ({
  instructions,
}) => {
  return (
    <Card style={styles.instructionsCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={COLORS.orange}
          />
          <Text style={styles.sectionTitle}>
            Instructions de Retrait
          </Text>
        </View>
        <Divider style={styles.sectionDivider} />
        <Text style={styles.instructionsText}>
          {instructions}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default PackingListInstructions;
