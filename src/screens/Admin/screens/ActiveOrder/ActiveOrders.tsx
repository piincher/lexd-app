import { Picker } from '@react-native-picker/picker';
import { productType } from '@src/api/order';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import * as Clipboard from 'expo-clipboard';
import React, { FC, useId } from 'react';
import { Alert, Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, Paragraph, Snackbar, Text, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetActiveOrders, useUpdateOrder } from '../../hooks/useOrder';
import AppButton from '@src/components/AppButton/AppButton';
import { AntDesign } from '@expo/vector-icons';
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
		title: "Colis transféré à l'entrepôt de Hong Kong",
	},
	{
		id: '4',
		title: "Le colis a décollé pour L'Éthiopie",
	},
	{
		id: '5',
		title: "Colis transféré vers l'aéroport d'Ethiopie",
	},
	{
		id: '6',
		title: "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement",
	},
	{
		id: '7',
		title:
			'marchandises sont arrivées au port et ont été stockées.(Kalaban-Coura pres de FEBAK +22376696177/+22350005142',
	},
];

const ActiveOrders: FC<Props> = () => {
	const { data, isLoading } = useGetActiveOrders();

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator size='large' animating={true} />
			</View>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.textStyle}>Active Orders</Text>
			<FlatList
				data={data!}
				renderItem={({ item }) => {
					return <RenderOrder item={item} />;
				}}
				keyExtractor={(item) => item._id!}
			/>
		</SafeAreaView>
	);
};

const windowWidth = Dimensions.get('window').width;
const RenderOrder = ({ item }: { item: productType }) => {
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
	const [visible, setVisible] = React.useState(false);
	const currentRoute = item?.route[item?.route.length - 1];
	const [statusChange, setStatusChange] = React.useState(currentRoute?.title ?? '');
	const { mutate, isPending } = useUpdateOrder();
	const id = useId();
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
					{' '}
					Situation actuel :{currentRoute?.title}
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
