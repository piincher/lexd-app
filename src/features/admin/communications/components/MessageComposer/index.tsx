/**
 * MessageComposer
 * SRP: Message input with character counter, categorized templates, and send button
 */

import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CategoryTabs } from './CategoryTabs';
import { TemplateChips } from './TemplateChips';
import { MessageInput } from './MessageInput';
import { SendButton } from './SendButton';
import { useMessageComposer } from './useMessageComposer';
import { createStyles } from './MessageComposer.styles';

interface MessageComposerProps {
  message: string;
  onMessageChange: (text: string) => void;
  recipientCount: number;
  isSending: boolean;
  onSend: () => void;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  message,
  onMessageChange,
  recipientCount,
  isSending,
  onSend,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const {
    activeCategory,
    setActiveCategory,
    filteredTemplates,
    charCount,
    smsCount,
    isOverLimit,
    canSend,
  } = useMessageComposer({ message, recipientCount, isSending });

  return (
    <View style={styles.container}>
      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <TemplateChips templates={filteredTemplates} onSelectTemplate={onMessageChange} />
      <MessageInput
        message={message}
        onMessageChange={onMessageChange}
        charCount={charCount}
        smsCount={smsCount}
        recipientCount={recipientCount}
        isOverLimit={isOverLimit}
      />
      <SendButton canSend={canSend} isSending={isSending} recipientCount={recipientCount} onSend={onSend} />
    </View>
  );
};
