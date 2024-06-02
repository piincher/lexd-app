import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import React, { FC, forwardRef } from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
	ref: any;
}

const OTPField = forwardRef<TextInput, Props>((props, ref) => (
	<TextInput {...props} ref={ref} style={[styles.input, props.style]} placeholderTextColor={COLORS.success} />
));

const styles = StyleSheet.create({
	container: {},
	input: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderColor: COLORS.success,
		borderWidth: 2,
		textAlign: 'center',
		color: COLORS.placeHolder,
		fontSize: 18,
		fontWeight: 'bold',
		fontFamily: Fonts.black,
	},
});

export default OTPField;
