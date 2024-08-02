import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { StyleSheet, Text, View } from 'react-native';

interface DetailRowProps {
	label1: string;
	value1: string;
	label2: string;
	value2: string;
}

export const DetailRow = ({ label1, value1, label2, value2 }: DetailRowProps) => (
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

const styles = StyleSheet.create({
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
