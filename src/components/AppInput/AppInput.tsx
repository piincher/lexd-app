import { COLORS } from '@src/constants/Colors';
import React, { FC } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps {}

const AppInput: FC<Props> = (props) => {
	return (
		<Pressable onPress={Keyboard.dismiss}>
			<View>
				<TextInput {...props} style={[styles.input, props.style]} placeholderTextColor={COLORS.black} />
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {},
	input: {
		borderWidth: 1,
		borderColor: COLORS.grey,
		height: 45,
		borderRadius: 25,
		color: COLORS.black,
		padding: 10,
		width: '100%',
	},
});

export default AppInput;
