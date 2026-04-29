/**
 * Deep Link URL Parser
 *
 * Parses deep link URLs into screen name and navigation params.
 * Supports both custom scheme (chinalinkexpress://) and universal links.
 */

export interface ParsedLink {
  screen: string;
  params?: Record<string, unknown>;
}

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
      if (second === "history") return { screen: "PaymentHistoryScreen", params };
      if (second === "portal") return { screen: "MyPaymentHistory", params };
      if (second === "confirmation") return { screen: "MyPaymentHistory", params };
      if (second) return { screen: "UserPaymentDetail", params: { paymentId: second, ...params } };
      return { screen: "MyPaymentHistory", params };
    }
    case "faq":
      return { screen: "faq", params };
    case "about":
      return { screen: "AboutUs", params };
    case "route-check":
      return { screen: "CheckRoute", params };
    case "batch":
      return { screen: "BatchUpdateDetail", params: { data: second, ...params } };
    case "scan":
      return { screen: "ScanQRCode", params };
    case "active-order":
      return { screen: "ActiveOrderDetails", params: { id: second, ...params } };
    case "user-orders":
      return { screen: "UserActiveOrders", params: { type: second as "air" | "sea", ...params } };
    case "admin": {
      if (second === "dashboard") return { screen: "HomeTab", params: { screen: "AdminDashBoard" } };
      if (second === "orders") {
        if (third === "active") return { screen: "ActiveOrder", params: { type: "sea", ...params } };
        return { screen: "AllOrders", params };
      }
      if (second === "order") {
        if (third === "new") return { screen: "AddOrder", params };
        return { screen: "OrderDetailScreen", params: { id: second, ...params } };
      }
      if (second === "payments") return { screen: "OutstandingPaymentsList", params };
      if (second === "goods") return { screen: "HomeTab", params: { screen: "AdminGoodsList" } };
      if (second === "containers") return { screen: "HomeTab", params: { screen: "ContainerList" } };
      if (second === "clients") return { screen: "ClientManagement", params };
      if (second === "sms") return { screen: "SendSms", params };
      if (second === "batch") return { screen: "BatchUpdate", params };
      if (second === "search") return { screen: "GlobalSearch", params };
      if (second === "reviews") return { screen: "AdminReviews", params };
      if (second === "support" && third) return { screen: "AdminTicketDetail", params: { ticketId: third, ...params } };
      if (second === "support") return { screen: "AdminTicketList", params };
      if (second === "promos") return { screen: "ManagePromos", params };
      if (second === "certificates") {
        if (third === "issue") return { screen: "IssueCertificate", params };
        return { screen: "CertificateHistory", params };
      }
      return { screen: "HomeTab", params: { screen: "AdminDashBoard" } };
    }
    case "outstanding":
      return { screen: "OutstandingPaymentsList", params };
    case "shipping":
      return { screen: "ShippingMethod", params };
    case "clients": {
      if (second === "new") return { screen: "CreateConsignee", params };
      return { screen: "ClientDetails", params: { id: second, ...params } };
    }
    case "receive":
      return { screen: "ReceiveGoods", params };
    case "admin-goods": {
      if (second === "export") return { screen: "AdminGoodsPdfExport", params };
      return { screen: "AdminGoodsDetail", params: { goodsId: second, ...params } };
    }
    case "consignees": {
      if (second === "new") return { screen: "CreateConsignee", params };
      return { screen: "ConsigneeDetail", params: { consigneeId: second, ...params } };
    }
    case "admin-containers": {
      if (second === "new") return { screen: "CreateContainer", params };
      return { screen: "ContainerDetail", params: { containerId: second, ...params } };
    }
    case "routes": {
      if (second === "form") return { screen: "RouteForm", params };
      return { screen: "RouteList", params };
    }
    case "scan-qr":
      return { screen: "ScanQR", params };
    case "unassigned":
      return { screen: "UnassignedGoods", params };
    case "whatsapp": {
      return { screen: "WhatsAppRequests", params: { requestId: second, ...params } };
    }
    case "campaigns": {
      if (second === "new") return { screen: "CreateCampaign", params };
      return { screen: "CampaignList", params };
    }
    case "announcements": {
      if (second === "new") return { screen: "CreateAnnouncement", params };
      return { screen: "CreateAnnouncement", params };
    }
    case "search":
      return { screen: "GlobalSearch", params };
    case "badges":
      return { screen: "Badges", params };
    case "reviews":
      return { screen: "MyReviews", params };
    case "promos":
      return { screen: "ManagePromos", params };
    case "activity":
      return { screen: "ActivityList", params };
    case "packing":
      return { screen: "ClientPackingList", params: { containerId: second, ...params } };
    case "loading":
      return { screen: "ClientLoadingList", params: { containerId: second, ...params } };
    case "certificate":
      return { screen: "CertificateDetail", params };
    case "stats":
      return { screen: "HomeTab", params: { screen: "Stats" } };
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
