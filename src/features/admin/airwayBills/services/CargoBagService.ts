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
} from '../types';

const BASE_URL = '/cargo-bags';

class CargoBagServiceClass {
  private readonly client = apiClientV2;

  async getAll(awbId?: string): Promise<{ data: CargoBagListResponse }> {
    return apiRequest.get(this.client, BASE_URL, { params: { awbId } });
  }

  async getById(id: string): Promise<{ data: { cargoBag: CargoBag } }> {
    return apiRequest.get(this.client, `${BASE_URL}/${id}`);
  }

  async create(input: CreateCargoBagInput): Promise<{ data: { cargoBag: CargoBag } }> {
    return apiRequest.post(this.client, BASE_URL, input);
  }

  async update(id: string, input: UpdateCargoBagInput): Promise<{ data: { cargoBag: CargoBag } }> {
    return apiRequest.patch(this.client, `${BASE_URL}/${id}`, input);
  }

  async delete(id: string): Promise<any> {
    return apiRequest.delete(this.client, `${BASE_URL}/${id}`);
  }

  async addGoods(id: string, goodsIds: string[]): Promise<{ data: { results: any; cargoBag: CargoBag } }> {
    return apiRequest.post(this.client, `${BASE_URL}/${id}/goods`, { goodsIds });
  }

  async removeGoods(id: string, goodsId: string): Promise<any> {
    return apiRequest.delete(this.client, `${BASE_URL}/${id}/goods/${goodsId}`);
  }

  async updateStatus(id: string, status: CargoBagStatus): Promise<{ data: { cargoBag: CargoBag } }> {
    return apiRequest.patch(this.client, `${BASE_URL}/${id}/status`, { status });
  }
}

export const cargoBagService = new CargoBagServiceClass();
