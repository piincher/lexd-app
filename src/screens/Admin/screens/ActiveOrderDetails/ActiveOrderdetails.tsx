import React, { FC } from 'react';
import { View, StyleSheet, Text, TextProps, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface Props {}

interface DetailRowProps {
	label1: string;
	value1: string;
	label2: string;
	value2: string;
}

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

const ActiveOrderDetails: FC<Props> = () => {
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
});

export default ActiveOrderDetails;
