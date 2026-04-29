/**
 * VoidGoodsConfirmButton - Confirm void action button
 * SRP: Render confirm void button with loading/disabled states
 */

import React from 'react';
import { Button } from '@src/shared/ui/Button';

interface VoidGoodsConfirmButtonProps {
  onPress: () => void;
  disabled: boolean;
  loading: boolean;
}

export const VoidGoodsConfirmButton: React.FC<VoidGoodsConfirmButtonProps> = ({
  onPress,
  disabled,
  loading,
}) => (
  <Button
    title="Confirm Void"
    onPress={onPress}
    variant="danger"
    size="large"
    fullWidth
    disabled={disabled}
    loading={loading}
  />
);
