import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	summary: {
		minHeight: 92,
		borderWidth: 1,
		borderRadius: 18,
		padding: 16,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	summaryIcon: {
		width: 48,
		height: 48,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	summaryText: {
		flex: 1,
	},
	eyebrow: {
		fontSize: 12,
		fontWeight: "700",
	},
	title: {
		fontSize: 20,
		fontWeight: "900",
		marginTop: 4,
	},
	options: {
		flex: 1,
		gap: 10,
	},
	option: {
		minHeight: 78,
		borderWidth: 1,
		borderRadius: 16,
		padding: 14,
		flexDirection: "row",
		alignItems: "center",
	},
	optionText: {
		flex: 1,
		paddingRight: 12,
	},
	optionTitle: {
		fontSize: 15,
		fontWeight: "800",
	},
	optionSubtitle: {
		fontSize: 12,
		marginTop: 4,
		lineHeight: 17,
	},
	radio: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
