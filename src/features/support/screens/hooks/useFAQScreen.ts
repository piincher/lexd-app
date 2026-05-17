import { useCallback } from 'react';
import { useFAQ } from '../../hooks/useFAQ';

export const useFAQScreen = () => {
  const {
    filteredData,
    isLoading,
    filter,
    setSearchQuery,
    setCategory,
    categories,
  } = useFAQ();

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  return {
    filteredData,
    isLoading,
    filter,
    categories,
    handlers: {
      setSearchQuery,
      setCategory,
      handleClearSearch,
    },
  };
};
