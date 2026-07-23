import { StyleSheet } from 'react-native';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';
import type { ThemeContextType } from '@src/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createJourneyMapStyles = (colors: Colors) =>
	StyleSheet.create({
		container: { marginTop: 28, paddingHorizontal: 16 },
		header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
		title: {
			fontSize: 11,
			fontWeight: '700',
			letterSpacing: 0.8,
			textTransform: 'uppercase',
			color: colors.text.secondary,
		},
		totalBadge: {
			backgroundColor: `${colors.primary.main}14`,
			borderRadius: RADIUS.badge,
			paddingHorizontal: 8,
			paddingVertical: 3,
		},
		totalText: {
			fontSize: 11,
			fontWeight: '700',
			letterSpacing: 0.6,
			color: colors.primary.main,
		},
		scroll: { marginHorizontal: -16, paddingHorizontal: 16 },
		track: { flexDirection: 'row', alignItems: 'flex-start' },
		stage: { alignItems: 'center', width: 72 },
		// Squared checkpoint nodes rather than circular dots — reads as a
		// manifest stamp and matches the app's squarer geometry.
		dotWrapper: {
			width: 40,
			height: 40,
			borderRadius: RADIUS.control,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 2,
		},
		pulse: {
			position: 'absolute',
			width: 40,
			height: 40,
			borderRadius: RADIUS.control,
		},
		line: {
			width: 32,
			height: 2,
			borderRadius: 0,
			marginTop: 19,
		},
		label: {
			fontSize: 9,
			fontWeight: '700',
			letterSpacing: 0.5,
			textTransform: 'uppercase',
			marginTop: 8,
			textAlign: 'center',
		},
		count: { fontSize: 13, fontWeight: '800', marginTop: 2 },
		emptyState: {
			alignItems: 'center',
			paddingVertical: 32,
			borderRadius: RADIUS.card,
			borderWidth: HAIRLINE,
			borderColor: colors.border,
			marginHorizontal: 16,
			gap: 8,
		},
		emptyTitle: { fontSize: 14, fontWeight: '700', marginTop: 4 },
		emptyText: { fontSize: 12, textAlign: 'center', paddingHorizontal: 24 },
	});
