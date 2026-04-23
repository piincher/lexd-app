// GoodsTrackingTimeline - Styles

import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
	container: {
		paddingVertical: Theme.spacing.md,
	},
	eventRow: {
		flexDirection: 'row',
		marginBottom: Theme.spacing.lg,
	},
	leftColumn: {
		alignItems: 'center',
		width: 48,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: Theme.radius.full,
		justifyContent: 'center',
		alignItems: 'center',
		...Theme.shadows.sm,
	},
	currentIconContainer: {
		borderWidth: 3,
		borderColor: Theme.colors.primary.main,
		transform: [{ scale: 1.1 }],
	},
	icon: {
		fontSize: 18,
	},
	connector: {
		width: 2,
		flex: 1,
		backgroundColor: Theme.neutral[200],
		marginVertical: Theme.spacing.xs,
	},
	contentColumn: {
		flex: 1,
		paddingLeft: Theme.spacing.sm,
		paddingBottom: Theme.spacing.md,
	},
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: Theme.spacing.xs,
	},
	statusText: {
		fontFamily: Fonts.regular,
		fontSize: 14,
		textTransform: 'capitalize',
		fontWeight: '700',
	},
	currentStatusText: {
		fontSize: 15,
	},
	timestamp: {
		fontSize: 12,
		color: Theme.neutral[500],
		fontWeight: '500',
	},
	location: {
		fontSize: 13,
		color: Theme.neutral[600],
		marginBottom: Theme.spacing.xs,
	},
	description: {
		fontSize: 12,
		color: Theme.neutral[500],
		fontStyle: 'italic',
	},
	currentIndicator: {
		position: 'absolute',
		left: -8,
		top: 0,
		bottom: 0,
		width: 4,
		backgroundColor: Theme.colors.primary.main,
		borderRadius: Theme.radius.xs,
	},
});
