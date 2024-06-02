import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {}

const CopyrightText: FC<Props> = () => {
	const date = new Date();
	return <Text style={styles.container}>© {date.getFullYear()} ChinaLink Express. All rights reserved.</Text>;
};

const styles = StyleSheet.create({
	container: {
		textAlign: 'center',
		color: COLORS.white,
		fontFamily: Fonts.black,
	},
});

export default CopyrightText;
