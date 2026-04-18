/**
 * Ticket API
 * API endpoints for customer support tickets
 */

import { apiClientV2, uploadFile } from '@src/api/client';
import { ApiResponse, GetTicketsResponse, GetTicketResponse, CreateTicketRequest, CreateTicketResponse, AddMessageRequest, AddMessageResponse, RateTicketRequest, RateTicketResponse, UploadAttachmentResponse } from './types';

const axios = apiClientV2;
const BASE_URL = '/tickets';

/**
 * Ticket API client
 */
export const ticketApi = {
  /**
   * Get all tickets for the current customer
   * @param status Optional status filter
   * @returns List of tickets
   */
  getTickets: (status?: string) =>
    axios.get<ApiResponse<GetTicketsResponse>>(BASE_URL, {
      params: status && status !== 'ALL' ? { status } : undefined,
    }),

  /**
   * Get a specific ticket by ID
   * @param id The ticket ID
   * @returns Ticket details
   */
  getTicketById: (id: string) =>
    axios.get<ApiResponse<GetTicketResponse>>(`${BASE_URL}/${id}`),

  /**
   * Create a new support ticket
   * @param data The ticket data
   * @returns The created ticket
   */
  createTicket: (data: CreateTicketRequest) =>
    axios.post<ApiResponse<CreateTicketResponse>>(BASE_URL, data),

  /**
   * Add a message to a ticket
   * @param id The ticket ID
   * @param message The message text
   * @returns The created message
   */
  addMessage: (id: string, message: string) =>
    axios.post<ApiResponse<AddMessageResponse>>(`${BASE_URL}/${id}/messages`, {
      message,
    } as AddMessageRequest),

  /**
   * Rate a resolved ticket
   * @param id The ticket ID
   * @param rating The rating (1-5)
   * @returns The updated ticket
   */
  rateTicket: (id: string, rating: number) =>
    axios.post<ApiResponse<RateTicketResponse>>(`${BASE_URL}/${id}/rate`, {
      rating,
    } as RateTicketRequest),

  /**
   * Upload an attachment for a ticket
   * @param file The file to upload
   * @param onProgress Optional progress callback
   * @returns The uploaded file URL
   */
  uploadAttachment: (file: { uri: string; name: string; type: string }, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as unknown as Blob);

    return uploadFile<UploadAttachmentResponse>(
      axios,
      `${BASE_URL}/attachments`,
      formData,
      onProgress
    );
  },
};

export default ticketApi;
