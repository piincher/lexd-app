import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { DatePickerModal } from "react-native-paper-dates";
import { Fonts } from "@src/constants/Fonts";
import type { RootStackScreenProps } from "@src/navigations/type";
import { Theme } from "@src/constants/Theme";
import {
  useAdminPromos,
  useCreatePromo,
  useUpdatePromo,
  useDeactivatePromo,
} from "../hooks/usePromoAdmin";
import type {
  PromoRecord,
  PromoType,
  PromoStatus,
  PromoApplicableTo,
  PromoTargetAudience,
  CreatePromoInput,
} from "../api/promoAdminApi";

// ── Helpers ──────────────────────────────────────────────────────────────

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

const getStatusColor = (status: PromoStatus) => {
  switch (status) {
    case "ACTIVE":
      return { bg: "#DCFCE7", text: "#15803D" };
    case "INACTIVE":
      return { bg: "#FEE2E2", text: "#DC2626" };
    case "EXPIRED":
      return { bg: "#F3F4F6", text: "#6B7280" };
    default:
      return { bg: "#F3F4F6", text: "#6B7280" };
  }
};

const getStatusLabel = (status: PromoStatus) => {
  switch (status) {
    case "ACTIVE":
      return "Actif";
    case "INACTIVE":
      return "Inactif";
    case "EXPIRED":
      return "Expiré";
    default:
      return status;
  }
};

// ── Filter Chips ─────────────────────────────────────────────────────────

type FilterChip = {
  label: string;
  key: string;
  value?: string;
};

const FILTER_CHIPS: FilterChip[] = [
  { label: "Tous", key: "all" },
  { label: "Actif", key: "active", value: "ACTIVE" },
  { label: "Inactif", key: "inactive", value: "INACTIVE" },
  { label: "Expiré", key: "expired", value: "EXPIRED" },
];

// ── Picker options ───────────────────────────────────────────────────────

const PROMO_TYPE_OPTIONS: { label: string; value: PromoType }[] = [
  { label: "Pourcentage", value: "PERCENTAGE" },
  { label: "Montant fixe", value: "FIXED_AMOUNT" },
];

const APPLICABLE_TO_OPTIONS: { label: string; value: PromoApplicableTo }[] = [
  { label: "Tous", value: "ALL" },
  { label: "Maritime", value: "MARITIME" },
  { label: "Aérien", value: "AERIEN" },
  { label: "Premier envoi", value: "FIRST_ORDER" },
];

const TARGET_AUDIENCE_OPTIONS: { label: string; value: PromoTargetAudience }[] = [
  { label: "Tous", value: "ALL" },
  { label: "Nouveaux", value: "NEW" },
  { label: "Certifiés", value: "CERTIFIED" },
  { label: "Fidèles", value: "LOYAL" },
];

// ── Option Picker Component ──────────────────────────────────────────────

type OptionPickerProps<T extends string> = {
  label: string;
  options: { label: string; value: T }[];
  selected: T;
  onSelect: (value: T) => void;
};

