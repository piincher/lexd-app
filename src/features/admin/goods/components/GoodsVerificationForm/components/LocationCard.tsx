import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { FormInput } from '../../FormInput';
import type { FormErrors } from './types';

interface LocationCardProps {
  location: string;
  receivedByName: string;
  errors: Pick<FormErrors, 'location' | 'receivedByName'>;
  onChangeField: (field: string, value: string) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  receivedByName,
  errors,
  onChangeField,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.content}>
        <Text style={styles.sectionLabel}>Emplacement</Text>

        <FormInput
          label="Code d'emplacement"
          value={location}
          onChangeText={(value) => onChangeField('location', value.toUpperCase())}
          error={errors.location}
          placeholder="Ex: C3-A12"
          autoCapitalize="characters"
        />

        <Divider style={styles.divider} />

        <FormInput
          label="Reçu par"
          value={receivedByName}
          onChangeText={(value) => onChangeField('receivedByName', value)}
          error={errors.receivedByName}
          placeholder="Nom de la personne qui reçoit"
          autoCapitalize="words"
        />
      </Card.Content>
    </Card>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      borderRadius: 12,
      backgroundColor: colors.background.card,
      marginBottom: 16,
    },
    content: {
      padding: 16,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 16,
      color: colors.text.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    divider: {
      marginVertical: 16,
      backgroundColor: colors.border,
    },
  });
