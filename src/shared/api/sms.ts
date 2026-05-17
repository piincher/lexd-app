import api from './client';

interface SendNotificationSmsRequest {
	phoneNumbers: string[];
	message: string;
}

export const fetchSmsBalance = async () => {
	const response = await api.get<any[]>('/order/viewSmsBalance');
	return response.data;
};

export const sendNotificationSms = async (data: SendNotificationSmsRequest) => {
	const response = await api.post<{
		message: string;
	}>('/order/sendNotification', data);

	console.log('response', response.data);
	return response.data;
};
