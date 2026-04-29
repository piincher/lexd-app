/**
 * TrackOrderSearchForm Component
 * Search input and track button for order tracking
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '@src/shared/ui/Input';
import { Button } from '@src/shared/ui/Button';
import { Card } from '@src/shared/ui/Card';
import { Theme } from '@src/constants/Theme';

interface TrackOrderSearchFormProps {
  orderCode: string;
  onOrderCodeChange: (code: string) => void;
  onTrack: () => void;
  isLoading: boolean;
}

export const TrackOrderSearchForm: React.FC<TrackOrderSearchFormProps> = ({
  orderCode,
  onOrderCodeChange,
  onTrack,
  isLoading,
}) => {
  return (
    <Card style={styles.inputCard}>
      <Input
        label="Code de commande"
        placeholder="Entrez votre code de suivi"
        value={orderCode}
        onChangeText={onOrderCodeChange}
        autoCapitalize="characters"
      />
      <Button
        title="Suivre"
        onPress={onTrack}
        loading={isLoading}
        disabled={!orderCode.trim() || isLoading}
        fullWidth
        style={styles.trackButton}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  inputCard: {
    marginBottom: Theme.spacing.lg,
  },
  trackButton: {
    marginTop: Theme.spacing.md,
  },
});
