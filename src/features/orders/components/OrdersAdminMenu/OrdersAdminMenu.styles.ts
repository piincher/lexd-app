import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	adminItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 0.2,
		padding: 12,
		margin: 20,
	},
	adminItemText: {
		fontFamily: Fonts.meduim,
	},
});
