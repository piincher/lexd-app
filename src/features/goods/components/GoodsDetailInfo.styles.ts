import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
	card: {
		marginHorizontal: 16,
		marginBottom: 12,
		elevation: 2,
		borderRadius: 12,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
		gap: 8,
	},
	title: {
		fontFamily: Fonts.bold,
		fontSize: 15,
	},
	description: {
		fontFamily: Fonts.regular,
		fontSize: 14,
		lineHeight: 20,
		paddingVertical: 8,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
	},
	infoLabel: {
		fontFamily: Fonts.medium,
		fontSize: 13,
	},
	infoValue: {
		fontFamily: Fonts.bold,
		fontSize: 13,
		flex: 1,
		textAlign: 'right',
	},
	divider: {
		marginVertical: 0,
	},
	badge: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 8,
		gap: 4,
	},
	badgeText: {
		fontFamily: Fonts.bold,
		fontSize: 13,
	},
});
