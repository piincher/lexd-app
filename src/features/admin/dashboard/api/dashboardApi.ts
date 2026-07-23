/**
 * Dashboard API Service
 * Handles admin dashboard-related API calls
 */

import { apiClientV2 } from '@src/api/client';
import type { Goods } from '@src/features/admin/shared/types';
import type {
  OutstandingPaymentItem,
  OutstandingPaymentsData,
  OutstandingPaymentsListData,
  UnassignedGoodsData,
  WorkQueueSourceData,
} from '../types';

const WORK_QUEUE_PAGE_SIZE = 100;
const WORK_QUEUE_MAX_PAGES = 5;

/**
 * Get outstanding payments summary
 * Returns aggregated data about unpaid/partial payments with aging and top clients
 */
export const getOutstandingPayments = async (): Promise<OutstandingPaymentsData> => {
  const response = await apiClientV2.get('/payments/outstanding');
  return response.data.data; // Backend returns { success, data, message, error }
};

/**
 * Get outstanding payments list (paginated)
 * Returns detailed list of all goods/orders with outstanding balance
 */
export const getOutstandingPaymentsList = async (
  page = 1,
  limit = 20,
  status?: string,
  search?: string
): Promise<OutstandingPaymentsListData> => {
  const response = await apiClientV2.get('/payments/outstanding/list', {
    params: { page, limit, status, search },
  });
  return response.data.data;
};

/**
 * Get unassigned goods alert data
 * Returns aggregated data about goods not yet assigned to containers
 */
export const getUnassignedGoods = async (): Promise<UnassignedGoodsData> => {
  const response = await apiClientV2.get('/goods/unassigned/alert');
  return response.data.data; // Backend returns { success, data, message, error }
};

const getWorkQueueGoodsByMode = async (shippingMode: 'AIR' | 'SEA') => {
  const items: Goods[] = [];
  let truncated = false;

  for (let page = 1; page <= WORK_QUEUE_MAX_PAGES; page += 1) {
    const response = await apiClientV2.get('/goods/unassigned', {
      params: { page, limit: WORK_QUEUE_PAGE_SIZE, shippingMode },
    });
    const payload = response.data?.data;
    const goods = (Array.isArray(payload) ? payload : payload?.goods || []) as Goods[];
    items.push(...goods);
    if (goods.length < WORK_QUEUE_PAGE_SIZE) return { items, total: items.length, truncated: false };
    truncated = page === WORK_QUEUE_MAX_PAGES;
  }

  return { items, total: items.length, truncated };
};

export const getWorkQueueGoods = async (): Promise<WorkQueueSourceData<Goods>> => {
  const [air, sea] = await Promise.all([
    getWorkQueueGoodsByMode('AIR'),
    getWorkQueueGoodsByMode('SEA'),
  ]);
  const uniqueItems = Array.from(
    new Map([...air.items, ...sea.items].map((goods) => [goods._id, goods])).values(),
  );

  return {
    items: uniqueItems,
    total: uniqueItems.length,
    truncated: air.truncated || sea.truncated,
  };
};

export const getWorkQueuePayments = async (): Promise<WorkQueueSourceData<OutstandingPaymentItem>> => {
  const firstPage = await getOutstandingPaymentsList(1, WORK_QUEUE_PAGE_SIZE);
  const pageCount = Math.min(firstPage.pagination.pages, WORK_QUEUE_MAX_PAGES);
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) =>
      getOutstandingPaymentsList(index + 2, WORK_QUEUE_PAGE_SIZE),
    ),
  );
  const items = [firstPage, ...remainingPages].flatMap((page) => page.items);

  return {
    items,
    total: firstPage.pagination.total,
    truncated: items.length < firstPage.pagination.total,
  };
};
