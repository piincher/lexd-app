import React from "react";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useCertificateHistory } from "../hooks/useCertificateHistory";
import { CertificateHistoryHeader } from "../components/CertificateHistoryHeader";
import { CertificateFilterChips } from "../components/CertificateFilterChips";
import { CertificateHistoryList } from "../components/CertificateHistoryList";
import { createStyles } from "./CertificateHistoryScreen.styles";

export default function CertificateHistoryScreen({
  navigation,
}: RootStackScreenProps<"CertificateHistory">) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const {
    activeFilter,
    certificates,
    isLoading,
    isRefetching,
    refetch,
    pagination,
    page,
    download,
    isDownloading,
    handleFilterChange,
    handleNextPage,
    handlePrevPage,
  } = useCertificateHistory();

  return (
    <SafeAreaView style={styles.container}>
      <CertificateHistoryHeader onBack={() => navigation.goBack()} total={pagination.total} />
      <CertificateFilterChips activeFilter={activeFilter} onChange={handleFilterChange} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent.gold} />
          <Text style={styles.loadingText}>Chargement des certificats...</Text>
        </View>
      ) : (
        <CertificateHistoryList
          data={certificates}
          isRefetching={isRefetching}
          onRefresh={refetch}
          pagination={pagination}
          currentPage={page}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          activeFilter={activeFilter}
          onResetFilter={() => handleFilterChange("all")}
          onDownload={download}
          isDownloading={isDownloading}
          onPressCertificate={(certificate) =>
            navigation.navigate("CertificateDetailAdmin", { certificate: certificate as any })
          }
        />
      )}
    </SafeAreaView>
  );
}
