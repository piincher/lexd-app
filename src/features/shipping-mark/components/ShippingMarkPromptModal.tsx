import React from 'react';
import { ConfirmDialog } from '@src/shared/ui/ConfirmDialog';
import type { ShippingMarkPopupConfig } from '../api/shippingMarkApi';

interface ShippingMarkPromptModalProps {
  visible: boolean;
  config?: ShippingMarkPopupConfig;
  onDismiss: () => void;
  onDownload: () => void;
}

export const ShippingMarkPromptModal: React.FC<ShippingMarkPromptModalProps> = ({
  visible,
  config,
  onDismiss,
  onDownload,
}) => {
  if (!config) return null;

  return (
    <ConfirmDialog
      visible={visible}
      title={config.title}
      message={config.message}
      confirmText={config.actionLabel}
      cancelText={config.dismissLabel}
      onConfirm={onDownload}
      onCancel={onDismiss}
    />
  );
};
