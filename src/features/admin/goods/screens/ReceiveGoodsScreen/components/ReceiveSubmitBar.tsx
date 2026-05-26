import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

interface ReceiveSubmitBarProps {
  isSubmitting: boolean;
  onSubmitAndNext: () => void;
  onSubmit: () => void;
}

export const ReceiveSubmitBar: React.FC<ReceiveSubmitBarProps> = ({
  isSubmitting,
  onSubmitAndNext,
  onSubmit,
}) => (
  <View style={styles.buttonGroup}>
    <Button
      mode="outlined"
      onPress={onSubmitAndNext}
      style={styles.secondaryButton}
      contentStyle={styles.submitButtonContent}
      loading={isSubmitting}
      disabled={isSubmitting}
      icon="plus"
    >
      Enregistrer & suivant
    </Button>
    <Button
      mode="contained"
      onPress={onSubmit}
      style={styles.submitButton}
      contentStyle={styles.submitButtonContent}
      loading={isSubmitting}
      disabled={isSubmitting}
      icon="check"
    >
      {isSubmitting ? 'Enregistrement...' : 'Enregistrer & terminer'}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  buttonGroup: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16, gap: 10 },
  secondaryButton: { borderRadius: 8 },
  submitButton: { borderRadius: 8 },
  submitButtonContent: { paddingVertical: 8 },
});
