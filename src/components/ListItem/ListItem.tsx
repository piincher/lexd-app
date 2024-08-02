import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { StyleSheet, Text, View } from 'react-native';

interface ListItemProps {
	label: string;
	value: string | number;
	index: string;
}

export const ListItem = ({ label, value, index }: ListItemProps) => {
	return (
		<View key={index} style={styles.textContent}>
			<Text style={styles.propertyStyle}>{label}</Text>
			<Text style={styles.textStyle}>{value}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	textContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
		marginHorizontal: 20,
	},
	propertyStyle: {
		fontSize: 16,
		fontFamily: Fonts.meduim,
	},
	textStyle: {
		fontSize: 16,
		fontFamily: Fonts.meduim,
		color: COLORS.grey,
	},
});
