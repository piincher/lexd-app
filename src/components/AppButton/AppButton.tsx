import { COLORS } from '@src/constants/Colors';
import React, { FC } from 'react';
import { Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';

interface Props {
	title: string;
	onPress: () => void;
	busy?: boolean;
}

const AppButton: FC<Props> = ({ title, onPress, busy }) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			{busy ? <ActivityIndicator /> : <Text style={styles.title}>{title}</Text>}
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
