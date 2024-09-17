import { Header } from '@src/components/Header/Header';
import { Fonts } from '@src/constants/Fonts';
import { RootStackScreenProps } from '@src/navigations/type';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '@src/constants/Colors';
import { useGetNotification } from '../hooks/useGetNotification';
interface Props {}

const Notifications = ({ navigation }: RootStackScreenProps<'Notifications'>) => {
	const { data } = useGetNotification();
	return (
		<SafeAreaView style={styles.container}>
			<Header title='Notifications' navigation={navigation} />

			{data &&
				data.map((item, index) => {
					return (
						<>
							<View key={index} style={styles.notificationContainer}>
								<AntDesign
									name='checkcircleo'
									size={30}
									color={item.read ? COLORS.grey : COLORS.blue}
									style={{ marginLeft: 10 }}
								/>
								<View style={{ marginLeft: 20, marginHorizontal: 50 }}>
									<Text style={styles.title}>{item.Status}</Text>
									<Text style={styles.description} numberOfLines={20}>
										{item.description}
									</Text>
								</View>
								{/* <Text>{item.code}</Text> */}
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
		padding: 20,
		width: '100%',
	},
	title: {
		fontFamily: Fonts.bold,
		fontSize: 18,
		marginVertical: 5,
	},
	description: {
		fontFamily: Fonts.regular,
		color: 'grey',
		textAlign: 'left',
	},
	bottomLine: { borderBottomWidth: 0.5, marginHorizontal: 20, borderColor: 'grey' },
});

export default Notifications;
