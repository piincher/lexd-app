import axiosInstance from './client';
const rootUrl = '/announcement';
const API_URL = {
    getAnoncement: `${rootUrl}/active`,
    addAnoncement: `${rootUrl}/add`,
};

export interface announcementProps {

        _id: string;
        title: string;
        message: string;
        link: string;
        isActive: boolean;
        publishDate: string; // ISO date string
        expirationDate: string; // ISO date string
    
    
}

export const fetchAnnouncement = async () => {
    const response = await axiosInstance.get<announcementProps>(API_URL.getAnoncement);
    return response.data;
};

export const addAnnouncement = async (announcement: announcementProps) => {
    const response = await axiosInstance.post<announcementProps>(API_URL.addAnoncement, announcement);
    return response.data;
};