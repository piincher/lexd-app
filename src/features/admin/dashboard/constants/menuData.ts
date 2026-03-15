/**
 * Menu data constants for admin dashboard
 */

export interface MenuItem {
  id: string;
  title: string;
  route: string;
  badge?: number;
}

export interface MenuCategory {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "goods",
    title: "📦 Goods Management",
    icon: "package-variant",
    items: [
      { id: "g1", title: "Receive Goods", route: "ReceiveGoods" },
      { id: "g2", title: "Goods List", route: "AdminGoodsList" },
      { id: "g3", title: "Void Goods", route: "VoidGoodsList" },
    ],
  },
  {
    id: "orders",
    title: "📋 Orders",
    icon: "clipboard-list",
    items: [
      { id: "o1", title: "All Orders", route: "AllOrders" },
      { id: "o2", title: "Active Orders", route: "ActiveOrder" },
      { id: "o3", title: "Add New Order", route: "ChooseShippingMethod" },
      { id: "o4", title: "Past Orders", route: "AdmninPastOrders" },
      { id: "o5", title: "Batch Update", route: "BatchUpdate" },
    ],
  },
  {
    id: "logistics",
    title: "🚢 Logistics",
    icon: "truck-delivery",
    items: [
      { id: "l1", title: "Containers", route: "ContainerList" },
      { id: "l2", title: "Consignees", route: "ConsigneeList" },
      { id: "l3", title: "Routes", route: "RouteList" },
      { id: "l4", title: "Packing Lists", route: "PackingList" },
    ],
  },
  {
    id: "customers",
    title: "👥 Customers",
    icon: "account-group",
    items: [
      { id: "c1", title: "Client Management", route: "ClientManagement" },
      { id: "c2", title: "Add User", route: "UserAdd" },
      { id: "c3", title: "Send SMS", route: "SendSms" },
    ],
  },
  {
    id: "tools",
    title: "🛠️ Tools",
    icon: "tools",
    items: [
      { id: "t1", title: "Scan QR Code", route: "ScanQRCode" },
      { id: "t2", title: "Statistics", route: "Stats" },
    ],
  },
];
