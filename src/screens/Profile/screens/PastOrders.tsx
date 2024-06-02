import { Fonts } from '@src/constants/Fonts';
import ListingList from '@src/screens/Home/components/OrderList';
import React, { FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

const PastOrders: FC<Props> = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Image
				source={require('../../../../assets/images/log.png')}
				style={{ height: 80, width: 80, alignSelf: 'center' }}
			/>
			<Text style={styles.textStyle}>Mes Anciens Commandes</Text>
			<ListingList Status='Inactive' />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {},
	textStyle: {
		fontSize: 20,
		fontFamily: Fonts.black,
		textAlign: 'center',
	},
});

export default PastOrders;
