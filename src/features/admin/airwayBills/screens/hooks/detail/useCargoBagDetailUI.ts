import { useState, useCallback } from 'react';

export const useCargoBagDetailUI = () => {
  const [statusMenuVisible, setStatusMenuVisible] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedRemoveIds, setSelectedRemoveIds] = useState<string[]>([]);

  const toggleRemoveMode = useCallback(() => {
    setRemoveMode((prev) => !prev);
    setSelectedRemoveIds([]);
  }, []);

  const toggleRemoveSelection = useCallback((goodsId: string) => {
    setSelectedRemoveIds((prev) =>
      prev.includes(goodsId) ? prev.filter((id) => id !== goodsId) : [...prev, goodsId]
    );
  }, []);

  return {
    statusMenuVisible,
    setStatusMenuVisible,
    removeMode,
    selectedRemoveIds,
    setRemoveMode,
    setSelectedRemoveIds,
    toggleRemoveMode,
    toggleRemoveSelection,
  };
};
