import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {}

const CopyrightText: FC<Props> = () => {
	const { colors } = useAppTheme();
	const date = new Date();
	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					textAlign: 'center',
					color: colors.text.inverse,
					fontFamily: Fonts.black,
				},
			}),
		[colors],
	);
	return <Text style={styles.container}>© {date.getFullYear()} LEXD. All rights reserved.</Text>;
};

export default CopyrightText;
