import React, { useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppVersionSettings } from "../hooks/useAppVersionSettings";
import { useUpdateAppVersionSettings } from "../hooks/useUpdateAppVersionSettings";
import { useVersionGateStats } from "../hooks/useVersionGateStats";
import { resetVersionGateStats, type AppVersionSettings } from "../api/versionApi";
import { VersionSummaryStats } from "../components/VersionSummaryStats";
import { PlatformVersionCard } from "../components/PlatformVersionCard";
import { VersionStatsBreakdown } from "../components/VersionStatsBreakdown";
import { RolloutSlider } from "../components/RolloutSlider";
import { createStyles } from "./AppVersionSettingsScreen.styles";

type FormValues = AppVersionSettings & { versionGateWhitelistText: string };

export default function AppVersionSettingsScreen({
  navigation,
}: RootStackScreenProps<"AppVersionSettings">) {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const { data, isLoading: settingsLoading } = useAppVersionSettings();
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useVersionGateStats();
  const update = useUpdateAppVersionSettings();

  const { control, handleSubmit, reset, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      minVersionAndroid: "",
      minVersionIos: "",
      latestVersionAndroid: "",
      latestVersionIos: "",
      forceUpdateAndroid: false,
      forceUpdateIos: false,
      updateMessage: "",
      storeUrlAndroid: "",
      storeUrlIos: "",
      rolloutPercentage: 100,
      forceUpdateAt: "",
      versionGateWhitelistText: "",
    },
  });

  const rolloutValue = watch("rolloutPercentage");

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        versionGateWhitelistText: data.versionGateWhitelist?.join(", ") ?? "",
        forceUpdateAt: data.forceUpdateAt ?? "",
      });
    }
  }, [data, reset]);

  const onSubmit = (values: FormValues) => {
    const { versionGateWhitelistText, ...rest } = values;
    update.mutate(
      {
        ...rest,
        versionGateWhitelist: versionGateWhitelistText
          ? versionGateWhitelistText.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        forceUpdateAt: values.forceUpdateAt || null,
      },
      {
        onSuccess: () => Alert.alert("Succès", "Paramètres de version enregistrés."),
        onError: (error: Error) =>
          Alert.alert("Erreur", error.message || "Échec de la mise à jour."),
      }
    );
  };

  const handleReset = () => {
    Alert.alert(
      "Réinitialiser les statistiques",
      "Êtes-vous sûr de vouloir réinitialiser les statistiques ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Réinitialiser",
          style: "destructive",
          onPress: () =>
            resetVersionGateStats()
              .then(() => {
                Alert.alert("Succès", "Statistiques réinitialisées.");
                refetchStats();
              })
              .catch((e: Error) => Alert.alert("Erreur", e.message || "Échec")),
        },
      ]
    );
  };

  if (settingsLoading || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Versions</Text>
        </View>
        <View style={styles.state}>
          <MaterialCommunityIcons name="loading" size={32} color={colors.primary.main} />
          <Text style={styles.stateText}>Chargement des paramètres...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Versions</Text>
          <Text style={styles.headerSubtitle}>Paramètres de mise à jour</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {/* Stats Summary */}
          <VersionSummaryStats stats={stats} isLoading={statsLoading} />

          {/* Stats Breakdown */}
          <VersionStatsBreakdown stats={stats} isLoading={statsLoading} />

          {/* Android Card */}
          <Controller
            control={control}
            name="forceUpdateAndroid"
            render={({ field: { value: forceUpdate, onChange: onForceUpdateChange } }) => (
              <PlatformVersionCard
                platform="android"
                minVersion={watch("minVersionAndroid")}
                latestVersion={watch("latestVersionAndroid")}
                forceUpdate={forceUpdate}
                storeUrl={watch("storeUrlAndroid")}
                onMinVersionChange={(v) => setValue("minVersionAndroid", v)}
                onLatestVersionChange={(v) => setValue("latestVersionAndroid", v)}
                onForceUpdateChange={onForceUpdateChange}
                onStoreUrlChange={(v) => setValue("storeUrlAndroid", v)}
              />
            )}
          />

          {/* iOS Card */}
          <Controller
            control={control}
            name="forceUpdateIos"
            render={({ field: { value: forceUpdate, onChange: onForceUpdateChange } }) => (
              <PlatformVersionCard
                platform="ios"
                minVersion={watch("minVersionIos")}
                latestVersion={watch("latestVersionIos")}
                forceUpdate={forceUpdate}
                storeUrl={watch("storeUrlIos")}
                onMinVersionChange={(v) => setValue("minVersionIos", v)}
                onLatestVersionChange={(v) => setValue("latestVersionIos", v)}
                onForceUpdateChange={onForceUpdateChange}
                onStoreUrlChange={(v) => setValue("storeUrlIos", v)}
              />
            )}
          />

          {/* Rollout Slider */}
          <Controller
            control={control}
            name="rolloutPercentage"
            render={({ field: { onChange } }) => (
              <RolloutSlider value={rolloutValue} onChange={onChange} />
            )}
          />

          {/* General Settings */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Paramètres généraux</Text>

            <Controller
              control={control}
              name="updateMessage"
              render={({ field: { onChange, value } }) => (
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Message de mise à jour</Text>
                  <View style={[styles.input, styles.textArea]}>
                    <MaterialCommunityIcons name="message-text-outline" size={16} color={colors.text.secondary} />
                    <Text
                      style={styles.inputText}
                      onPress={() => {
                        Alert.alert("Message", value || "Aucun message", [
                          { text: "OK" },
                        ]);
                      }}
                    >
                      {value || "Appuyez pour voir le message..."}
                    </Text>
                  </View>
                </View>
              )}
            />

            <Controller
              control={control}
              name="forceUpdateAt"
              render={({ field: { onChange, value } }) => (
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Mise à jour forcée planifiée</Text>
                  <View style={styles.input}>
                    <MaterialCommunityIcons name="calendar-clock" size={16} color={colors.text.secondary} />
                    <Text style={styles.inputText}>{value || "Non planifiée"}</Text>
                  </View>
                </View>
              )}
            />

            <Controller
              control={control}
              name="versionGateWhitelistText"
              render={({ field: { onChange, value } }) => (
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Appareils de test (whitelist)</Text>
                  <View style={[styles.input, styles.textArea]}>
                    <MaterialCommunityIcons name="devices" size={16} color={colors.text.secondary} />
                    <Text style={styles.inputText}>{value || "Aucun"}</Text>
                  </View>
                </View>
              )}
            />
          </View>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: colors.primary.main }]}
              onPress={handleSubmit(onSubmit)}
              disabled={update.isPending}
              activeOpacity={0.7}
            >
              <Text style={[styles.saveButtonText, { color: colors.text.inverse }]}>
                {update.isPending ? "Enregistrement..." : "Enregistrer"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: colors.status.error + "12" }]}
              onPress={handleReset}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="refresh" size={16} color={colors.status.error} />
              <Text style={[styles.resetButtonText, { color: colors.status.error }]}>
                Réinitialiser les stats
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
