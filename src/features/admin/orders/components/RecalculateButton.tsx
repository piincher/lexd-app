/**
 * RecalculateButton - Button to trigger order recalculation
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@src/shared/ui';
import { lightTheme } from '@src/constants/Theme';

interface RecalculateButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

export const RecalculateButton: React.FC<RecalculateButtonProps> = ({
  onPress,
  isLoading = false,
}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Recalculate Order"
        onPress={onPress}
        variant="primary"
        size="large"
        fullWidth
        loading={isLoading}
        testID="recalculate-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: lightTheme.spacing.lg,
    backgroundColor: lightTheme.colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: lightTheme.colors.neutral[200],
  },
});

export default RecalculateButton;
