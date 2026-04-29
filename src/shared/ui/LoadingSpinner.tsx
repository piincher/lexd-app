import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const LoadingSpinner = () => {
	const { colors } = useAppTheme();
	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					top: '50%',
					position: 'absolute',
					alignSelf: 'center',
					flex: 1,
				},
			}),
		[colors],
	);
	return (
		<>
			<ActivityIndicator style={styles.container} size={100} color={colors.primary.main} />
		</>
	);
};
