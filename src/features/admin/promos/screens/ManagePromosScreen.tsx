import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useManagePromos } from "../hooks/useManagePromos";
import { usePromoForm } from "../hooks/usePromoForm";
import { PromoFilters } from "../components/PromoFilters";
import { PromoList } from "../components/PromoList";
import { PromoForm } from "../components/PromoForm";
import { PromoStatsModal } from "../components/PromoStatsModal";
import { PromoSummaryStats } from "../components/PromoSummaryStats";
import type { PromoRecord } from "../api/promoAdminApi";
import { createStyles } from "./ManagePromosScreen.styles";

export default function ManagePromosScreen({ navigation }: RootStackScreenProps<"ManagePromos">) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [statsPromo, setStatsPromo] = useState<PromoRecord | null>(null);

  const {
    activeFilter, activeType, search, page, promos, pagination, summary,
    isLoading, isRefetching, refetch,
    handleFilterChange, handleTypeChange, handleSearchChange,
    handleNextPage, handlePrevPage, handleDeactivate, handleClone,
  } = useManagePromos();

  const {
    showForm, editingPromo, form, isSubmitting,
    openCreateForm, openEditForm, closeForm, handleFormChange, handleOptionChange, handleSubmit,
  } = usePromoForm();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Gestion des Promotions</Text>
            <Text style={styles.headerSubtitle}>
              {pagination.total} promotion{pagination.total !== 1 ? "s" : ""} au total
            </Text>
          </View>
        </View>
      </View>

      {/* Summary stats */}
      <PromoSummaryStats summary={summary} />

      {/* Filters */}
      <View style={styles.filterContainer}>
        <PromoFilters
          activeFilter={activeFilter}
          activeType={activeType}
          search={search}
          onFilterChange={handleFilterChange}
          onTypeChange={handleTypeChange}
          onSearchChange={handleSearchChange}
        />
      </View>

      {/* List */}
      <PromoList
        promos={promos}
        isLoading={isLoading}
        isRefetching={isRefetching}
        refetch={refetch}
        activeFilter={activeFilter}
        page={page}
        totalPages={pagination.totalPages}
        onEdit={openEditForm}
        onDeactivate={handleDeactivate}
        onStats={(promo) => setStatsPromo(promo)}
        onClone={handleClone}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onResetFilter={() => {
          handleFilterChange("all");
          handleTypeChange("all");
          handleSearchChange("");
        }}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={openCreateForm} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color={colors.text.inverse} />
      </TouchableOpacity>

      {/* Form Modal */}
      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.backButton} onPress={closeForm} activeOpacity={0.7}>
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>
              {editingPromo ? "Modifier la promotion" : "Créer une promotion"}
            </Text>
          </View>
          <PromoForm
            form={form}
            onChange={handleFormChange}
            onOptionChange={handleOptionChange}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            isSubmitting={isSubmitting}
            isEditing={!!editingPromo}
          />
        </SafeAreaView>
      </Modal>

      {/* Stats Modal */}
      <PromoStatsModal visible={!!statsPromo} promo={statsPromo} onClose={() => setStatsPromo(null)} />
    </SafeAreaView>
  );
}
