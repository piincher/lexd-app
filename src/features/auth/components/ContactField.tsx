import { Picker } from '@react-native-picker/picker';
import React from 'react';

import { COLORS } from '@src/constants/Colors';

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
				color: !props.enable ? COLORS.DimGray : COLORS.inputBorder,
			}}
		>
			{details.map((item) => (
				<Picker.Item label={item.dial_code} value={item.dial_code} key={item.dial_code} />
			))}
		</Picker>
	);
};

export default ContactNumberField;
