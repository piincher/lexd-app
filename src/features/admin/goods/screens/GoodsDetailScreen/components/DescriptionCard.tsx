import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import {  createStyles  } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface DescriptionCardProps {
  description?: string;
}

export const DescriptionCard: React.FC<DescriptionCardProps> = ({ description }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  if (!description) return null;

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="text-box-outline" size={20} color={Theme.primary[600]} />
          <Text style={styles.sectionTitle}>Description</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </Card.Content>
    </Card>
  );
};
