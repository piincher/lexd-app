import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 16,
		paddingBottom: 14,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 22,
		fontWeight: "700",
	},
	headerSubtitle: {
		fontSize: 13,
		marginTop: 2,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 16,
		marginVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 12,
		borderWidth: 1,
		height: 44,
	},
	searchIcon: { marginRight: 8 },
	searchInput: {
		flex: 1,
		fontSize: 14,
		fontFamily: Fonts.regular,
		paddingVertical: 0,
	},
	clearSearch: { padding: 4 },
	listWrapper: {
		flex: 1,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 100,
	},
	emptyContainer: {
		paddingTop: 80,
		alignItems: "center",
		gap: 8,
	},
	emptyTitle: {
		fontSize: 17,
		fontWeight: "600",
	},
	emptyText: {
		fontSize: 14,
		textAlign: "center",
		paddingHorizontal: 40,
	},
});
