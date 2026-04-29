import React from "react";
import { Consignee } from "../../api";
import { ConsigneeDetailMainCard } from "../ConsigneeDetailMainCard";
import { ConsigneeDetailContactCard } from "../ConsigneeDetailContactCard";
import { ConsigneeDetailAddressCard } from "../ConsigneeDetailAddressCard";
import { ConsigneeDetailStatsCard } from "../ConsigneeDetailStatsCard";

interface ConsigneeDetailInfoSectionProps {
   consignee: Consignee;
}

export const ConsigneeDetailInfoSection: React.FC<ConsigneeDetailInfoSectionProps> = ({
   consignee,
}) => {
   return (
      <>
         <ConsigneeDetailMainCard consignee={consignee} />
         <ConsigneeDetailContactCard consignee={consignee} />
         <ConsigneeDetailAddressCard consignee={consignee} />
         <ConsigneeDetailStatsCard consignee={consignee} />
      </>
   );
};
