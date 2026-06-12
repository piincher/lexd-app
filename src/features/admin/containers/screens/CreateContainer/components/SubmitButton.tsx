import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SubmitButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  onSubmit: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  isDisabled,
  onSubmit,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={colors.primary[500]}
          size="large"
        />
      ) : (
        <Button
          mode="contained"
          onPress={onSubmit}
          disabled={isDisabled || isLoading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          提交
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.lg,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderRadius: Theme.radius.md,
  },
  buttonContent: {
    paddingVertical: Theme.spacing.sm,
  },
});
