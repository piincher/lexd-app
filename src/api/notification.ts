import axiosInstance from './client';
const rootUrl = '/notification';
const API_URL = {
	getNotifications: `${rootUrl}/notifications`,
	updateNotification: `${rootUrl}/notification/update`,
};

export interface NotificationProps {
	_id: string;
	Status: string;
	description: string;
	read: boolean;
	code: string;
}

export const getNotifications = async () => {
	const response = await axiosInstance.get<NotificationProps[]>(API_URL.getNotifications);
	return response.data;
};
export const updateNotification = async (id: string) => {
	const response = await axiosInstance.put<NotificationProps>(`${API_URL.updateNotification}`, { id });
	return response.data;
};
