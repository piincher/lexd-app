import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import React, { FC, useMemo } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface Props {
	title: string;
	onPress: () => void;
	active?: boolean;
}

const AppLink: FC<Props> = ({ title, onPress, active = true }) => {
	const { colors } = useAppTheme();
	const styles = useMemo(
		() =>
			StyleSheet.create({
				title: {
					color: colors.status.success,
					fontSize: 16,
					fontFamily: Fonts.black,
				},
			}),
		[colors],
	);
	return (
		<Pressable onPress={active ? onPress : null} style={{ opacity: active ? 1 : 0.4 }}>
			<Text style={styles.title}>{title}</Text>
		</Pressable>
	);
};

export default AppLink;
