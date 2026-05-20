import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { HomeTabScreenProps, RootStackParamList } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { withProtectedRoute } from "@src/hoc/withProtectedRoute";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { isAdminRole as hasAdminRole } from '@src/shared/lib/roles';
import { OrdersAdminMenu, MenuItemType } from "../components/OrdersAdminMenu";
import { OrdersCustomerView } from "../components/OrdersCustomerView";

const ADMIN_MENU: MenuItemType[] = [
	{ id: "0", title: "Ajouter une commande", route: "SelectUser" },
	{ id: "1", title: "Voir les commandes", route: "AllOrders" },
	{ id: "2", title: "Ajouter un utilisateur", route: "UserAdd" },
	{ id: "3", title: "Batch Update", route: "BatchUpdate" },
	{ id: "4", title: "Marquer comme livré", route: "ScanQRCode" },
	{ id: "5", title: "Les colis recupérés", route: "AdminPastOrders" },
	{ id: "6", title: "Chercher des colis d'un client", route: "GlobalSearch" },
	{ id: "7", title: "Liste des utilisateurs", route: "ClientManagement" },
];

const MANAGER_MENU: MenuItemType[] = [
	{ id: "4", title: "Marquer comme livré", route: "ScanQRCode" },
];

const Orders = ({ navigation }: HomeTabScreenProps<"Orders">) => {
	const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const role = useAuth((state) => state.user?.role);
	const { colors } = useAppTheme();
	const adminRole = hasAdminRole(role);

	if (adminRole) {
		return <OrdersAdminMenu navigation={navigation} items={ADMIN_MENU} />;
	}
	if (role === "manager") {
		return <OrdersAdminMenu navigation={navigation} items={MANAGER_MENU} />;
	}

	return (
		<OrdersCustomerView
			headerRight={
				<NotificationBell
					onPress={() => rootNavigation.navigate("Notifications")}
					size={24}
					color={colors.text.primary}
				/>
			}
		/>
	);
};

export default withProtectedRoute(Orders);
