import { userData, userType } from '../constants/types';
import axiosInstance from './client';
const rootUrl = '/category';
const API_URL = {
	getCategories: `${rootUrl}/categories`,
};

export interface CategoryProps {
	name: string;
	_id: string;
}

export const getCategories = async () => {
	const response = await axiosInstance.get<CategoryProps[]>(API_URL.getCategories);
	return response.data;
};
