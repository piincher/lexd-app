import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGoodsFormStyles } from './GoodsForm.styles';

interface FormSectionProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ icon, title, children }) => {
  const styles = useGoodsFormStyles();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name={icon as any} size={20} color="#16A34A" />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {children}
      </Card.Content>
    </Card>
  );
};
