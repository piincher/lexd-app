import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { productType } from '@src/api/order';
import AppButton from '@src/components/AppButton/AppButton';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import * as Clipboard from 'expo-clipboard';
import React, { FC, useEffect, useId } from 'react';
import {
	Alert,
	Dimensions,
	FlatList,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { ActivityIndicator, Button, Card, Paragraph, Snackbar, Text, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetActiveOrdersAdmin, useUpdateOrder } from '../../hooks/useOrder';
interface Order {
	id: string;
	clientName: string;
	phoneNumber: string;
	trackingCode: string;
	typeOfGoods: string;
	weight: string;
	partner: string;
	image: string;
}

interface Props {}

const steps = [
	{
		id: '0',
		title: 'le client a passé une commande',
	},
	{
		id: '1',
		title: 'les colis sont emballées',
	},
	{
		id: '2',
		title: 'les Colis sont expédiées et transférées vers le port',
	},
	{
		id: '3',
		title: "Les Colis sont transféré à l'entrepôt de Hong Kong",
	},
	{
		id: '4',
		title: "Les colis ont décollé pour L'Éthiopie",
	},
	{
		id: '5',
		title: "Les Colis sont transféré vers l'aéroport d'Ethiopie",
	},
	{
		id: '6',
		title: "Les Colis sont arrivé à l'aéroport de Bamako et prêt pour le dédouanement",
	},
	{
		id: '7',
		title: 'Les marchandises sont arrivées et ont été stockées.(Kalaban-Coura pres de FEBAK +22376696177/+22350005142)',
	},
];

const ActiveOrders: FC<Props> = () => {
	const { data, fetchNextPage, isError, hasNextPage, isFetchingNextPage, refetch } = useGetActiveOrdersAdmin();

	console.log(data);
	const renderFooter = () => {
		if (isFetchingNextPage) {
			return <ActivityIndicator size='small' color={COLORS.blue} animating />;
		} else if (hasNextPage) {
			return (
				<TouchableOpacity onPress={loadMore}>
					<Text>Voir</Text>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	};
	const loadMore = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
	};

	if (isError) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Erreur lors du chargement des commandes actives</Text>
				<AppButton title='Actualiser' onPress={refetch} />
			</View>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.textStyle}>Active Orders</Text>
			<FlatList
				onEndReached={loadMore}
				ListEmptyComponent={() => {
					return <Text style={{ textAlign: 'center', fontSize: 26 }}> Aucune commande</Text>;
				}}
				showsVerticalScrollIndicator={false}
				data={data?.pages?.flatMap((page) => page)}
				keyExtractor={(item) => item._id!}
				renderItem={({ item }) => {
					return <RenderOrder item={item} />;
				}}
				ListFooterComponent={renderFooter}
			/>
		</SafeAreaView>
	);
};

const windowWidth = Dimensions.get('window').width;
const RenderOrder = ({ item }: { item: productType }) => {
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
	const [visible, setVisible] = React.useState(false);
	const currentRoute = item?.route[item?.route?.length - 1];
	const [statusChange, setStatusChange] = React.useState(currentRoute?.title ?? '');
	const { mutate, isPending, isSuccess } = useUpdateOrder();
	const id = useId();
	const navigation = useNavigation();

	useEffect(() => {
		if (isSuccess) {
			setVisible(true);
			setTimeout(() => {
				navigation.navigate('HomeTab', { screen: 'Home' });
			}, 1000);
		}
	}, [isSuccess]);
	const currentPosition: { id: string; title: string; time: string } = {
		id: id,
		title: statusChange,
		time: new Date().toISOString(),
	};
	const copyToClipboard = async (text: string) => {
		await Clipboard.setStringAsync(text);
		Alert.alert('Copied to clipboard');
	};
	const updateOrder = () => {
		mutate({
			...item,
			orderId: item._id,
			currentPosition,
		});
	};
	const onDismissSnackBar = () => setVisible(false);
	return (
		<Card style={styles.card}>
			<Snackbar
				visible={visible}
				onDismiss={onDismissSnackBar}
				style={{
					backgroundColor: COLORS.white,
					top: -50,
				}}
				duration={3000}
			>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						alignContent: 'center',
					}}
				>
					<Text style={{ fontFamily: Fonts.black, marginRight: 10 }}>La status a change</Text>
					<AntDesign name='checkcircle' size={24} color='green' />
				</View>
			</Snackbar>
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ width: `${100 * (item?.images?.length ?? 0)}%` }}
				onMomentumScrollEnd={(event) => {
					const offset = event.nativeEvent.contentOffset.x;
					setCurrentImageIndex(Math.floor(offset / windowWidth));
				}}
			>
				{item?.images?.map((image, index) => (
					<View style={styles.imageContainer} key={index}>
						<Image
							source={{
								uri: image?.url ? image?.url : 'https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_1280.jpg',
							}}
							style={styles.image}
						/>
					</View>
				))}
			</ScrollView>
			<Card.Content>
				<Title style={styles.ParagraphStyle}> Nom du Client: {item.clientName}</Title>
				<Paragraph style={styles.ParagraphStyle}>Numero de telephone: {item.clientPhone}</Paragraph>
				<Paragraph selectable style={[styles.ParagraphStyle, { color: COLORS.Crimson }]}>
					Numero de suivi:{item.code}
					<Pressable onPress={() => copyToClipboard(item.code!)}>
						<Text
							style={{
								color: COLORS.white,
								backgroundColor: COLORS.DarkGrey,
								padding: 2,
								marginBottom: 50,
							}}
						>
							Copie le numero de suivi
						</Text>
					</Pressable>
				</Paragraph>
				<Paragraph style={styles.ParagraphStyle}> Type de colis :{item.typeOfPackage}</Paragraph>
				<Paragraph style={styles.ParagraphStyle}> Poid du colis : {item?.packageWeight} Kg</Paragraph>
				<Paragraph style={styles.ParagraphStyle}> Partenaire :{item.partenaire}</Paragraph>
				<Paragraph style={styles.ParagraphStyle}> Nombre de colis :{item.quantity}</Paragraph>
				<Paragraph style={[styles.ParagraphStyle, { color: COLORS.blue }]}>
					Situation actuel :{currentRoute?.title}
				</Paragraph>

				<Paragraph style={[styles.ParagraphStyle, { color: COLORS.blue }]}>
					Date de depart :
					{item.departureDate ? new Date(item.departureDate).toDateString() : 'Pas encore de date de depart'}
				</Paragraph>

				<View>
					<Picker
						mode='dialog'
						placeholder='Select your Category'
						style={{ width: 190, borderColor: 'red', borderWidth: 21 }}
						selectedValue={statusChange}
						onValueChange={(e: string) => setStatusChange(e)}
					>
						{steps.map((c) => {
							return <Picker.Item key={c.id} label={c.title} value={c.title} />;
						})}
					</Picker>
				</View>
				<Button mode='contained' style={{ marginBottom: 20 }}>
					Delivre
				</Button>
				<AppButton title='Mettre ' onPress={updateOrder} busy={isPending} />
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	card: {
		marginVertical: 10,
		marginHorizontal: 20,
	},
	textStyle: {
		fontSize: 24,
		textAlign: 'center',
		fontFamily: Fonts.black,
	},
	ParagraphStyle: {
		fontSize: 18,
		fontFamily: Fonts.black,
		padding: 5,
	},
	imageContainer: {
		width: windowWidth,
	},
	image: {
		width: windowWidth,
		height: 400, // Adjust the height as needed
	},
});

export default ActiveOrders;
