import { COLORS } from '@src/constants/Colors';
import React, { FC, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';

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
				<Image source={require('../../../assets/icon.png')} style={{ height: 80, width: 200 }} />
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
		fontWeight: 'bold',
		color: COLORS.black,
		paddingVertical: 5,
	},
	subTitle: {
		fontSize: 15,

		color: COLORS.black,
	},
	headerContainer: { width: '100%', marginBottom: 20 },
});

export default AuthFormContainer;
