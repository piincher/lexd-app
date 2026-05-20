import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Platform, Alert, Linking } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';
import { apiClientV2 } from '@src/shared/api/client';
import { captureException } from '@src/shared/lib/sentry';
import {
	logVersionCheckStart,
	logVersionCheckSuccess,
	logVersionCheckFailure,
	logOptionalUpdateShown,
	logUpdateClicked,
	logUpdateDismissed,
} from '@src/features/update/lib/updateAnalytics';

interface ForceUpdateData {
	message: string;
	storeUrl: string;
}

interface UpdateContextValue {
	forceUpdate: boolean;
	forceUpdateData: ForceUpdateData | null;
	setForceUpdateFromApi: (value: boolean) => void;
	setForceUpdateData: (data: ForceUpdateData | null) => void;
}

const UpdateContext = createContext<UpdateContextValue>({
	forceUpdate: false,
	forceUpdateData: null,
	setForceUpdateFromApi: () => {},
	setForceUpdateData: () => {},
});

interface Props {
	children: React.ReactElement;
}

interface VersionCheckResponse {
	forceUpdate: boolean;
	shouldUpdate: boolean;
	message?: string;
	storeUrl?: string;
}

const BACKEND_CHECK_TIMEOUT_MS = 5000;

const UpdateProvider = ({ children }: Props) => {
	const [forceUpdate, setForceUpdate] = useState(false);
	const [forceUpdateData, setForceUpdateData] = useState<ForceUpdateData | null>(null);

	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync();

			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				Alert.alert(
					'Update Available',
					'A new update is ready. Restart now to apply it?',
					[
						{ text: 'Later', style: 'cancel' },
						{ text: 'Restart', onPress: async () => { await Updates.reloadAsync(); } }
					]
				);
			}
		} catch (error) {
			console.log('====================================');
			console.log(`Error fetching latest Expo update: ${error}`);
			console.log('====================================');
		}
	}

	const checkNativeStoreUpdate = () => {
		const inAppUpdates = new SpInAppUpdates(
			false // isDebug
		);
		const version = Application.nativeApplicationVersion;
		// curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
		inAppUpdates.checkNeedsUpdate(version ? { curVersion: version } : undefined).then((result) => {
			if (result.shouldUpdate) {
				let updateOptions: StartUpdateOptions = {};
				if (Platform.OS === 'android') {
					// android only, on iOS the user will be promped to go to your app store page
					updateOptions = {
						updateType: IAUUpdateKind.FLEXIBLE,
					};
				}
				inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
			} else {
				// No play store update. Use
				onFetchUpdateAsync();
			}
		});
	};

	const performBackendVersionCheck = async () => {
		logVersionCheckStart();
		try {
			const version = Application.nativeApplicationVersion;
			const platform = Platform.OS;

			const response = await apiClientV2.get<VersionCheckResponse>(
				`/public/version-check?platform=${platform}&version=${version}`,
				{ timeout: BACKEND_CHECK_TIMEOUT_MS }
			);

			const data = response.data;
			logVersionCheckSuccess({ shouldUpdate: data.shouldUpdate, forceUpdate: data.forceUpdate });

			if (data.forceUpdate) {
				setForceUpdate(true);
				setForceUpdateData({
					message: data.message || 'A new version is required. Please update to continue.',
					storeUrl: data.storeUrl || '',
				});
				return;
			}

			if (data.shouldUpdate) {
				logOptionalUpdateShown();
				Alert.alert(
					'Update Available',
					data.message || 'A new version is available. Please update to continue.',
					[
						{
							text: 'Later',
							style: 'cancel',
							onPress: logUpdateDismissed,
						},
						{
							text: 'Update',
							onPress: () => {
								if (data.storeUrl) {
									logUpdateClicked(data.storeUrl);
									Linking.openURL(data.storeUrl);
								}
							}
						}
					]
				);
				return;
			}

			// Backend says we're up to date — skip native store check
		} catch (error) {
			// Backend check failed: silently fall back to native store check
			logVersionCheckFailure(error as Error);
			captureException(error as Error);
			checkNativeStoreUpdate();
		}
	};

	useEffect(() => {
		// Fire-and-forget backend check; do NOT block rendering
		performBackendVersionCheck();
	}, []);

	const contextValue = useMemo(
		() => ({
			forceUpdate,
			forceUpdateData,
			setForceUpdateFromApi: setForceUpdate,
			setForceUpdateData,
		}),
		[forceUpdate, forceUpdateData]
	);

	return (
		<UpdateContext.Provider value={contextValue}>
			{children}
		</UpdateContext.Provider>
	);
};

const useUpdate = (): UpdateContextValue => {
	const context = useContext(UpdateContext);
	if (!context) {
		throw new Error('useUpdate must be used within an UpdateProvider');
	}
	return context;
};

export { UpdateContext, UpdateProvider, useUpdate };
