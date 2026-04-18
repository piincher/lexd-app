import { Picker } from '@react-native-picker/picker';
import React from 'react';

import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
	selectedCode: string; //counry code
	setSelectedCode: (args: string) => {};
	code: [{ label: string; value: string }]; //array of counry code
	enable?: boolean;
}
const details = [
	{
		name: 'Mali',
		code: 'ML',
		dial_code: '🇲🇱  +223',
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
				width: '36%',
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
