import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import type { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
	ref: any;
	onInputFocus?: () => void;
}

const OTPField = forwardRef<TextInput, Props>((props, ref) => {
	const { onInputFocus, ...rest } = props;
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
			{...rest}
			ref={ref}
			style={[styles.input, props.style]}
			placeholderTextColor={colors.text.disabled}
			onFocus={onInputFocus}
		/>
	);
});

export default OTPField;
