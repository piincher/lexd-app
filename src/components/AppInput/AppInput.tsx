import { COLORS } from '@src/constants/Colors';
import ContactNumberField from '@src/screens/Auth/Login/components/ContactField';
import React, { FC } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, TextInputProps, View, Text } from 'react-native';

interface Props extends TextInputProps {
	selectedCode: string;
	setSelectedCode: (args: string) => {};
	code: [{ label: string; value: string }];
	phone?: boolean;
}

const AppInput: FC<Props> = (props) => {
	return (
		<>
			<Pressable onPress={Keyboard.dismiss}>
				<View style={{ flexDirection: 'row', backgroundColor: COLORS.white }}>
					{props.phone && (
						<ContactNumberField
							code={props.code}
							selectedCode={props.selectedCode}
							setSelectedCode={props.setSelectedCode}
						/>
					)}

					<TextInput {...props} style={[styles.input, props.style]} placeholderTextColor={COLORS.black} />
				</View>
			</Pressable>
		</>
	);
};

const styles = StyleSheet.create({
	container: {},
	input: {
		// height: 50,
		// padding: 10,
		// flex: 1,
		// borderRightColor: COLORS.lightCrimson,
	},
});

export default AppInput;
