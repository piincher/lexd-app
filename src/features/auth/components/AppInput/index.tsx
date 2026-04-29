import ContactNumberField from "@src/features/auth/components/ContactField";
import { useAppTheme } from '@src/providers/ThemeProvider';
import React, { FC, useMemo } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, View, Platform } from 'react-native';
import type { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
	selectedCode: string;
	setSelectedCode: (args: string) => {};
	code: [{ label: string; value: string }];
	phone?: boolean;
}

const AppInput: FC<Props> = (props) => {
	const { colors } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
				row: {
					flexDirection: 'row',
					backgroundColor: colors.background.card,
				},
				input: {
					padding: 10,
					flex: 1,
					width: '100%',
					color: colors.text.primary,
				},
			}),
		[colors]
	);

	return (
		<Pressable onPress={Keyboard.dismiss}>
			<View style={styles.row}>
				{Platform.OS === 'android' && props.phone && (
					<ContactNumberField
						code={props.code}
						selectedCode={props.selectedCode}
						setSelectedCode={props.setSelectedCode}
					/>
				)}

				<TextInput
					{...props}
					spellCheck
					style={[styles.input, props.style]}
					placeholderTextColor={colors.text.disabled}
				/>
			</View>
		</Pressable>
	);
};

export default AppInput;
