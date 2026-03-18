import { COLORS } from "@src/constants/Colors";
import { AuthenticatedStackScreenProps } from "@src/navigation/types";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

/**
 * @deprecated Use ManualOrderScreen instead
 * This component redirects to the new ManualOrderScreen
 */
const AddOrder = ({ navigation }: AuthenticatedStackScreenProps<"AddOrder">) => {
	useEffect(() => {
		// Redirect to new manual order flow
		navigation.replace("ManualOrder");
	}, [navigation]);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator size="large" color={COLORS.blue} />
		</View>
	);
};

export default AddOrder;
