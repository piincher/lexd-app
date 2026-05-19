/**
 * GoodsPdfExportScreen
 *
 * Screen for selecting a date range and exporting goods as PDF
 */

import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { DateRangePicker } from "@src/components/DateRangePicker";
import { useGoodsPdfExportScreen } from "../hooks";
import { createStyles } from "./GoodsPdfExportScreen.styles";
import { GoodsPdfExportHeader } from "../components/GoodsPdfExportHeader";
import { GoodsPdfDateSelector } from "../components/GoodsPdfDateSelector";
import { GoodsPdfPreviewCard } from "../components/GoodsPdfPreviewCard";
import { GoodsPdfExportButton } from "../components/GoodsPdfExportButton";

export const GoodsPdfExportScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const {
    navigation,
    start,
    end,
    pickerVisible,
    setPickerVisible,
    isLoading,
    goodsCount,
    onConfirm,
    onExport,
    clearDates,
  } = useGoodsPdfExportScreen();

  return (
    <SafeAreaView style={styles.container}>
      <GoodsPdfExportHeader onBack={navigation.goBack} />

      <ScrollView contentContainerStyle={styles.body}>
        <GoodsPdfDateSelector
          start={start}
          end={end}
          onOpenPicker={() => setPickerVisible(true)}
          onClear={clearDates}
        />

        <GoodsPdfPreviewCard
          isLoading={isLoading}
          goodsCount={goodsCount}
          visible={!!start && !!end}
        />

        <GoodsPdfExportButton
          onExport={onExport}
          disabled={!start || !end || isLoading}
          loading={isLoading}
        />
      </ScrollView>

      <DateRangePicker
        visible={pickerVisible}
        onDismiss={() => setPickerVisible(false)}
        onConfirm={onConfirm}
        initialRange={
          start && end
            ? { startDate: new Date(start), endDate: new Date(end) }
            : undefined
        }
      />
    </SafeAreaView>
  );
};

export default GoodsPdfExportScreen;
