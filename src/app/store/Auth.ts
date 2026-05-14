import { userType } from '@src/constants/types';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { create } from 'zustand';
import { PersistStorage, persist } from 'zustand/middleware';
import { resetQueryClient } from '@src/shared/lib/queryClient';
import * as EncryptedStorage from '@src/shared/lib/encryptedStorage';
import { apiClientV2 } from '@src/api/client';

interface authType {
	user: {
		_id: string;
		firstName: string;
		lastName: string;
		phoneNumber: string;
		role: string;
	};
	token: string;
	refreshToken: string;
	expiresAt: number | null;
	setAuth: (user: userType) => void;
	logOut: () => Promise<void>;
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
		(set, get) => ({
			user: {
				_id: '',

				firstName: '',
				lastName: '',
				phoneNumber: '',
				role: '',
			},
			token: '',
			refreshToken: '',
			expiresAt: null,
			setAuth: (payload: userType) => {
				set((state) => {
					const accessToken = payload.accessToken || payload.token || state.token;
					const refreshToken = payload.refreshToken || state.refreshToken;
					const expiresAt = payload.expiresIn
						? Date.now() + payload.expiresIn * 1000
						: state.expiresAt;
	
					return {
						...state,
						user: { ...state.user, ...payload.user },
						token: accessToken,
						refreshToken,
						expiresAt,
					};
				});
			},
			logOut: async () => {
				const refreshToken = get().refreshToken;
				if (refreshToken) {
					try {
						await apiClientV2.post('/auth/logout', { refreshToken }, { headers: { skipAuth: 'true' } as any });
					} catch (e) {
						// fire-and-forget
					}
				}
				resetQueryClient();
				await EncryptedStorage.clear();
				set(() => ({
					user: {
						_id: '',
						firstName: '',
						lastName: '',
						phoneNumber: '',
						role: '',
					},
					token: '',
					refreshToken: '',
					expiresAt: null,
				}));
			},
		}),
		{
			name: 'auth',
			storage, // Persistent storage enabled
		}
	)
);
