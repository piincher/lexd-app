import { useMemo, useState } from 'react';
import type { Container } from '../../types';
import type { Goods } from '../../../goods/types';
import type { ContainerAssistFilter, ContainerClientDirectory } from './containerAssistTypes';
import {
  buildClientGroups,
  buildContainerHealth,
  buildContainerIssues,
  buildFilterCounts,
  filterGoods,
} from './containerAssistUtils';

interface Options {
  capacityValue: number;
  maxCapacity: number;
  fillPercentage: number;
  isAirContainer: boolean;
}

export const useContainerAssist = (
  container: Container | undefined,
  goodsList: Goods[],
  options: Options,
  clientDirectory?: ContainerClientDirectory,
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ContainerAssistFilter>('ALL');

  const health = useMemo(
    () => buildContainerHealth(
      goodsList,
      options.capacityValue,
      options.maxCapacity,
      options.fillPercentage,
      options.isAirContainer,
      clientDirectory,
    ),
    [clientDirectory, goodsList, options.capacityValue, options.maxCapacity, options.fillPercentage, options.isAirContainer],
  );

  const issues = useMemo(
    () => buildContainerIssues(container, goodsList, health, clientDirectory),
    [clientDirectory, container, goodsList, health],
  );

  const filterCounts = useMemo(
    () => buildFilterCounts(goodsList, clientDirectory),
    [clientDirectory, goodsList],
  );

  const filteredGoods = useMemo(
    () => filterGoods(goodsList, searchQuery, activeFilter, clientDirectory),
    [activeFilter, clientDirectory, goodsList, searchQuery],
  );

  const clientGroups = useMemo(
    () => buildClientGroups(filteredGoods, clientDirectory),
    [clientDirectory, filteredGoods],
  );

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    health,
    issues,
    filterCounts,
    clientGroups,
  };
};
