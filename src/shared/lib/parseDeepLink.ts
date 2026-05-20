/**
 * Deep Link URL Parser
 *
 * Parses deep link URLs into screen name and navigation params.
 * Supports both custom scheme (chinalinkexpress://) and universal links.
 */

export interface ParsedLink {
  screen: string;
  params?: Record<string, unknown>;
  requiresAdmin?: boolean;
}

const adminLink = (screen: string, params?: Record<string, unknown>): ParsedLink => ({
  screen,
  params,
  requiresAdmin: true,
});

/**
 * Parse a deep link URL into screen name and params.
 * This is a best-effort parser that mirrors the linking config.
 */
export function parseDeepLink(url: string): ParsedLink | null {
  const path = url
    .replace(/^chinalinkexpress:\/\//, "")
    .replace(/^https:\/\/chinalinkexpress\.com\//, "")
    .replace(/^https:\/\/www\.chinalinkexpress\.com\//, "")
    .replace(/^http:\/\/chinalinkexpress\.com\//, "")
    .replace(/^http:\/\/www\.chinalinkexpress\.com\//, "");
  const [route, queryString] = path.split("?");
  const segments = route.split("/").filter(Boolean);

  if (segments.length === 0) return { screen: "HomeTab", params: undefined };

  const params: Record<string, string> = {};
  if (queryString) {
    queryString.split("&").forEach((pair) => {
      const [key, value] = pair.split("=");
      if (key && value) params[key] = decodeURIComponent(value);
    });
  }

  const first = segments[0];
  const second = segments[1];
  const third = segments[2];

  switch (first) {
    case "home":
      return { screen: "HomeTab", params: { screen: "Home" } };
    case "dashboard":
      return { screen: "HomeTab", params: { screen: "CustomerDashboard" } };
    case "containers":
      return { screen: "HomeTab", params: { screen: "MyContainers" } };
    case "goods-list":
      return { screen: "HomeTab", params: { screen: "MyGoods" } };
    case "goods": {
      if (second === "new") return { screen: "ScanQR", params };
      if (third === "edit") return { screen: "EditGoods", params: { goodsId: second, ...params } };
      return { screen: "GoodsDetail", params: { goodsId: second, ...params } };
    }
    case "orders":
      return { screen: "HomeTab", params: { screen: "Orders" } };
    case "profile":
      return { screen: "HomeTab", params: { screen: "Profile" } };
    case "tracking":
      return { screen: "ContainerTracking", params: { containerId: second, ...params } };
    case "s":
      return { screen: "SharedShipment", params: { token: second, ...params } };
    case "order":
      return { screen: "OrderDetail", params: { id: second, ...params } };
    case "ticket":
      return { screen: "TicketDetail", params: { ticketId: second, ...params } };
    case "support": {
      if (second === "new") return { screen: "CreateTicket", params };
      return { screen: "TicketList", params };
    }
    case "notifications": {
      if (second === "detail") return { screen: "NotificationDetail", params };
      if (second === "settings") return { screen: "NotificationSettings", params };
      return { screen: "Notifications", params };
    }
    case "payments": {
      if (second === "history") return { screen: "MyPaymentHistory", params };
      if (second === "portal") return { screen: "MyPaymentHistory", params };
      if (second === "confirmation") return { screen: "MyPaymentHistory", params };
      if (second) return { screen: "MyPaymentHistory", params };
      return { screen: "MyPaymentHistory", params };
    }
    case "faq":
      return { screen: "FAQ", params };
    case "about":
      return { screen: "AboutUs", params };
    case "route-check":
      return { screen: "CheckRoute", params };
    case "batch":
      return adminLink("BatchUpdateDetail", { data: second, ...params });
    case "scan":
      return adminLink("ScanQRCode", params);
    case "active-order":
      return adminLink("ActiveOrderDetails", { id: second, ...params });
    case "user-orders":
      return adminLink("UserActiveOrders", { type: second as "air" | "sea", ...params });
    case "admin": {
      if (second === "dashboard") return adminLink("HomeTab", { screen: "AdminDashBoard" });
      if (second === "orders") {
        if (third === "active") return adminLink("ActiveOrder", { type: "sea", ...params });
        return adminLink("AllOrders", params);
      }
      if (second === "order") {
        if (third === "new") return adminLink("AddOrder", params);
        return adminLink("OrderDetailScreen", { id: second, ...params });
      }
      if (second === "payments") return adminLink("OutstandingPaymentsList", params);
      if (second === "goods") return adminLink("HomeTab", { screen: "AdminGoodsList" });
      if (second === "containers") return adminLink("HomeTab", { screen: "ContainerList" });
      if (second === "clients") return adminLink("ClientManagement", params);
      if (second === "sms") return adminLink("SendSms", params);
      if (second === "batch") return adminLink("BatchUpdate", params);
      if (second === "search") return adminLink("GlobalSearch", params);
      if (second === "reviews") return adminLink("AdminReviews", params);
      if (second === "support" && third) return adminLink("AdminTicketDetail", { ticketId: third, ...params });
      if (second === "support") return adminLink("AdminTicketList", params);
      if (second === "promos") return adminLink("ManagePromos", params);
      if (second === "certificates") {
        if (third === "issue") return adminLink("IssueCertificate", params);
        return adminLink("CertificateHistory", params);
      }
      return adminLink("HomeTab", { screen: "AdminDashBoard" });
    }
    case "outstanding":
      return adminLink("OutstandingPaymentsList", params);
    case "shipping":
      return adminLink("ShippingMethod", params);
    case "clients": {
      if (second === "new") return adminLink("CreateConsignee", params);
      return adminLink("ClientDetails", { id: second, ...params });
    }
    case "receive":
      return adminLink("ReceiveGoods", params);
    case "admin-goods": {
      if (second === "export") return adminLink("AdminGoodsPdfExport", params);
      return adminLink("AdminGoodsDetail", { goodsId: second, ...params });
    }
    case "consignees": {
      if (second === "new") return adminLink("CreateConsignee", params);
      return adminLink("ConsigneeDetail", { consigneeId: second, ...params });
    }
    case "admin-containers": {
      if (second === "new") return adminLink("CreateContainer", params);
      return adminLink("ContainerDetail", { containerId: second, ...params });
    }
    case "routes": {
      if (second === "form") return adminLink("RouteForm", params);
      return adminLink("RouteList", params);
    }
    case "scan-qr":
      return { screen: "ScanQR", params };
    case "unassigned":
      return adminLink("UnassignedGoods", params);
    case "whatsapp": {
      return adminLink("WhatsAppRequests", { requestId: second, ...params });
    }
    case "campaigns": {
      if (second === "new") return adminLink("CreateCampaign", params);
      return adminLink("CampaignList", params);
    }
    case "announcements": {
      if (second === "new") return adminLink("CreateAnnouncement", params);
      return adminLink("CreateAnnouncement", params);
    }
    case "search":
      return adminLink("GlobalSearch", params);
    case "badges":
      return { screen: "Badges", params };
    case "reviews":
      return { screen: "MyReviews", params };
    case "promos":
      return adminLink("ManagePromos", params);
    case "activity":
      return { screen: "ActivityList", params };
    case "packing":
      return { screen: "ClientPackingList", params: { containerId: second, ...params } };
    case "loading":
      return { screen: "ClientLoadingList", params: { containerId: second, ...params } };
    case "certificate":
      return { screen: "CertificateDetail", params };
    case "stats":
      return adminLink("HomeTab", { screen: "Stats" });
    case "login":
      return { screen: "Login", params };
    case "verify":
      return { screen: "Verification", params };
    case "onboarding":
      return { screen: "OnBoarding", params };
    default:
      return null;
  }
}
