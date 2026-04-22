import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import React, { FC, ReactNode, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ComppanyLogo from '../CompanyLogo/ComppanyLogo';

interface Props {
	title: string;
	subTitle: string;
	children: ReactNode;
}

const AuthFormContainer: FC<Props> = ({ title, subTitle, children }) => {
	const { colors } = useAppTheme();
	console.log(title, subTitle);
	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					paddingHorizontal: 15,
					backgroundColor: colors.background.default,
				},
				heading: {
					fontSize: 25,
					color: colors.text.primary,
					paddingVertical: 5,
					fontFamily: Fonts.bold,
				},
				subTitle: {
					fontSize: 15,
					fontFamily: Fonts.regular,
					color: colors.text.primary,
				},
				headerContainer: { width: '100%', marginBottom: 20, marginLeft: 40 },
			}),
		[colors],
	);
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

export default AuthFormContainer;
