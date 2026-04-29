import { Mixpanel } from 'mixpanel-react-native';

export const initMixpanel = () => {
	const trackAutomaticEvents = false;
	const mixpanel = new Mixpanel('35d3bba02ee4e264ccee8679c8fc6d73', trackAutomaticEvents);
	mixpanel.init();

	return mixpanel;
};
