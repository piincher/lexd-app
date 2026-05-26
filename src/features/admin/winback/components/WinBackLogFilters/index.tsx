import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./WinBackLogFilters.styles";


const TRIGGER_OPTIONS: { key: string; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "NO_SHIPMENT_30D", label: "Aucune expédition" },
  { key: "NO_APP_OPEN_14D", label: "Inactif" },
  { key: "GOODS_UNPAID", label: "Non payé" },
  { key: "INVOICE_ABANDONED", label: "Facture" },
];

const RESPONSE_OPTIONS: { key: string; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "NONE", label: "En attente" },
  { key: "APP_OPEN", label: "App ouverte" },
  { key: "PAYMENT", label: "Paiement" },
  { key: "ORDER_CREATED", label: "Commande" },
  { key: "PROMO_USED", label: "Promo utilisé" },
];

type WinBackLogFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  triggerFilter: string;
  onTriggerFilterChange: (key: string) => void;
  responseFilter: string;
  onResponseFilterChange: (key: string) => void;
};

export function WinBackLogFilters({
  search,
  onSearchChange,
  triggerFilter,
  onTriggerFilterChange,
  responseFilter,
  onResponseFilterChange,
}: WinBackLogFiltersProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <MaterialCommunityIcons name="magnify" size={18} color={colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par nom ou téléphone..."
          placeholderTextColor={colors.text.disabled}
          value={search}
          onChangeText={onSearchChange}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange("")} activeOpacity={0.7}>
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
        {TRIGGER_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.chip, triggerFilter === opt.key && styles.chipActive]}
            onPress={() => onTriggerFilterChange(opt.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, triggerFilter === opt.key && styles.chipTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
        {RESPONSE_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.chipSmall, responseFilter === opt.key && styles.chipSmallActive]}
            onPress={() => onResponseFilterChange(opt.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipSmallText, responseFilter === opt.key && styles.chipSmallTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
