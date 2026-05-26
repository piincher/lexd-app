import { productType } from "@src/shared/types/order";

export type PastOrdersSummary = {
  total: number;
  paid: number;
  unpaid: number;
  totalValue: number;
};

export const getOrderAmount = (order: productType): number =>
  order.priceTotal ?? order.calculatedTotal ?? order.totalCost ?? 0;

export const isOrderPaid = (order: productType): boolean =>
  order.paymentStatus === "Paid" || order.paymentStatus === "PAID";

export const getPastOrdersSummary = (orders: productType[]): PastOrdersSummary =>
  orders.reduce(
    (summary, order) => {
      const paid = isOrderPaid(order);

      return {
        total: summary.total + 1,
        paid: summary.paid + (paid ? 1 : 0),
        unpaid: summary.unpaid + (paid ? 0 : 1),
        totalValue: summary.totalValue + getOrderAmount(order),
      };
    },
    { total: 0, paid: 0, unpaid: 0, totalValue: 0 },
  );

export const filterPastOrdersBySearch = (
  orders: productType[],
  searchQuery: string,
): productType[] => {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return orders;

  return orders.filter((order) => {
    const fields = [
      order.code,
      order.clientName,
      order.clientPhone,
      order.destinationCountry,
      order.partenaire,
      order.category?.name,
      order.contenairNumber,
    ];

    return fields.some((field) => String(field || "").toLowerCase().includes(query));
  });
};
