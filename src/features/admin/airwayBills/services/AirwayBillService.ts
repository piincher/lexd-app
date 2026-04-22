/**
 * AirwayBill Service - API interactions for airway bill management
 */

import { apiClientV2, apiRequest } from '@src/api/client';
import {
  AirwayBill,
  AirwayBillFilters,
  CreateAirwayBillInput,
  UpdateAirwayBillInput,
  AssignGoodsInput,
  PaginatedAirwayBillsResponse,
  AirwayBillConsignee,
  AirwayBillWaypointPayload,
  UpdateAirwayBillWaypointInput,
} from '../types';

const BASE_URL = '/airway-bills';
const CONSIGNEES_URL = '/consignees';

interface ConsigneeListResponse {
  consignees?: AirwayBillConsignee[];
}

class AirwayBillServiceClass {
  private readonly client = apiClientV2;

  async getAll(filters?: AirwayBillFilters): Promise<{ data: PaginatedAirwayBillsResponse }> {
    return apiRequest.get(this.client, BASE_URL, { params: filters });
  }

  async getById(id: string): Promise<{ data: { airwayBill: AirwayBill } }> {
    return apiRequest.get(this.client, `${BASE_URL}/${id}`);
  }

  async create(input: CreateAirwayBillInput): Promise<{ data: { airwayBill: AirwayBill } }> {
    return apiRequest.post(this.client, BASE_URL, input);
  }

  async searchConsignees(search: string): Promise<{ data: AirwayBillConsignee[] | ConsigneeListResponse }> {
    const params = {
      isActive: true,
      page: 1,
      limit: 20,
      ...(search.trim().length >= 2 ? { search: search.trim() } : {}),
    };
    return apiRequest.get(this.client, CONSIGNEES_URL, { params });
  }

  async update(id: string, input: UpdateAirwayBillInput): Promise<{ data: { airwayBill: AirwayBill } }> {
    return apiRequest.patch(this.client, `${BASE_URL}/${id}`, input);
  }

  async delete(id: string): Promise<any> {
    return apiRequest.delete(this.client, `${BASE_URL}/${id}`);
  }

  async updateStatus(id: string, status: string): Promise<{ data: { airwayBill: AirwayBill } }> {
    return apiRequest.patch(this.client, `${BASE_URL}/${id}/status`, { status });
  }

  async getWaypoints(id: string): Promise<{ data: AirwayBillWaypointPayload }> {
    return apiRequest.get(this.client, `${BASE_URL}/${id}/waypoints`);
  }

  async initializeWaypoints(id: string): Promise<{ data: AirwayBillWaypointPayload }> {
    return apiRequest.post(this.client, `${BASE_URL}/${id}/waypoints/initialize`, {});
  }

  async updateWaypoint(
    id: string,
    waypointIndex: number,
    input: UpdateAirwayBillWaypointInput
  ): Promise<{ data: AirwayBillWaypointPayload }> {
    return apiRequest.patch(this.client, `${BASE_URL}/${id}/waypoints/${waypointIndex}`, input);
  }

  async assignGoods(id: string, input: AssignGoodsInput): Promise<any> {
    return apiRequest.post(this.client, `${BASE_URL}/${id}/goods`, input);
  }

  async removeGoods(id: string, goodsId: string): Promise<any> {
    return apiRequest.delete(this.client, `${BASE_URL}/${id}/goods/${goodsId}`);
  }

  async getUnassignedGoods(): Promise<{ data: { goods: any[]; count: number } }> {
    return apiRequest.get(this.client, `${BASE_URL}/unassigned-goods`);
  }
}

export const airwayBillService = new AirwayBillServiceClass();
