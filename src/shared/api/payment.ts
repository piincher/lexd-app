import api from './client';

// Payment Types
export interface PaymentRecord {
	orderId: string;
	amount: number;
	paymentMethod: string;
	referenceNumber?: string;
	notes?: string;
	proofImages?: string[];
	recordedAt: string;
}

export interface PaymentHistory {
	_id: string;
	orderId: string;
	amount: number;
	paymentMethod: string;
	referenceNumber?: string;
	notes?: string;
	recordedBy: string;
	recordedAt: string;
}

/**
 * Record a payment for an order (admin only)
 */
export const recordPayment = async (data: PaymentRecord) => {
	console.log('[API recordPayment] Submitting:', data);

	// Generate idempotency key rounded to the nearest minute
	const minuteTimestamp = Math.floor(Date.now() / 60000) * 60000;
	const idempotencyKey = `${data.orderId}-${data.amount}-${data.paymentMethod}-${minuteTimestamp}`;

	try {
		const response = await api.post<{
			message: string;
			payment: PaymentHistory;
			order: any;
		}>(`/order/payment`, data, {
			headers: { 'X-Idempotency-Key': idempotencyKey },
		});
		console.log('[API recordPayment] Success:', response.data);
		return response.data;
	} catch (error) {
		console.error('[API recordPayment] Error:', error);
		throw error;
	}
};

/**
 * Get payment history for an order
 */
export const getPaymentHistory = async (orderId: string) => {
	const response = await api.get<PaymentHistory[]>(`/order/${orderId}/payments`);
	return response.data;
};

/**
 * Backfill missing PaymentV2 records and receipts for an order (admin only)
 */
export const backfillPayments = async (orderId: string) => {
	const response = await api.post(`/order/${orderId}/backfill-payments`);
	return response.data;
};

/**
 * Sync all order statuses from their linked goods (admin maintenance)
 * POST /order/sync-statuses
 */
export const syncOrderStatuses = async () => {
	const response = await api.post<{
		success: boolean;
		message: string;
		affectedOrders: number;
		updatedCount: number;
		details?: Array<{
			orderId: string;
			orderCode: string;
			oldStatus: string;
			newStatus: string;
			statusChanged: boolean;
		}>;
	}>(`/order/sync-statuses`);
	return response.data;
};
