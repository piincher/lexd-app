import { useMemo } from 'react';
import { MOCK_FAQS } from '../api/faqMockData';
import { FAQ_CATEGORY_LABELS } from '../types';
import type { FAQItem, FAQCategoryCount } from '../types';

export function useFAQFallbackData(
  popularApiData: FAQItem[] | undefined,
  categoryApiData: FAQCategoryCount[] | undefined,
  usingFallback: boolean
) {
  const popularFAQs = useMemo(() => {
    if ((popularApiData?.length ?? 0) > 0) return popularApiData ?? [];
    if (usingFallback) return MOCK_FAQS.filter((f) => f.isPopular).map((f) => ({ ...f, _id: f.id }));
    return [];
  }, [popularApiData, usingFallback]);

  const categoryCounts = useMemo(() => {
    if ((categoryApiData?.length ?? 0) > 0) return categoryApiData ?? [];
    if (usingFallback) {
      const counts = new Map<string, number>();
      MOCK_FAQS.forEach((f) => {
        const cat = f.category.toUpperCase();
        counts.set(cat, (counts.get(cat) || 0) + 1);
      });
      return Array.from(counts.entries()).map(([id, count]) => ({
        id,
        label: FAQ_CATEGORY_LABELS[id.toLowerCase() as keyof typeof FAQ_CATEGORY_LABELS] || id,
        count,
      }));
    }
    return [];
  }, [categoryApiData, usingFallback]);

  return { popularFAQs, categoryCounts };
}
