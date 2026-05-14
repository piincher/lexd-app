import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";

import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useCampaignList } from "../hooks/useCampaignList";
import { CampaignCard } from "../components/CampaignCard";
import { CampaignFilterChips } from "../components/CampaignFilterChips";
import { CampaignEmptyState } from "../components/CampaignEmptyState";
import { createStyles } from "./CampaignListScreen.styles";

const CampaignListScreen = ({
  navigation,
}: RootStackScreenProps<"CampaignList">) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    campaigns,
    isLoading,
    refetch,
    activeFilter,
    setActiveFilter,
    sendingId,
    handleCancel,
    handleSendNow,
  } = useCampaignList();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campagnes Push</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("CreateCampaign")}
        >
          <Ionicons name="add" size={22} color={colors.text.inverse} />
        </TouchableOpacity>
      </View>

      <CampaignFilterChips
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      />

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color={colors.primary.main} />
      ) : campaigns.length === 0 ? (
        <CampaignEmptyState onCreate={() => navigation.navigate("CreateCampaign")} />
      ) : (
        <FlashList
          data={campaigns}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          onRefresh={refetch}
          refreshing={isLoading}
          renderItem={({ item }) => (
            <CampaignCard
              campaign={item}
              onCancel={handleCancel}
              onSendNow={handleSendNow}
              isSending={sendingId === item._id}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default CampaignListScreen;
