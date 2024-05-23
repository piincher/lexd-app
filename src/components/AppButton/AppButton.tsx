import { COLORS } from '@src/constants/Colors';
import React, { FC } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface Props {
	title: string;
	onPress: () => void;
}

const AppButton: FC<Props> = ({ title, onPress }) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Text style={styles.title}>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 45,
		backgroundColor: COLORS.Crimson,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 25,
	},
	title: {
		color: COLORS.white,
		fontSize: 18,
	},
});

export default AppButton;
