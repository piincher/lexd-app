export interface SearchMatch {
  field: string;
  value: string;
}

export interface SearchResultItem {
  _id: string;
  _matches?: SearchMatch[];
  [key: string]: any;
}

export interface SearchResultsProps {
  entity: "goods" | "containers" | "clients" | "all";
  results: {
    goods?: SearchResultItem[];
    containers?: SearchResultItem[];
    clients?: SearchResultItem[];
    consignees?: SearchResultItem[];
    data?: SearchResultItem[];
  };
  isLoading: boolean;
  isError: boolean;
  error?: any;
  onItemPress: (item: SearchResultItem, entity: string) => void;
  onRefresh?: () => void;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  onLoadMore?: () => void;
  emptyMessage?: string;
  highlightQuery?: string;
}
