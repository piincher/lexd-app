import React from 'react';
import type { ShippingMarkGenerationJob } from '../api/shippingMarkAdminApi';
import { ClientSearchBar } from './ClientSearchBar';
import { GenerateShippingMarksAction } from './GenerateShippingMarksAction';
import { ShippingMarksOverview } from './ShippingMarksOverview';

interface ShippingMarksListHeaderProps {
  total: number;
  visibleCount: number;
  readyCount: number;
  page: number;
  pages: number;
  selectedCount: number;
  query?: string;
  job?: ShippingMarkGenerationJob;
  loading: boolean;
  fetching: boolean;
  unavailable: boolean;
  onGenerate: () => void;
  onSearch: (query: string) => void;
  onOpenSettings: () => void;
}

export const ShippingMarksListHeader = (props: ShippingMarksListHeaderProps) => (
  <>
    <ShippingMarksOverview
      total={props.total}
      visibleCount={props.visibleCount}
      readyCount={props.readyCount}
      page={props.page}
      pages={props.pages}
      unavailable={props.unavailable}
      onOpenSettings={props.onOpenSettings}
    />
    <GenerateShippingMarksAction
      count={props.selectedCount || props.total}
      selectedCount={props.selectedCount}
      filtered={Boolean(props.query?.trim())}
      job={props.job}
      loading={props.loading}
      disabled={props.unavailable || props.total === 0}
      onPress={props.onGenerate}
    />
    <ClientSearchBar initialQuery={props.query} onSearch={props.onSearch} loading={props.fetching} />
  </>
);
