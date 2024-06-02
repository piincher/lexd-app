import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import React, { FC, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import ComppanyLogo from '../CompanyLogo/ComppanyLogo';

interface Props {
	title: string;
	subTitle: string;
	children: ReactNode;
}

const AuthFormContainer: FC<Props> = ({ title, subTitle, children }) => {
	console.log(title, subTitle);
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<>
				<ComppanyLogo />
				<View style={styles.headerContainer}>
					<Text style={styles.heading}>{title}</Text>
					<Text style={styles.subTitle}>{subTitle}</Text>
				</View>
				{children}
			</>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
		backgroundColor: COLORS.white,
	},
	heading: {
		fontSize: 25,
		color: COLORS.black,
		paddingVertical: 5,
		fontFamily: Fonts.bold,
	},
	subTitle: {
		fontSize: 15,
		fontFamily: Fonts.regular,
		color: COLORS.black,
	},
	headerContainer: { width: '100%', marginBottom: 20, marginLeft: 40 },
});

export default AuthFormContainer;
