import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	scrollContainer: {
		padding: 16,
		paddingBottom: 32,
	},
	centeredContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	userCard: {
		borderRadius: RADIUS.card,
		padding: 16,
		marginBottom: 16,
		borderWidth: HAIRLINE,
		borderColor: colors.border,
	},
	userCardContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	userInfo: {
		marginLeft: 16,
		flex: 1,
	},
	userName: {
		fontSize: 20,
		fontFamily: Fonts.bold,
		marginBottom: 4,
	},
	userDetail: {
		fontSize: 14,
		fontFamily: Fonts.regular,
	},
	statsCard: {
		borderRadius: RADIUS.card,
		padding: 16,
		marginBottom: 16,
		borderWidth: HAIRLINE,
		borderColor: colors.border,
	},
	sectionTitle: {
		fontSize: 18,
		fontFamily: Fonts.bold,
		marginBottom: 12,
		textAlign: "center",
		color: colors.text.primary,
	},
	statsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	statItem: {
		width: "48%",
		marginBottom: 12,
		alignItems: "center",
	},
	statLabel: {
		fontSize: 12,
		fontFamily: Fonts.meduim,
		marginBottom: 4,
	},
	statValue: {
		fontSize: 20,
		fontFamily: Fonts.bold,
	},
	chartCard: {
		borderRadius: RADIUS.card,
		padding: 16,
		marginBottom: 16,
		borderWidth: HAIRLINE,
		borderColor: colors.border,
	},
	card: {
		borderRadius: RADIUS.card,
		padding: 16,
		marginBottom: 16,
		borderWidth: HAIRLINE,
		borderColor: colors.border,
	},
	cardTitle: {
		fontSize: 18,
		fontFamily: Fonts.bold,
		marginBottom: 12,
		color: colors.text.primary,
	},
	emptyStateContainer: {
		paddingVertical: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyStateText: {
		fontSize: 16,
		fontFamily: Fonts.regular,
		color: colors.text.secondary,
		textAlign: 'center',
	},
	emptyCard: {
		borderRadius: RADIUS.card,
		padding: 24,
		marginBottom: 16,
		alignItems: "center",
		borderWidth: HAIRLINE,
		borderColor: colors.border,
	},
	emptyText: {
		fontSize: 16,
		fontFamily: Fonts.regular,
		textAlign: "center",
	},
	recentCard: {
		borderRadius: RADIUS.card,
		padding: 16,
		borderWidth: HAIRLINE,
		borderColor: colors.border,
	},
	shipmentRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	shipmentInfo: {},
	shipmentId: {
		fontSize: 16,
		fontFamily: Fonts.bold,
	},
	shipmentDate: {
		fontSize: 12,
		fontFamily: Fonts.regular,
		marginTop: 2,
	},
	statusBadge: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: RADIUS.badge,
	},
	statusText: {
		fontSize: 12,
		fontFamily: Fonts.meduim,
		color: colors.text.inverse,
	},
	errorText: {
		fontSize: 18,
		fontFamily: Fonts.bold,
		textAlign: "center",
		marginBottom: 16,
		color: colors.text.primary,
	},
	retryButton: {
		padding: 8,
	},
	retryText: {
		fontSize: 16,
		fontFamily: Fonts.bold,
		color: colors.primary.main,
	},
});

export default createStyles;
