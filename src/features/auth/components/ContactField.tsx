import { Picker } from '@react-native-picker/picker';
import React from 'react';

import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
	selectedCode: string; //counry code
	setSelectedCode: (args: string) => void;
	code?: { label: string; value: string }[]; //array of counry code
	enable?: boolean;
}
const details = [
	{
		name: 'Mali',
		code: 'ML',
		dial_code: '🇲🇱  +223',
	},
	{
		name: "Côte d'Ivoire",
		code: 'CI',
		dial_code: '🇨🇮  +225',
	},
	{
		name: 'Sénégal',
		code: 'SN',
		dial_code: '🇸🇳  +221',
	},
	{
		name: 'Burkina Faso',
		code: 'BF',
		dial_code: '🇧🇫  +226',
	},
	{
		name: 'Guinée',
		code: 'GN',
		dial_code: '🇬🇳  +224',
	},
	{
		name: 'Togo',
		code: 'TG',
		dial_code: '🇹🇬  +228',
	},
	{
		name: 'Bénin',
		code: 'BJ',
		dial_code: '🇧🇯  +229',
	},
	{
		name: 'Ghana',
		code: 'GH',
		dial_code: '🇬🇭  +233',
	},
	{
		name: 'Chine',
		code: 'CN',
		dial_code: '🇨🇳  +86',
	},
	{
		name: 'France',
		code: 'FR',
		dial_code: '🇫🇷  +33',
	},
];

const ContactNumberField = (props: Props) => {
	const { colors } = useAppTheme();
	return (
		<Picker
			testID='react.picker.test'
			selectedValue={props.selectedCode}
			onValueChange={(itemValue: string, itemIndex: number) => {
				console.log('select picker', itemValue);
				props.setSelectedCode(itemValue);
			}}
			mode='dropdown'
			enabled={!props.enable}
			style={{
				width: '42%',
				alignSelf: 'center',
				color: !props.enable ? colors.text.secondary : colors.text.primary,
			}}
		>
			{details.map((item) => (
				<Picker.Item label={item.dial_code} value={item.dial_code} key={item.dial_code} />
			))}
		</Picker>
	);
};

export default ContactNumberField;
