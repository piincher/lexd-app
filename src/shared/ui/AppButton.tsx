import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import React, { FC, useMemo } from 'react';
import { Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

interface Props {
	title: string;
	onPress: () => void;
	busy?: boolean;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
	background?: string;
}

const AppButton: FC<Props> = ({ title, onPress, busy, style, disabled, background }) => {
	const { colors } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					width: '100%',
					minHeight: 48,
					borderRadius: 12,
					backgroundColor: colors.primary.main,
					alignItems: 'center',
					justifyContent: 'center',
				},
				title: {
					color: colors.text.inverse,
					fontSize: 14,
					fontFamily: Fonts.black,
				},
			}),
		[colors]
	);

	return (
		<Pressable
			style={[
				style,
				styles.container,
				{ backgroundColor: disabled ? colors.action.disabledBackground : background || colors.primary.main },
			]}
			onPress={onPress}
			disabled={disabled}
		>
			{busy ? <ActivityIndicator /> : <Text style={styles.title}>{title.toUpperCase()}</Text>}
		</Pressable>
	);
};

export default AppButton;
