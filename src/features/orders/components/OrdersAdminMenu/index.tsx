import React from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShippingMode } from "@src/store/shippingMode";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { styles } from "./OrdersAdminMenu.styles";

export interface MenuItemType {
	id: string;
	title: string;
	route: any;
	param?: string;
}

interface OrdersAdminMenuProps {
	navigation: any;
	items: MenuItemType[];
}

export const OrdersAdminMenu: React.FC<OrdersAdminMenuProps> = ({ navigation, items }) => {
	const setType = useShippingMode((state) => state.setType);
	const { colors } = useAppTheme();

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
			<ScrollView>
				{items.map((item) => (
					<Pressable
						key={item.id}
						style={[styles.adminItem, { borderColor: colors.primary.main }]}
						onPress={() => {
							if (item.param) setType(item.param as "air" | "sea");
							navigation.navigate(item.route, { param: item.param });
						}}
					>
						<Text style={[styles.adminItemText, { color: colors.text.primary }]}>
							{item.title}
						</Text>
						<MaterialIcons name="navigate-next" size={24} color={colors.primary.main} />
					</Pressable>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};
