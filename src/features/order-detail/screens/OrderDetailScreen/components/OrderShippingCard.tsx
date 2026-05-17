import React from "react";
import { Card } from "react-native-paper";
import { productType } from '@src/shared/types/order';
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getOrderShippingCardStyles } from "./OrderShippingCard.styles";
import { OrderShippingCardHeader } from "./OrderShippingCardHeader";
import { OrderShippingInfoRow } from "./OrderShippingInfoRow";

interface OrderShippingCardProps {
   order: productType;
}

const formatDate = (dateStr?: string): string => {
   if (!dateStr) return "N/A";
   const d = new Date(dateStr);
   if (isNaN(d.getTime())) return "N/A";
   return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
   });
};

export const OrderShippingCard: React.FC<OrderShippingCardProps> = ({ order }) => {
   const { colors } = useAppTheme();
   const styles = getOrderShippingCardStyles(colors);

   return (
      <Card style={styles.card}>
         <OrderShippingCardHeader colors={colors} />
         <Card.Content>
            <OrderShippingInfoRow icon="map-marker-outline" label="Origine" value="Chine" colors={colors} />
            <OrderShippingInfoRow icon="map-marker-check" label="Destination" value="Bamako, Mali" colors={colors} />
            <OrderShippingInfoRow icon="progress-check" label="Statut actuel" value={order.currentStatus || "Commande passée"} colors={colors} />
            <OrderShippingInfoRow
               icon="map-marker"
               label="Position"
               value={
                  order.currentPosition?.coordinates?.[
                     order.currentPosition.coordinates.length - 1
                  ]?.location
               }
               optional
               colors={colors}
            />
            <OrderShippingInfoRow
               icon="calendar-arrow-right"
               label="Date de départ"
               value={order.departureDate ? formatDate(order.departureDate) : null}
               optional
               colors={colors}
            />
            <OrderShippingInfoRow
               icon="calendar-check"
               label="Date de réception"
               value={(order.dateOfReceipt || order.dateOfReception) ? formatDate(order.dateOfReceipt || order.dateOfReception) : null}
               optional
               colors={colors}
            />
            <OrderShippingInfoRow
               icon="update"
               label="Dernière mise à jour"
               value={formatDate(order.updatedAt)}
               colors={colors}
            />
         </Card.Content>
      </Card>
   );
};
