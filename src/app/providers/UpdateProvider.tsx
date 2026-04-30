import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
import React, { createContext, useEffect } from 'react';
import { Platform } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';

const UpdateContext = createContext({});
interface Props {
	children: React.ReactElement;
}
const UpdateProvider = ({ children }: Props) => {
	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync();

			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				await Updates.reloadAsync();
			}
		} catch (error) {
			console.log('====================================');
			console.log(`Error fetching latest Expo update: ${error}`);
			console.log('====================================');
		}
	}
	const checkForUpdates = () => {
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
	useEffect(() => {
		checkForUpdates();
	}, []);

	return <UpdateContext.Provider value={{}}>{children}</UpdateContext.Provider>;
};

export { UpdateContext, UpdateProvider };
