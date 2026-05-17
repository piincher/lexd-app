import React from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineStep } from "./TimelineStep";
import { CurrentStatusRow } from "./CurrentStatusRow";
import { useOrderTimelineStyles } from "./OrderTimeline.styles";

const STEPS = [
   { key: "pending", label: "Commande passée", icon: "clipboard-check" },
   { key: "warehouse", label: "Entrepôt", icon: "warehouse" },
   { key: "transit", label: "En transit", icon: "airplane" },
   { key: "arrived", label: "Arrivé", icon: "flag-checkered" },
   { key: "delivered", label: "Livré", icon: "check-circle" },
];

/**
 * Maps currentStatus (set by admin) to step index.
 * Exact matches against admin STATUS_ORDER keys.
 */
const CURRENT_STATUS_MAP: Record<string, number> = {
   "Order arrived at warehouse": 1,
   "Order in Processing": 1,
   "Order in Transit": 2,
   "Order in Arrived": 3,
   "Delivered": 4,
};

const getStepIndex = (status?: string, currentStatus?: string): number => {
   if (currentStatus && currentStatus in CURRENT_STATUS_MAP) {
      return CURRENT_STATUS_MAP[currentStatus];
   }

   switch (status) {
      case "Delivered":
         return 4;
      case "In Transit":
         return 2;
      case "Active":
         return 1;
      default:
         return 0;
   }
};

interface OrderTimelineProps {
   status?: string;
   currentStatus?: string;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
   status,
   currentStatus,
}) => {
   const styles = useOrderTimelineStyles();
   const activeIndex = getStepIndex(status, currentStatus);

   return (
      <Card style={styles.card}>
         <TimelineHeader />
         <Card.Content>
            <View style={styles.timeline}>
               {STEPS.map((step, index) => (
                  <TimelineStep
                     key={step.key}
                     icon={step.icon}
                     label={step.label}
                     isCompleted={index <= activeIndex}
                     isCurrent={index === activeIndex}
                     showConnector={index > 0}
                  />
               ))}
            </View>

            {currentStatus && (
               <CurrentStatusRow currentStatus={currentStatus} />
            )}
         </Card.Content>
      </Card>
   );
};
