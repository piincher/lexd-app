/**
 * Admin Event API — CRUD for the Event Engine.
 * Base path: /api/v2/events (admin only).
 */

import { apiClientV2, apiRequest, uploadFile } from '@src/api/client';
import { ApiResponse } from '@src/shared/types/api';
import {
  AdminEvent,
  CreateEventInput,
  UpdateEventInput,
  EventListFilters,
  EventListResult,
} from './types';

const BASE_URL = '/events';

export class EventAdminService {
  private static instance: EventAdminService;
  private readonly client = apiClientV2;

  private constructor() {}

  static getInstance(): EventAdminService {
    if (!EventAdminService.instance) {
      EventAdminService.instance = new EventAdminService();
    }
    return EventAdminService.instance;
  }

  async getEvents(filters?: EventListFilters): Promise<ApiResponse<EventListResult>> {
    return apiRequest.get(this.client, BASE_URL, { params: filters });
  }

  async getEventById(id: string): Promise<ApiResponse<AdminEvent>> {
    return apiRequest.get(this.client, `${BASE_URL}/${id}`);
  }

  async createEvent(data: CreateEventInput): Promise<ApiResponse<AdminEvent>> {
    return apiRequest.post(this.client, BASE_URL, data);
  }

  async updateEvent(id: string, data: UpdateEventInput): Promise<ApiResponse<AdminEvent>> {
    return apiRequest.put(this.client, `${BASE_URL}/${id}`, data);
  }

  async deleteEvent(id: string): Promise<ApiResponse<void>> {
    return apiRequest.delete(this.client, `${BASE_URL}/${id}`);
  }

  async uploadEventBanner(uri: string): Promise<string> {
    const formData = new FormData();
    formData.append('images', {
      uri,
      name: `event_banner_${Date.now()}.jpg`,
      type: 'image/jpeg',
    } as unknown as Blob);

    const response = await uploadFile<{ urls: string[] }>(
      this.client,
      '/admin/upload-images?folder=events',
      formData,
    );

    return response.data.urls[0];
  }
}

export const eventAdminService = EventAdminService.getInstance();
