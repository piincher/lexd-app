import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { create } from 'zustand';
import { PersistStorage, persist } from 'zustand/middleware';

interface AppLaunchType {
	isAppLaunchFirst: boolean | null;
	hasHydrated: boolean;
	setIsAppLaunchFirst: (value: boolean) => void;
	setHasHydrated: (value: boolean) => void;
}

const storage: PersistStorage<AppLaunchType> = {
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

export const useAppLaunchStore = create(
	persist<AppLaunchType>(
		(set) => ({
			isAppLaunchFirst: true,
			hasHydrated: false,
			setIsAppLaunchFirst: (value) => {
				set(() => ({ isAppLaunchFirst: value }));
			},
			setHasHydrated: (value) => {
				set(() => ({ hasHydrated: value }));
			},
		}),
		{
			name: 'AppFirstLaunch',
			storage,
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		}
	)
);
