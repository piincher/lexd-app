/**
 * Customer Container API
 * API endpoints for customer-facing container tracking
 */

import { apiClientV2 } from '@src/api/client';
import { ApiResponse, GetMyContainersResponse, GetContainerDetailsResponse, GetContainerForGoodsResponse, GetMyContainersParams, ClientPackingListResponse } from './types';

const axios = apiClientV2;
const BASE_URL = '/customer/containers';

/**
 * Customer Container API client
 */
export const customerContainerApi = {
  /**
   * Get all containers where the current customer has goods
   * @param filters Optional filters for status and shipping mode
   * @returns List of customer containers
   */
  getMyContainers: (filters?: GetMyContainersParams) =>
    axios.get<ApiResponse<GetMyContainersResponse>>(BASE_URL, { params: filters }),

  /**
   * Get detailed information about a specific container
   * @param containerId The container ID
   * @returns Container details with customer's goods
   */
  getContainerDetails: (containerId: string) =>
    axios.get<ApiResponse<GetContainerDetailsResponse>>(`${BASE_URL}/${containerId}`),

  /**
   * Get container information for a specific goods item
   * @param goodsId The goods ID
   * @returns Container details if goods is in a container
   */
  getContainerForGoods: (goodsId: string) =>
    axios.get<ApiResponse<GetContainerForGoodsResponse>>(`/customer/goods/${goodsId}/container`),

  /**
   * Get client's packing list for a specific container
   * Shows only the client's goods with consignee info and pickup details
   * @param containerId The container ID
   * @returns Client packing list with goods, consignee, and tracking info
   */
  getMyPackingList: (containerId: string) =>
    axios.get<ApiResponse<ClientPackingListResponse>>(`${BASE_URL}/${containerId}/packing-list`),

  /**
   * Download client's packing list as PDF
   * @param containerId The container ID
   * @returns PDF blob
   */
  downloadPackingListPDF: (containerId: string) =>
    axios.get(`${BASE_URL}/${containerId}/packing-list/pdf`, { 
      responseType: 'blob' 
    }),
};

export default customerContainerApi;
