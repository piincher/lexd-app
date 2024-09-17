import { userData, userType } from '../constants/types';
import axiosInstance from './client';
const rootUrl = '/notification';
const API_URL = {
	getNotifications: `${rootUrl}/notifications`,
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
