import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { StyleSheet, Text, View } from 'react-native';

interface RowDetailsProps {
	label: string;
	value: string | number;
}
export const RowDetails = ({ label, value }: RowDetailsProps) => {
	return (
		<>
			<View style={styles.rowContainer}>
				<Text style={styles.textLabelStyle}>{label} </Text>
				<Text style={styles.textValue}>{value}</Text>
			</View>
		</>
	);
};

export const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 5,
	},
	textLabelStyle: {
		color: COLORS.grey,
		fontFamily: Fonts.meduim,
	},
	textValue: {
		color: COLORS.blue,
		fontFamily: Fonts.black,
	},
});
