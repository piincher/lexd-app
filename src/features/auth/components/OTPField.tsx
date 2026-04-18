import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
	ref: any;
}

const OTPField = forwardRef<TextInput, Props>((props, ref) => {
	const { colors, isDark } = useAppTheme();
	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {},
				input: {
					width: 50,
					height: 50,
					borderRadius: 25,
					borderColor: colors.status.success,
					borderWidth: 2,
					textAlign: 'center',
					color: colors.text.primary,
					fontSize: 18,
					fontWeight: 'bold',
					fontFamily: Fonts.black,
				},
			}),
		[colors, isDark],
	);

	return (
		<TextInput
			{...props}
			ref={ref}
			style={[styles.input, props.style]}
			placeholderTextColor={colors.text.disabled}
		/>
	);
});

export default OTPField;
