import { userType } from '@src/constants/types';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { create } from 'zustand';
import { PersistStorage, persist } from 'zustand/middleware';

interface authType {
	user: {
		_id: string;
		firstName: string;
		lastName: string;
		phoneNumber: string;
		role: string;
	};
	token: string;
	streamToken: string;
	setAuth: (user: userType) => void;
	logOut: () => void;
}

export const storage: PersistStorage<authType> = {
	setItem: async (key, value) => {
		await setItemAsync(key, JSON.stringify(value));
	},
	getItem: async (key) => {
		const value = await getItemAsync(key);
		return value !== null ? JSON.parse(value) : undefined;
	},
	removeItem: async (key) => {
		await deleteItemAsync(key);
	},
};

export const useAuth = create<authType>()(
	persist(
		(set) => ({
			user: {
				_id: '',

				firstName: '',
				lastName: '',
				phoneNumber: '',
				role: '',
			},
			token: '',
			streamToken: '',
			setAuth: (user: userType) => {
				set((state) => ({
					...state,
					user: {
						...state.user,
						...user.user,
					},
					token: user.token || state.token,
					streamToken: user.streamToken || state.streamToken,
				}));
			},
			logOut: () => {
				set((state) => ({
					user: {
						firstName: '',
						lastName: '',
						avatar: '',
						role: '',
						phoneNumber: '',
						_id: '',
					},
					token: '',
					streamToken: '',
				}));
			},
		}),
		{
			name: 'auth',
			storage, // Uncomment to enable persistent storage
		}
	)
);
