/**
 * PackingListInstructions Component
 * Pickup instructions card
 * SRP: Display pickup instructions
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface PackingListInstructionsProps {
  instructions: string;
}

export const PackingListInstructions: React.FC<PackingListInstructionsProps> = ({
  instructions,
}) => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(() => StyleSheet.create({
    instructionsCard: {
      marginBottom: 16,
      backgroundColor: colors.accent.goldLight,
      borderColor: colors.accent.gold,
      borderWidth: 1,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    sectionTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.accent.goldDark,
      marginLeft: 12,
    },
    sectionDivider: {
      marginBottom: 12,
    },
    instructionsText: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
    },
  }), [colors, isDark]);

  return (
    <Card style={styles.instructionsCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={colors.accent.goldDark}
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
