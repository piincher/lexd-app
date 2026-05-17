import React from "react";
import { PaymentInfoRow } from "./PaymentInfoRow";
import { productType } from "@src/shared/types/order";

const formatCurrency = (amount?: number | null): string =>
  `${(amount ?? 0).toLocaleString("fr-FR")} FCFA`;

interface ShippingDetailsProps {
  order: productType;
  isAir: boolean;
  cbmValue: string;
}

export const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  order,
  isAir,
  cbmValue,
}) => {
  if (isAir) {
    return (
      <>
        {order.packageWeight ? (
          <PaymentInfoRow
            icon="weight"
            label="Poids"
            value={`${order.packageWeight} kg`}
          />
        ) : null}
        {order.unitPrice ? (
          <PaymentInfoRow
            icon="tag"
            label="Prix unitaire"
            value={`${formatCurrency(order.unitPrice)}/kg`}
          />
        ) : null}
      </>
    );
  }

  return (
    <>
      <PaymentInfoRow
        icon="ruler-square"
        label="CBM"
        value={cbmValue ? `${cbmValue} m³` : "N/A"}
      />
      {order.unitPrice ? (
        <PaymentInfoRow
          icon="tag"
          label="Prix unitaire"
          value={`${formatCurrency(order.unitPrice)}/m³`}
        />
      ) : null}
    </>
  );
};