function OptionPicker<T extends string>({ label, options, selected, onSelect }: OptionPickerProps<T>) {
  return (
    <View style={formStyles.fieldContainer}>
      <Text style={formStyles.fieldLabel}>{label}</Text>
      <View style={formStyles.optionRow}>
        {options.map((opt) => {
          const isSelected = opt.value === selected;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[formStyles.optionChip, isSelected && formStyles.optionChipSelected]}
              onPress={() => onSelect(opt.value)}
              activeOpacity={0.7}
            >
              <Text style={[formStyles.optionChipText, isSelected && formStyles.optionChipTextSelected]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ── Promo Form ───────────────────────────────────────────────────────────

type PromoFormData = {
  code: string;
  name: string;
  description: string;
  type: PromoType;
  value: string;
  maxDiscount: string;
  minOrderAmount: string;
  validFrom: string;
  validUntil: string;
  maxUsages: string;
  maxPerUser: string;
  applicableTo: PromoApplicableTo;
  targetAudience: PromoTargetAudience;
};

const EMPTY_FORM: PromoFormData = {
  code: "",
  name: "",
  description: "",
  type: "PERCENTAGE",
  value: "",
  maxDiscount: "",
  minOrderAmount: "",
  validFrom: "",
  validUntil: "",
  maxUsages: "",
  maxPerUser: "1",
  applicableTo: "ALL",
  targetAudience: "ALL",
};

const promoToForm = (promo: PromoRecord): PromoFormData => ({
  code: promo.code,
  name: promo.name,
  description: promo.description || "",
  type: promo.type,
  value: String(promo.value),
  maxDiscount: promo.maxDiscount != null ? String(promo.maxDiscount) : "",
  minOrderAmount: promo.minOrderAmount != null ? String(promo.minOrderAmount) : "",
  validFrom: promo.validFrom ? promo.validFrom.split("T")[0] : "",
  validUntil: promo.validUntil ? promo.validUntil.split("T")[0] : "",
  maxUsages: promo.maxUsages != null ? String(promo.maxUsages) : "",
  maxPerUser: String(promo.maxPerUser),
  applicableTo: promo.applicableTo,
  targetAudience: promo.targetAudience,
});

type PromoFormProps = {
  form: PromoFormData;
  onChange: (field: keyof PromoFormData, value: string) => void;
  onOptionChange: <K extends keyof PromoFormData>(field: K, value: PromoFormData[K]) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
};

const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const toDateString = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const PromoForm = ({ form, onChange, onOptionChange, onSubmit, onCancel, isSubmitting, isEditing }: PromoFormProps) => {
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showUntilPicker, setShowUntilPicker] = useState(false);

  const validFromDate = form.validFrom ? new Date(form.validFrom) : undefined;
  const validUntilDate = form.validUntil ? new Date(form.validUntil) : undefined;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView style={formStyles.scrollView} contentContainerStyle={formStyles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={formStyles.fieldContainer}>
          <Text style={formStyles.fieldLabel}>Code</Text>
          <TextInput
            style={formStyles.input}
            value={form.code}
            onChangeText={(v) => onChange("code", v.toUpperCase())}
            placeholder="ex: WELCOME20"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="characters"
          />
        </View>

        <View style={formStyles.fieldContainer}>
          <Text style={formStyles.fieldLabel}>Nom</Text>
          <TextInput
            style={formStyles.input}
            value={form.name}
            onChangeText={(v) => onChange("name", v)}
            placeholder="Nom de la promotion"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={formStyles.fieldContainer}>
          <Text style={formStyles.fieldLabel}>Description</Text>
          <TextInput
            style={[formStyles.input, formStyles.textArea]}
            value={form.description}
            onChangeText={(v) => onChange("description", v)}
            placeholder="Description (optionnel)"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
          />
        </View>

        <OptionPicker
          label="Type"
          options={PROMO_TYPE_OPTIONS}
          selected={form.type}
          onSelect={(v) => onOptionChange("type", v)}
        />

        <View style={formStyles.fieldContainer}>
          <Text style={formStyles.fieldLabel}>
            Valeur {form.type === "PERCENTAGE" ? "(%)" : "(FCFA)"}
          </Text>
          <TextInput
            style={formStyles.input}
            value={form.value}
            onChangeText={(v) => onChange("value", v)}
            placeholder={form.type === "PERCENTAGE" ? "ex: 20" : "ex: 5000"}
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>

        {form.type === "PERCENTAGE" && (
          <View style={formStyles.fieldContainer}>
            <Text style={formStyles.fieldLabel}>Réduction max (FCFA, optionnel)</Text>
            <TextInput
              style={formStyles.input}
              value={form.maxDiscount}
              onChangeText={(v) => onChange("maxDiscount", v)}
              placeholder="ex: 10000"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
        )}

        <View style={formStyles.fieldContainer}>
          <Text style={formStyles.fieldLabel}>Montant minimum commande (optionnel)</Text>
          <TextInput
            style={formStyles.input}
            value={form.minOrderAmount}
            onChangeText={(v) => onChange("minOrderAmount", v)}
            placeholder="ex: 20000"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>

        <View style={formStyles.row}>
          <View style={[formStyles.fieldContainer, { flex: 1 }]}>
            <Text style={formStyles.fieldLabel}>Valide du</Text>
            <TouchableOpacity
              style={formStyles.dateButton}
              onPress={() => setShowFromPicker(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="calendar-outline" size={18} color={form.validFrom ? "#1F2937" : "#9CA3AF"} />
              <Text style={[formStyles.dateButtonText, !form.validFrom && formStyles.dateButtonPlaceholder]}>
                {form.validFrom ? formatDisplayDate(form.validFrom) : "Sélectionner"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: 12 }} />
          <View style={[formStyles.fieldContainer, { flex: 1 }]}>
            <Text style={formStyles.fieldLabel}>Valide jusqu'au</Text>
            <TouchableOpacity
              style={formStyles.dateButton}
              onPress={() => setShowUntilPicker(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="calendar-outline" size={18} color={form.validUntil ? "#1F2937" : "#9CA3AF"} />
              <Text style={[formStyles.dateButtonText, !form.validUntil && formStyles.dateButtonPlaceholder]}>
                {form.validUntil ? formatDisplayDate(form.validUntil) : "Sélectionner"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={formStyles.row}>
          <View style={[formStyles.fieldContainer, { flex: 1 }]}>
            <Text style={formStyles.fieldLabel}>Max utilisations (optionnel)</Text>
            <TextInput
              style={formStyles.input}
              value={form.maxUsages}
              onChangeText={(v) => onChange("maxUsages", v)}
              placeholder="ex: 100"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
          <View style={{ width: 12 }} />
          <View style={[formStyles.fieldContainer, { flex: 1 }]}>
            <Text style={formStyles.fieldLabel}>Max par utilisateur</Text>
            <TextInput
              style={formStyles.input}
              value={form.maxPerUser}
              onChangeText={(v) => onChange("maxPerUser", v)}
              placeholder="1"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
        </View>

        <OptionPicker
          label="Applicable à"
          options={APPLICABLE_TO_OPTIONS}
          selected={form.applicableTo}
          onSelect={(v) => onOptionChange("applicableTo", v)}
        />

        <OptionPicker
          label="Audience cible"
          options={TARGET_AUDIENCE_OPTIONS}
          selected={form.targetAudience}
          onSelect={(v) => onOptionChange("targetAudience", v)}
        />

        <View style={formStyles.buttonRow}>
          <TouchableOpacity style={formStyles.cancelButton} onPress={onCancel} activeOpacity={0.7}>
            <Text style={formStyles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[formStyles.submitButton, isSubmitting && formStyles.submitButtonDisabled]}
            onPress={onSubmit}
            disabled={isSubmitting}
            activeOpacity={0.7}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={formStyles.submitButtonText}>{isEditing ? "Mettre à jour" : "Créer"}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DatePickerModal
        locale="fr"
        mode="single"
        visible={showFromPicker}
        onDismiss={() => setShowFromPicker(false)}
        date={validFromDate}
        onConfirm={(params) => {
          setShowFromPicker(false);
          if (params.date) {
            onChange("validFrom", toDateString(params.date));
          }
        }}
        saveLabel="Confirmer"
        label="Date de début"
        animationType="slide"
      />

      <DatePickerModal
        locale="fr"
        mode="single"
        visible={showUntilPicker}
        onDismiss={() => setShowUntilPicker(false)}
        date={validUntilDate}
        validRange={{ startDate: validFromDate }}
        onConfirm={(params) => {
          setShowUntilPicker(false);
          if (params.date) {
            onChange("validUntil", toDateString(params.date));
          }
        }}
        saveLabel="Confirmer"
        label="Date de fin"
        animationType="slide"
      />
    </KeyboardAvoidingView>
  );
};

// ── Promo Card ───────────────────────────────────────────────────────────

type PromoCardProps = {
  promo: PromoRecord;
  onEdit: (promo: PromoRecord) => void;
  onDeactivate: (promo: PromoRecord) => void;
};

const PromoCard = ({ promo, onEdit, onDeactivate }: PromoCardProps) => {
  const statusColors = getStatusColor(promo.status);
  const isPercentage = promo.type === "PERCENTAGE";

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.promoCode}>{promo.code}</Text>
          <Text style={styles.promoName}>{promo.name}</Text>
        </View>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: isPercentage ? "#DBEAFE" : "#FEF3C7" }]}>
            <Text style={[styles.badgeText, { color: isPercentage ? "#1D4ED8" : "#92400E" }]}>
              {isPercentage ? "Pourcentage" : "Fixe"}
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.badgeText, { color: statusColors.text }]}>
              {getStatusLabel(promo.status)}
            </Text>
          </View>
        </View>
      </View>

      {/* Value */}
      <View style={styles.cardRow}>
        <MaterialCommunityIcons name="tag-outline" size={16} color="#6B7280" />
        <Text style={styles.cardRowText}>
          {isPercentage ? `${promo.value}%` : `${promo.value} FCFA`}
          {promo.maxDiscount != null ? ` (max ${promo.maxDiscount} FCFA)` : ""}
        </Text>
      </View>

      {/* Dates */}
      <View style={styles.cardRow}>
        <Ionicons name="calendar-outline" size={16} color="#6B7280" />
        <Text style={styles.cardRowText}>
          {formatDate(promo.validFrom)} — {formatDate(promo.validUntil)}
        </Text>
      </View>

      {/* Usage */}
      <View style={styles.cardRow}>
        <MaterialIcons name="people-outline" size={16} color="#6B7280" />
        <Text style={styles.cardRowText}>
          {promo.currentUsages}/{promo.maxUsages ?? "∞"} utilisations
        </Text>
      </View>

      {/* Min order */}
      {promo.minOrderAmount != null && (
        <View style={styles.cardRow}>
          <MaterialIcons name="attach-money" size={16} color="#6B7280" />
          <Text style={styles.cardRowText}>Min. commande : {promo.minOrderAmount} FCFA</Text>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(promo)} activeOpacity={0.7}>
          <MaterialIcons name="edit" size={18} color="#d4a843" />
          <Text style={styles.editButtonText}>Modifier</Text>
        </TouchableOpacity>
        {promo.status === "ACTIVE" && (
          <TouchableOpacity
            style={styles.deactivateButton}
            onPress={() => onDeactivate(promo)}
            activeOpacity={0.7}
          >
            <MaterialIcons name="block" size={18} color="#DC2626" />
            <Text style={styles.deactivateButtonText}>Désactiver</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// ── Main Screen ──────────────────────────────────────────────────────────

export default function ManagePromosScreen({
  navigation,
}: RootStackScreenProps<"ManagePromos">) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoRecord | null>(null);
  const [form, setForm] = useState<PromoFormData>(EMPTY_FORM);

  const selectedChip = FILTER_CHIPS.find((c) => c.key === activeFilter)!;

  const filters = useMemo(() => {
    if (selectedChip.value) {
      return { status: selectedChip.value };
    }
    return undefined;
  }, [selectedChip]);

  const { data, isLoading, isRefetching, refetch } = useAdminPromos(filters, page);
  const createMutation = useCreatePromo();
  const updateMutation = useUpdatePromo();
  const deactivateMutation = useDeactivatePromo();

  const promos = data?.promos ?? [];
  const pagination = data?.pagination ?? { page: 1, limit: 20, total: 0, totalPages: 1 };

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key);
    setPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    if (page < pagination.totalPages) {
      setPage((p) => p + 1);
    }
  }, [page, pagination.totalPages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, [page]);

  const openCreateForm = useCallback(() => {
    setEditingPromo(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }, []);

  const openEditForm = useCallback((promo: PromoRecord) => {
    setEditingPromo(promo);
    setForm(promoToForm(promo));
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditingPromo(null);
    setForm(EMPTY_FORM);
  }, []);

  const handleFormChange = useCallback((field: keyof PromoFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleOptionChange = useCallback(<K extends keyof PromoFormData>(field: K, value: PromoFormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!form.code.trim() || !form.name.trim() || !form.value || !form.validFrom || !form.validUntil) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const payload: CreatePromoInput = {
      code: form.code.trim(),
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      type: form.type,
      value: Number(form.value),
      maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : undefined,
      minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : undefined,
      validFrom: form.validFrom,
      validUntil: form.validUntil,
      maxUsages: form.maxUsages ? Number(form.maxUsages) : undefined,
      maxPerUser: form.maxPerUser ? Number(form.maxPerUser) : undefined,
      applicableTo: form.applicableTo,
      targetAudience: form.targetAudience,
    };

    if (editingPromo) {
      updateMutation.mutate(
        { id: editingPromo._id, data: payload },
        {
          onSuccess: () => {
            Alert.alert("Succès", "Promotion mise à jour.");
            closeForm();
          },
          onError: (error) => {
            Alert.alert("Erreur", error.message || "Impossible de mettre à jour la promotion.");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          Alert.alert("Succès", "Promotion créée avec succès.");
          closeForm();
        },
        onError: (error) => {
          Alert.alert("Erreur", error.message || "Impossible de créer la promotion.");
        },
      });
    }
  }, [form, editingPromo, createMutation, updateMutation, closeForm]);

  const handleDeactivate = useCallback(
    (promo: PromoRecord) => {
      Alert.alert(
        "Désactiver la promotion",
        `Voulez-vous vraiment désactiver le code "${promo.code}" ?`,
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Désactiver",
            style: "destructive",
            onPress: () => {
              deactivateMutation.mutate(promo._id, {
                onSuccess: () => {
                  Alert.alert("Succès", "Promotion désactivée.");
                },
                onError: (error) => {
                  Alert.alert("Erreur", error.message || "Impossible de désactiver la promotion.");
                },
              });
            },
          },
        ]
      );
    },
    [deactivateMutation]
  );

  const renderPromo = useCallback(
    ({ item }: { item: PromoRecord }) => (
      <PromoCard promo={item} onEdit={openEditForm} onDeactivate={handleDeactivate} />
    ),
    [openEditForm, handleDeactivate]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Gestion des Promotions</Text>
            <Text style={styles.headerSubtitle}>
              {pagination.total} promotion{pagination.total !== 1 ? "s" : ""} au total
            </Text>
          </View>
        </View>
      </View>

      {/* Filter chips */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {FILTER_CHIPS.map((chip) => {
            const isActive = activeFilter === chip.key;
            return (
              <TouchableOpacity
                key={chip.key}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => handleFilterChange(chip.key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Loading state */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d4a843" />
          <Text style={styles.loadingText}>Chargement des promotions...</Text>
        </View>
      ) : (
        <FlashList
          data={promos}
          renderItem={renderPromo}
          keyExtractor={(item) => item._id}

          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="tag-off-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>Aucune promotion trouvée</Text>
              <Text style={styles.emptySubtitle}>
                {activeFilter !== "all"
                  ? "Essayez de modifier vos filtres"
                  : "Les promotions apparaîtront ici une fois créées"}
              </Text>
              {activeFilter !== "all" && (
                <TouchableOpacity
                  style={styles.resetFilterButton}
                  onPress={() => handleFilterChange("all")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.resetFilterText}>Réinitialiser les filtres</Text>
                </TouchableOpacity>
              )}
            </View>
          }
          ListFooterComponent={
            pagination.totalPages > 1 ? (
              <View style={styles.paginationContainer}>
                <TouchableOpacity
                  style={[styles.paginationButton, page <= 1 && styles.paginationButtonDisabled]}
                  onPress={handlePrevPage}
                  disabled={page <= 1}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color={page <= 1 ? "#D1D5DB" : "#1F2937"}
                  />
                </TouchableOpacity>
                <Text style={styles.paginationText}>
                  Page {pagination.page} / {pagination.totalPages}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.paginationButton,
                    page >= pagination.totalPages && styles.paginationButtonDisabled,
                  ]}
                  onPress={handleNextPage}
                  disabled={page >= pagination.totalPages}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={page >= pagination.totalPages ? "#D1D5DB" : "#1F2937"}
                  />
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={openCreateForm} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Form Modal */}
      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={formStyles.container}>
          <View style={formStyles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={closeForm}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
            <Text style={formStyles.headerTitle}>
              {editingPromo ? "Modifier la promotion" : "Créer une promotion"}
            </Text>
          </View>
          <PromoForm
            form={form}
            onChange={handleFormChange}
            onOptionChange={handleOptionChange}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            isEditing={!!editingPromo}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

// ── Main Styles ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },

  /* Header */
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 12 : 20,
    paddingBottom: 16,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Theme.colors.neutral[100],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: "#1F2937",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: "#6B7280",
  },

  /* Filter chips */
  filterContainer: {
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
    paddingVertical: 12,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.colors.neutral[100],
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  filterChipActive: {
    backgroundColor: "#d4a843",
    borderColor: "#d4a843",
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: "#4B5563",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
  },

  /* Loading */
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: "#6B7280",
  },

  /* List */
  listContainer: {
    padding: 16,
  },

  /* Card */
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  promoCode: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: "#1F2937",
    letterSpacing: 1,
  },
  promoName: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#6B7280",
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    textTransform: "uppercase",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  cardRowText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#4B5563",
    flex: 1,
  },

  /* Actions */
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral[100],
    paddingTop: 12,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#d4a843",
    backgroundColor: "#FFFBF0",
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "#d4a843",
  },
  deactivateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  deactivateButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "#DC2626",
  },

  /* Empty state */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: "#374151",
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 20,
  },
  resetFilterButton: {
    marginTop: 16,
    backgroundColor: Theme.colors.neutral[100],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetFilterText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: "#4B5563",
  },

  /* Pagination */
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Theme.colors.background.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  paginationButtonDisabled: {
    opacity: 0.4,
  },
  paginationText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: "#4B5563",
  },

  /* FAB */
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#d4a843",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});

// ── Form Styles ──────────────────────────────────────────────────────────

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 12 : 8,
    paddingBottom: 16,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: "#1F2937",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: "#1F2937",
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.background.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
    gap: 8,
  },
  dateButtonText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#1F2937",
    flex: 1,
  },
  dateButtonPlaceholder: {
    color: "#9CA3AF",
  },
  row: {
    flexDirection: "row",
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.colors.neutral[100],
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  optionChipSelected: {
    backgroundColor: "#d4a843",
    borderColor: "#d4a843",
  },
  optionChipText: {
    fontSize: 13,
    fontFamily: Fonts.meduim,
    color: "#4B5563",
  },
  optionChipTextSelected: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Theme.colors.neutral[100],
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: Fonts.meduim,
    color: "#6B7280",
  },
  submitButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#d4a843",
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: "#FFFFFF",
  },
});
