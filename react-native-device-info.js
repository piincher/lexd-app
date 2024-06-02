import * as Application from 'expo-application';
import Constants from 'expo-constants';

export default {
	getVersion: () => {
		return Constants.expoConfig?.version;
	},
	getBundleId: () => {
		return Application.applicationId;
	},
};
