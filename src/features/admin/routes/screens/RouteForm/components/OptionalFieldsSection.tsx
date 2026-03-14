import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Divider, Switch } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface OptionalFieldsSectionProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  isActive: boolean;
  onIsActiveChange: (value: boolean) => void;
}

export const OptionalFieldsSection: React.FC<OptionalFieldsSectionProps> = ({
  description,
  onDescriptionChange,
  isActive,
  onIsActiveChange,
}) => {
  return (
    <View style={styles.optionalSection}>
      <Divider style={styles.divider} />
      <Text style={styles.optionalSectionTitle}>Informations optionnelles</Text>

      {/* Description */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          mode="outlined"
          value={description}
          onChangeText={onDescriptionChange}
          placeholder="Description de la route..."
          style={[styles.input, styles.multilineInput]}
          outlineColor={Theme.neutral[200]}
          activeOutlineColor={Theme.primary[500]}
          left={<TextInput.Icon icon="text" />}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Is Active Toggle */}
      <View style={styles.toggleContainer}>
        <View style={styles.toggleInfo}>
          <Text style={styles.toggleLabel}>Route active</Text>
          <Text style={styles.toggleDescription}>
            Les routes inactives ne seront pas proposées lors de la création de commandes
          </Text>
        </View>
        <Switch
          value={isActive}
          onValueChange={onIsActiveChange}
          color={Theme.primary[500]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  optionalSection: {},
  divider: {
    marginVertical: Theme.spacing.lg,
    backgroundColor: Theme.neutral[200],
  },
  optionalSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.lg,
  },
  inputContainer: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  input: {
    backgroundColor: Theme.neutral.white,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
  },
  toggleInfo: {
    flex: 1,
    marginRight: Theme.spacing.md,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  toggleDescription: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
    marginTop: 2,
  },
});
