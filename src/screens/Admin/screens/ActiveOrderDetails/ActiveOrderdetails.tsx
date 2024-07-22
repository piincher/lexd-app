import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { Button, Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useUpdateOrder } from '../../hooks/useOrder';
import { RootStackScreenProps } from '@src/navigations/type';
import { useGetOrderDetails } from '@src/screens/OrderDetail/hooks/useGetOrderDetail';

interface Props {}

interface DetailRowProps {
	label1: string;
	value1: string;
	label2: string;
	value2: string;
}

const Status = {
	currentStatus: 'in Processing',
	orderDetail: [
		{
			id: '1',
			status: 'Order Arrived',
			coordinates: [{ latitude: 23.1291, longitude: 113.2644, location: 'Guangzhou warehouse' }],
		},
		{
			id: '2',
			status: 'Order in Processing',
			coordinates: [{ latitude: 23.1291, longitude: 113.2644, location: 'ChinalinkExpress Processing' }],
		},
		{
			id: '3',
			status: 'Order in Transit',
			coordinates: [
				{ latitude: 24.1291, longitude: 114.2644, location: 'Guangzhou' },
				{ latitude: 25.1291, longitude: 115.2644, location: 'Nanjing' },
				{ latitude: 26.1291, longitude: 117.2644, location: 'Jilin' },
				{ latitude: 237.1291, longitude: 118.2644, location: 'Shanghai' },
			],
		},
	],
};

const DetailRow: FC<DetailRowProps> = ({ label1, value1, label2, value2 }) => (
	<>
		<View style={styles.rowContainer}>
			<Text style={styles.propertyStyle}>{label1}</Text>
			<Text style={styles.propertyStyle} selectable>
				{label2}
			</Text>
		</View>
		<View style={styles.rowContainer}>
			<Text style={styles.valueStyle}>{value1}</Text>
			<Text style={styles.valueStyle}>{value2}</Text>
		</View>
	</>
);

const ActiveOrderDetails = ({ route }: RootStackScreenProps<'ActiveOrderDetails'>) => {
	const [selectedCheckboxes, setSelectedCheckboxes] = useState<{ [key: string]: boolean }>({});
	const [selected, setSelected] = useState<any>(null); // Update the type according to your data structure
	const { mutate, isPending, isSuccess, data } = useUpdateOrder();
	const [coordinatesData, setCoordinatesData] = useState<{ latitude: string; location: string; longitude: string }[]>(
		[]
	);

	const id = route.params.id;
	const { data: item } = useGetOrderDetails(id);
	const [statusChange, setStatusChange] = useState('');

	const updateOrder = (updatedSelected: any) => {
		mutate({
			...item,
			orderId: item._id!,
			currentPosition: updatedSelected,
		});
	};

	// const datad = item?.route[item.route?.length - 1];
	// const coordinateArr = datad?.coordinates;
	// const lastItem = coordinateArr[coordinateArr?.length - 1];

	const handleStepChange = (value: string, status: string, coordinates: any) => {
		// setStatusChange(value);
		const location = coordinates.find((loc) => loc.location === value);
		setStatusChange(status);
		if (location) {
			setCoordinatesData([location]);
		}
	};

	const updateTransiteStatus = () => {
		const updatedSelected = {
			title: statusChange,
			coordinates: coordinatesData,
			id: Math.random().toString(36).substring(7),
			time: new Date().toISOString(),
		};
		updateOrder(updatedSelected);
	};

	// handle checkbox press
	const handleCheckboxPress = (location: string, status: string, coordinates: any) => {
		const updatedCheckboxes = {
			...selectedCheckboxes,
			[location]: !selectedCheckboxes[location],
		};

		const updatedSelected = {
			title: status,
			coordinates,
			id: Math.random().toString(36).substring(7),
			time: new Date().toISOString(),
		};

		setSelectedCheckboxes(updatedCheckboxes);
		setSelected(updatedSelected);
		updateOrder(updatedSelected);
	};

	//  when the screen load check the value of checkbox
	useEffect(() => {
		if (item) {
			const initialCheckboxes = item?.route?.reduce((acc: { [key: string]: boolean }, route: any) => {
				route?.coordinates?.forEach((location: any) => {
					acc[location.location] = Status.orderDetail.some(
						(detail) =>
							detail.status === route.title && detail.coordinates.some((coord) => coord.location === location.location)
					);
				});
				return acc;
			}, {});

			setSelectedCheckboxes(initialCheckboxes);
		}
	}, [item]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.detailContainer}>
				{/* Logistics details */}
				<DetailRow label1="Pays d'envoie" value1='Chine' label2='Pays de reception' value2='Bamako, Mali' />
				{/* Goods information */}
				<DetailRow label1='Client' value1='Ibrahim Kouma' label2='Nombre de Kilo' value2='75 kg' />
				{/* Status and type */}
				<DetailRow label1='Status' value1='En Cours' label2='Type de colis' value2='Electronique' />
			</View>

			{/* Routes section */}
			{Status.orderDetail.map((route) => (
				<View key={route.id} style={styles.routeContainer}>
					<Text>{route.status}</Text>
					<View>
						{route.status === 'Order in Transit' ? (
							<Picker
								prompt='Change le trajet'
								mode='dialog'
								style={styles.picker}
								selectedValue={statusChange}
								onValueChange={(item) => {
									handleStepChange(item, route?.status, route?.coordinates);
								}}
							>
								{route.coordinates.map((c) => (
									<Picker.Item key={c.location} label={c.location} value={c.location} />
								))}
							</Picker>
						) : (
							route.coordinates.map((location) => (
								<Pressable
									key={location.location}
									onPress={() => handleCheckboxPress(location.location, route.status, route.coordinates)}
									style={styles.checkboxContainer}
								>
									<Text>{location.location}</Text>
									<Checkbox
										status={selectedCheckboxes[location.location] ? 'checked' : 'unchecked'}
										onPress={() => handleCheckboxPress(location.location, route.status, route.coordinates)}
									/>
								</Pressable>
							))
						)}
					</View>
				</View>
			))}

			<Button onPress={updateTransiteStatus}>send</Button>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	detailContainer: {
		borderWidth: 0.2,
		padding: 20,
		margin: 20,
		borderColor: COLORS.grey,
		borderRadius: 5,
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	propertyStyle: {
		fontFamily: Fonts.regular,
		color: COLORS.grey,
	},
	valueStyle: {
		fontFamily: Fonts.bold,
	},
	routeContainer: {
		borderColor: COLORS.grey,
		borderWidth: 0.5,
		padding: 10,
		margin: 10,
	},
	picker: {
		width: 120,
	},
	checkboxContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default ActiveOrderDetails;
