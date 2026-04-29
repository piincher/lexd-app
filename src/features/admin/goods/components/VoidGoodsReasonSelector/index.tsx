/**
 * VoidGoodsReasonSelector - Reason selection buttons
 * SRP: Render void reason options as selectable buttons
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@src/shared/ui/Button';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './VoidGoodsReasonSelector.styles';

const VOID_REASONS = [
  { key: 'DAMAGED', label: 'Damaged' },
  { key: 'CANCELLED_BY_CLIENT', label: 'Cancelled by Client' },
  { key: 'ADMIN_ERROR', label: 'Admin Error' },
  { key: 'OTHER', label: 'Other' },
];

interface VoidGoodsReasonSelectorProps {
  selectedReason: string | null;
  onSelect: (reason: string) => void;
}

export const VoidGoodsReasonSelector: React.FC<VoidGoodsReasonSelectorProps> = ({
  selectedReason,
  onSelect,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View>
      <Text style={styles.sectionTitle}>Select Reason</Text>
      {VOID_REASONS.map((reason) => (
        <Button
          key={reason.key}
          title={reason.label}
          onPress={() => onSelect(reason.key)}
          variant={selectedReason === reason.key ? 'primary' : 'outline'}
          size="medium"
          fullWidth
          style={styles.reasonButton}
        />
      ))}
    </View>
  );
};
