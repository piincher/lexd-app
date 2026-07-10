import React from 'react';
import { useShippingMarkPrompt } from '../hooks/useShippingMarkPrompt';
import { ShippingMarkPromptModal } from '../components/ShippingMarkPromptModal';

export const ShippingMarkPromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { visible, config, dismissForever, navigateToShippingMark } = useShippingMarkPrompt();

  return (
    <>
      {children}
      <ShippingMarkPromptModal
        visible={visible}
        config={config}
        onDismiss={dismissForever}
        onDownload={navigateToShippingMark}
      />
    </>
  );
};
