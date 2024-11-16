import { COLORS } from '@src/constants/Colors';
import { HomeTabScreenProps, RootStackParamList } from '@src/navigations/type';
import { useAuth } from '@src/store/Auth';
import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ItemList } from '../../../Home/components/ItemList';
import { RowDetails } from '../../../Home/components/RowDetails';
import { useViewSmsBalance } from '../../../Home/hooks/useGetActiveOrders';

type dataType = {
	id: string;
	title: string;
	route: keyof RootStackParamList;
}[];
const list: dataType = [
	{
		id: '0',
		title: 'Ajouter une commande',
		route: 'ChooseShippingMethod',
	},
	{
		id: '1',
		title: 'Voir les commandes actives',
		route: 'ShippingMethod',
	},
	{
		id: '2',
		title: 'Ajouter un utilisateur',
		route: 'UserAdd',
	},

	{
		id: '3',
		title: 'Voir les commandes passées',
		route: 'AdmninPastOrders',
	},
	{
		id: '4',
		title: 'Envoyer un sms de rappel',
		route: 'SendSms',
	},
	{
		id: '5',
		title: 'Batch Update',
		route: 'BatchUpdate',
	},

	{
		id: '6',
		title: 'Scannez pour confirmer la reception',
		route: 'ScanQRCode',
	},
];

const AdminDashBoard = ({ navigation }: HomeTabScreenProps<'AdminDashBoard'>) => {
	const { role } = useAuth((state) => state.user);
	const isAdmin = role === 'admin';

	const { data: smsData } = useViewSmsBalance(isAdmin);

	const date = smsData && smsData[0]?.expirationDate ? new Date(smsData[1].expirationDate) : new Date();
	const formattedDateTime = date.toISOString().replace('T', ' ').slice(0, -5);

	return (
		<SafeAreaView style={styles.container}>
			<>
				<ScrollView>
					<Pressable>
						<Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 10 }}>Informations sur le compte</Text>
					</Pressable>
					<RowDetails label='Le nombre de SMS restant' value={smsData?.[1]?.availableUnits ?? 0} />
					<RowDetails label="la date d'expiration de sms" value={formattedDateTime} />

					<ItemList data={list} navigation={navigation} />
				</ScrollView>
			</>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: COLORS.white },
});
export default AdminDashBoard;
