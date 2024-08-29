import { Header } from '@src/components/Header/Header';
import { Fonts } from '@src/constants/Fonts';
import { RootStackScreenProps } from '@src/navigations/type';
import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '@src/constants/Colors';
interface Props {}

const data = [
	{
		title: 'Order 1',
		description: 'Your order has been placed',
		time: '2 hours ago',
	},
	{
		title: 'Order 2',
		description: 'Your order is on the way',
		time: '3 hours ago',
	},
];
const Notifications = ({ navigation }: RootStackScreenProps<'Notifications'>) => {
	return (
		<SafeAreaView style={styles.container}>
			<Header title='Notifications' navigation={navigation} />

			{data.map((item, index) => {
				return (
					<>
						<View key={index} style={styles.notificationContainer}>
							<AntDesign name='checkcircleo' size={30} color={COLORS.blue} />
							<View>
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.description}>{item.description}</Text>
							</View>
							<Text>{item.time}</Text>
						</View>
						<View style={styles.bottomLine} />
					</>
				);
			})}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {},
	notificationContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: 20,
		padding: 10,
	},
	title: {
		fontFamily: Fonts.bold,
		fontSize: 18,
		marginVertical: 5,
	},
	description: {
		fontFamily: Fonts.regular,
		color: 'grey',
		textAlign: 'center',
	},
	bottomLine: { borderBottomWidth: 0.5, marginHorizontal: 20, borderColor: 'grey' },
});

export default Notifications;
