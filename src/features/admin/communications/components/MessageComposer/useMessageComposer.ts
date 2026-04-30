import { useState, useMemo } from 'react';
import { SMS_CHAR_LIMIT, SMS_LONG_LIMIT, TEMPLATES, TemplateCategory } from './composerConstants';

interface UseMessageComposerParams {
  message: string;
  recipientCount: number;
  isSending: boolean;
}

export function useMessageComposer({ message, recipientCount, isSending }: UseMessageComposerParams) {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('all');

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const charCount = message.length;
  const smsCount = charCount === 0 ? 0 : Math.ceil(charCount / SMS_CHAR_LIMIT);
  const isOverLimit = charCount > SMS_LONG_LIMIT;
  const canSend = message.trim().length > 0 && recipientCount > 0 && !isSending && !isOverLimit;

  return {
    activeCategory,
    setActiveCategory,
    filteredTemplates,
    charCount,
    smsCount,
    isOverLimit,
    canSend,
  };
}
