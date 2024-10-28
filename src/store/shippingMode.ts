import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { create } from 'zustand';
import { PersistStorage, persist } from 'zustand/middleware';

interface shippingMode {
	type: 'air' | 'sea';
	setType: (value: 'air' | 'sea') => void;
}

const storage: PersistStorage<shippingMode> = {
	setItem: async (key, value) => {
		await setItemAsync(key, JSON.stringify(value));
	},
	getItem: async (name) => {
		const value = await getItemAsync(name);
		return value !== null ? JSON.parse(value) : undefined;
	},
	removeItem: async (key) => {
		await deleteItemAsync(key);
	},
};

export const useShippingMode = create(
	persist<shippingMode>(
		(set) => ({
			type: 'air',
			setType: (value) => {
				set(() => ({ type: value }));
			},
		}),
		{
			name: 'shippingMode',
			storage,
		}
	)
);
