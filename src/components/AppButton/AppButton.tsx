import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import React, { FC } from 'react';
import { Text, StyleSheet, Pressable, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

interface Props {
	title: string;
	onPress: () => void;
	busy?: boolean;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
}

const AppButton: FC<Props> = ({ title, onPress, busy, style, disabled }) => {
	return (
		<Pressable
			style={[style, styles.container, { backgroundColor: disabled ? COLORS.grey : COLORS.blue }]}
			onPress={onPress}
			disabled={disabled}
		>
			{busy ? <ActivityIndicator /> : <Text style={styles.title}>{title.toUpperCase()}</Text>}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 45,
		backgroundColor: COLORS.blue,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: COLORS.white,
		fontSize: 14,
		fontFamily: Fonts.black,
	},
});

export default AppButton;
