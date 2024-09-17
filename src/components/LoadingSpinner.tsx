import { COLORS } from '@src/constants/Colors';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

export const LoadingSpinner = () => {
	return (
		<>
			<ActivityIndicator style={styles.container} size={100} color={COLORS.blue} />
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		top: '50%',
		position: 'absolute',
		alignSelf: 'center',
		flex: 1,
	},
});
