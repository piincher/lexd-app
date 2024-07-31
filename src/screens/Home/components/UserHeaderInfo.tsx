import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserHeaderInfoProps {
	firstName: string;
	lastName: string;
}

export const UserHeaderInfo = ({ firstName, lastName }: UserHeaderInfoProps) => {
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.textContent}>
					Salut {firstName} {lastName} 🙌
				</Text>
				<View style={styles.notificationContainer}>
					<Ionicons name='notifications-outline' size={24} color='black' />
					<View style={styles.redDot} />
				</View>
			</View>
			<Text style={styles.activeOrderText}>Commande Actifs</Text>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignContent: 'center',
		marginHorizontal: 20,
	},
	notificationContainer: {
		width: 40,
		height: 40,
		borderWidth: 0.2,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: COLORS.grey,
	},
	redDot: {
		height: 7,
		width: 7,
		borderRadius: 7,
		backgroundColor: COLORS.redShade,
		position: 'absolute',
		right: 10,
		top: 10,
	},
	textContent: { color: COLORS.blue, fontSize: 18, fontFamily: Fonts.bold },
	activeOrderText: { marginLeft: 20, fontSize: 26, color: COLORS.blue, fontFamily: Fonts.bold, marginVertical: 10 },
});
