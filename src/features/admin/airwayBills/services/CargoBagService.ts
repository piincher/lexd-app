/**
 * CargoBag Service - API interactions for cargo bag management
 */

import { apiClientV2, apiRequest } from '@src/api/client';
import {
  CargoBag,
  CargoBagStatus,
  CreateCargoBagInput,
  UpdateCargoBagInput,
  CargoBagListResponse,
  AirwayBillWaypointPayload,
  UpdateAirwayBillWaypointInput,
} from '../types';

const BASE_URL = '/cargo-bags';

interface CargoBagGoodsResult {
  success: string[];
  failed: { goodsId?: string; error?: string }[];
}

class CargoBagServiceClass {
  private readonly client = apiClientV2;

  async getAll(awbId?: string): Promise<{ data: CargoBagListResponse }> {
    return apiRequest.get(this.client, BASE_URL, { params: { awbId } });
  }

  async getById(id: string): Promise<{ data: { cargoBag: CargoBag } }> {
    return apiRequest.get(this.client, `${BASE_URL}/${id}`);
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

  async create(input: CreateCargoBagInput): Promise<{ data: { cargoBag: CargoBag } }> {
    return apiRequest.post(this.client, BASE_URL, input);
  }

  async update(id: string, input: UpdateCargoBagInput): Promise<{ data: { cargoBag: CargoBag } }> {
    return apiRequest.patch(this.client, `${BASE_URL}/${id}`, input);
  }

  async delete(id: string): Promise<unknown> {
    return apiRequest.delete(this.client, `${BASE_URL}/${id}`);
  }

  async addGoods(id: string, goodsIds: string[]): Promise<{ data: { results: CargoBagGoodsResult; cargoBag: CargoBag } }> {
    return apiRequest.post(this.client, `${BASE_URL}/${id}/goods`, { goodsIds });
  }

  async removeGoods(id: string, goodsId: string): Promise<unknown> {
    return apiRequest.delete(this.client, `${BASE_URL}/${id}/goods/${goodsId}`);
  }

  async updateStatus(id: string, status: CargoBagStatus): Promise<{ data: { cargoBag: CargoBag } }> {
    return apiRequest.patch(this.client, `${BASE_URL}/${id}/status`, { status });
  }
}

export const cargoBagService = new CargoBagServiceClass();
