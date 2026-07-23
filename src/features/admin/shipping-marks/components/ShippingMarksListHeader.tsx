import React from 'react';
import type { ShippingMarkGenerationJob } from '../api/shippingMarkAdminApi';
import { ClientSearchBar } from './ClientSearchBar';
import { GenerateShippingMarksAction } from './GenerateShippingMarksAction';
import { ShippingMarksOverview } from './ShippingMarksOverview';
import { SupplierShareGuide } from './SupplierShareGuide';

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
  regenerateLoading: boolean;
  anyLoading: boolean;
  fetching: boolean;
  unavailable: boolean;
  onGenerate: () => void;
  onRegenerate: () => void;
  onSearch: (query: string) => void;
  onOpenSettings: () => void;
  onCreateClient: () => void;
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
    <SupplierShareGuide onCreateClient={props.onCreateClient} />
    <GenerateShippingMarksAction
      mode="missing"
      count={props.selectedCount || props.total}
      selectedCount={props.selectedCount}
      filtered={Boolean(props.query?.trim())}
      job={props.job}
      loading={props.loading}
      disabled={props.unavailable || props.total === 0 || props.anyLoading}
      onPress={props.onGenerate}
    />
    <GenerateShippingMarksAction
      mode="regenerate"
      count={props.selectedCount || props.total}
      selectedCount={props.selectedCount}
      filtered={Boolean(props.query?.trim())}
      job={props.job}
      loading={props.regenerateLoading}
      disabled={props.unavailable || props.total === 0 || props.anyLoading}
      onPress={props.onRegenerate}
    />
    <ClientSearchBar initialQuery={props.query} onSearch={props.onSearch} loading={props.fetching} />
  </>
);
