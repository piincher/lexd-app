import { heightPercentageToDP as HDP, widthPercentageToDP as WDP } from 'react-native-responsive-screen';

export const WIDTHTODP = (number: number) => {
	return WDP((number / 360) * 100 + '%');
};
export const HEIGHTTODP = (number: number) => {
	return HDP((number / 640) * 100 + '%');
};

export const SCREEN_WIDTH = WDP('100%');

export const LIMIT = 5;
