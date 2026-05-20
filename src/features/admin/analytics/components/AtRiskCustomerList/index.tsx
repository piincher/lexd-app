import React from "react";
import { View, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { AtRiskCustomerCard } from "../AtRiskCustomerCard";
import { AtRiskEmptyState } from "../AtRiskEmptyState";
import type { AtRiskCustomer } from "../../types";

type AtRiskCustomerListProps = {
  customers: AtRiskCustomer[];
  isLoading: boolean;
  searchActive: boolean;
  onWhatsApp: (c: AtRiskCustomer) => void;
  onCall: (c: AtRiskCustomer) => void;
  onDetail: (c: AtRiskCustomer) => void;
  onWinBack: (c: AtRiskCustomer) => void;
};

export function AtRiskCustomerList({ customers, isLoading, searchActive, onWhatsApp, onCall, onDetail, onWinBack }: AtRiskCustomerListProps) {
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (customers.length === 0) {
    return <AtRiskEmptyState searchActive={searchActive} />;
  }

  return (
    <FlashList
      data={customers}
      keyExtractor={(item, index) => `${item.userId}-${index}`}
      renderItem={({ item }) => (
        <AtRiskCustomerCard
          customer={item}
          onWhatsApp={onWhatsApp}
          onCall={onCall}
          onDetail={onDetail}
          onWinBack={onWinBack}
        />
      )}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}
