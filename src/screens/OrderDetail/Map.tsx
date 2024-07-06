import { COLORS } from '@src/constants/Colors';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useGetOrderDetails } from './hooks/useGetOrderDetail';
import { RootStackScreenProps } from '@src/navigations/type';
import { ORDERKEY } from '@src/constants/queryKey';
import { productType } from '@src/api/order';

interface Props {}

const Map = ({ route }: RootStackScreenProps<'Map'>) => {
	const id = route.params.id;
	const queryClient = useQueryClient();

	const data = queryClient.getQueryState([ORDERKEY, id])?.data as productType;

	const steps = data?.route;

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 23.1291,
					longitude: 113.2644,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				<Polyline
					coordinates={steps!?.map((step) => step.coordinates)}
					strokeColor='#000' // fallback for when `strokeColors` is not supported by the map-provider
					strokeColors={[
						'#7F0000',
						'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
						'#B24112',
						'#E5845C',
						'#238C23',
						'#7F0000',
					]}
					strokeWidth={6}
				/>
				{steps!?.map((step) => {
					const date = new Date(step.time ?? new Date());
					const formattedDate = date.toISOString().split('T')[0];
					const hours = date.getUTCHours().toString().padStart(2, '0');
					const minutes = date.getUTCMinutes().toString().padStart(2, '0');
					const formattedDateTime = `${formattedDate} ${hours}:${minutes}`;
					return (
						<Marker
							key={step.id}
							coordinate={step.coordinates}
							title={formattedDateTime}
							description={step.title}
							pinColor={COLORS.blue} // Custom color for the marker
						/>
					);
				})}
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
});

export default Map;
