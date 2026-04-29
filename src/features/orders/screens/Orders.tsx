import React from "react";
import type { HomeTabScreenProps } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { withProtectedRoute } from "@src/shared/hoc/withProtectedRoute";
import { NotificationBell } from "@src/features/notifications";
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
	const { role } = useAuth((state) => state.user);
	const { colors } = useAppTheme();
	const isAdminRole = ["admin", "superadmin"].includes(role);

	if (isAdminRole) {
		return <OrdersAdminMenu navigation={navigation} items={ADMIN_MENU} />;
	}
	if (role === "manager") {
		return <OrdersAdminMenu navigation={navigation} items={MANAGER_MENU} />;
	}

	return (
		<OrdersCustomerView
			headerRight={
				<NotificationBell
					onPress={() => (navigation as any).navigate("Notifications")}
					size={24}
					color={colors.text.primary}
				/>
			}
		/>
	);
};

export default withProtectedRoute(Orders);
