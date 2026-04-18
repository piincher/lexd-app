import React, { useState, useMemo, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FlashList } from "@shopify/flash-list";

import { RootStackScreenProps } from "@src/navigations/type";
import { userData } from "@src/constants/types";
import { useBlockandUnblockUser, useGetUsers } from "../hooks/useUserManagement";
import { useClientStats } from "../hooks/useClientStats";
import { ClientHeader } from "../components/ClientHeader";
import { SearchBar } from "../components/SearchBar";
import { ResultsBar } from "../components/ResultsBar";
import { ClientCard } from "../components/ClientCard";
import { EmptyState } from "../components/EmptyState";
import { styles } from "./ClientManagement.styles";

const SEARCH_PLACEHOLDER = "Rechercher par nom, téléphone ou email...";

export default function ClientManagement({ navigation }: RootStackScreenProps<"ClientManagement">) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingClientId, setPendingClientId] = useState<string | null>(null);
  const { data } = useGetUsers();
  const { mutate } = useBlockandUnblockUser();
  const clients = data ?? [];

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const query = searchQuery.toLowerCase();
    return clients.filter((c: userData) =>
      c.firstName?.toLowerCase().includes(query) ||
      c.lastName?.toLowerCase().includes(query) ||
      c.phoneNumber?.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query)
    );
  }, [clients, searchQuery]);

  const { total, active, blocked } = useClientStats(filteredClients);

  const handleToggleBlock = useCallback((clientId: string) => {
    setPendingClientId(clientId);
    mutate(clientId, {
      onSettled: () => {
        setPendingClientId(null);
      },
    });
  }, [mutate]);

  const renderClient = useCallback(({ item, index }: { item: userData; index: number }) => (
    <ClientCard 
      client={item} 
      onToggleBlock={handleToggleBlock} 
      index={index} 
      isLoading={pendingClientId === item._id}
    />
  ), [handleToggleBlock, pendingClientId]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" />
      
      <ClientHeader
        totalClients={clients.length}
        activeCount={active}
        blockedCount={blocked}
        navigation={navigation}
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={SEARCH_PLACEHOLDER}
      />

      {searchQuery && <ResultsBar count={filteredClients.length} />}

      <FlashList
        data={filteredClients}
        renderItem={renderClient}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}

        ListEmptyComponent={
          <EmptyState searchQuery={searchQuery} onClear={() => setSearchQuery("")} />
        }
      />
    </SafeAreaView>
  );
}
