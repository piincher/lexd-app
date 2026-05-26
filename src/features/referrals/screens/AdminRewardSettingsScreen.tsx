import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RewardSettingsField } from '../components/RewardSettingsField';
import { RewardSettingsPreview } from '../components/RewardSettingsPreview';
import { RewardSettingsSection } from '../components/RewardSettingsSection';
import { RewardSettingsToggle } from '../components/RewardSettingsToggle';
import { RewardLedgerList } from '../components/RewardLedgerList';
import { useAdminRewards } from '../hooks/useRewards';
import type { RewardSettings } from '../types';
import { createStyles } from './AdminRewardSettingsScreen.styles';

const toText = (value?: number | boolean) => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
};

export const AdminRewardSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    settings,
    ledger,
    form,
    updateField,
    resetForm,
    validation,
    isDirty,
    isSaving,
    handleSave,
  } = useAdminRewards();

  useEffect(() => {
    if (settings.data) {
      resetForm();
    }
  }, [settings.data, resetForm]);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const currentSettings = settings.data;
  const isEnabled = form.enabled ?? currentSettings?.enabled ?? true;
  const hasErrors = !validation.isValid;

  if (settings.isLoading) {
    return (
      <Screen header={{ title: 'Récompenses', showBack: true, onBackPress: handleBack }}>
        <View style={styles.state}>
          <ActivityIndicator color={colors.primary.main} />
        </View>
      </Screen>
    );
  }

  if (settings.isError || !currentSettings) {
    return (
      <Screen header={{ title: 'Récompenses', showBack: true, onBackPress: handleBack }}>
        <View style={styles.state}>
          <MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.error} />
          <Text style={styles.stateText}>Impossible de charger les paramètres.</Text>
          <TouchableOpacity onPress={() => settings.refetch()}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen header={{ title: 'Récompenses', showBack: true, onBackPress: handleBack }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* System Toggle */}
          <RewardSettingsSection
            title="Statut du système"
            icon="power"
            color={isEnabled ? colors.status.success : colors.status.error}
          >
            <RewardSettingsToggle
              enabled={isEnabled}
              onChange={(value) => updateField('enabled', value)}
              disabled={isSaving}
            />
            <View style={[styles.statusBanner, { backgroundColor: isEnabled ? colors.status.success + '10' : colors.status.error + '10' }]}>
              <MaterialCommunityIcons
                name={isEnabled ? 'information-outline' : 'alert-outline'}
                size={16}
                color={isEnabled ? colors.status.success : colors.status.error}
              />
              <Text style={[styles.statusText, { color: isEnabled ? colors.status.success : colors.status.error }]}>
                {isEnabled
                  ? 'Le système est actif. Les clients gagnent des points sur chaque livraison et peuvent faire des demandes de rédemption.'
                  : 'Le système est inactif. Aucun point ne sera attribué et les demandes de rédemption sont bloquées.'}
              </Text>
            </View>
          </RewardSettingsSection>

          {/* Earning Rules */}
          <RewardSettingsSection title="Règles de gain" icon="trophy-outline" color={colors.accent.gold}>
            <RewardSettingsField
              label="Unité CBM"
              value={toText(form.cbmUnit)}
              onChangeText={(v) => updateField('cbmUnit', v)}
              icon="cube-outline"
              helpText="Volume minimal pour gagner des points en expédition maritime. Ex: 0.1 = 1 point tous les 0.1 CBM."
              error={validation.errors.cbmUnit}
              suffix="CBM"
              disabled={isSaving || !isEnabled}
            />
            <RewardSettingsField
              label="Points par unité CBM"
              value={toText(form.pointsPerCbmUnit)}
              onChangeText={(v) => updateField('pointsPerCbmUnit', v)}
              icon="star-circle-outline"
              helpText="Nombre de points attribués par tranche d'unité CBM."
              error={validation.errors.pointsPerCbmUnit}
              suffix="pts"
              disabled={isSaving || !isEnabled}
            />
            <RewardSettingsField
              label="Unité KG"
              value={toText(form.kgUnit)}
              onChangeText={(v) => updateField('kgUnit', v)}
              icon="weight-kilogram"
              helpText="Poids minimal pour gagner des points en expédition aérienne. Ex: 10 = 1 point tous les 10 kg."
              error={validation.errors.kgUnit}
              suffix="KG"
              disabled={isSaving || !isEnabled}
            />
            <RewardSettingsField
              label="Points par unité KG"
              value={toText(form.pointsPerKgUnit)}
              onChangeText={(v) => updateField('pointsPerKgUnit', v)}
              icon="star-circle-outline"
              helpText="Nombre de points attribués par tranche d'unité KG."
              error={validation.errors.pointsPerKgUnit}
              suffix="pts"
              disabled={isSaving || !isEnabled}
            />
          </RewardSettingsSection>

          {/* Redemption Rules */}
          <RewardSettingsSection
            title="Règles de rédemption"
            icon="ticket-percent-outline"
            color={colors.primary.main}
          >
            <RewardSettingsField
              label="Valeur d'un point"
              value={toText(form.pointValueFCFA)}
              onChangeText={(v) => updateField('pointValueFCFA', v)}
              icon="cash"
              helpText="Valeur monétaire d'un point en FCFA."
              error={validation.errors.pointValueFCFA}
              suffix="FCFA"
              disabled={isSaving || !isEnabled}
            />
            <RewardSettingsField
              label="Réduction max facture"
              value={toText(form.maxInvoiceDiscountPercent)}
              onChangeText={(v) => updateField('maxInvoiceDiscountPercent', v)}
              icon="percent-outline"
              helpText="Pourcentage maximum du solde d'une facture pouvant être payé avec des points."
              error={validation.errors.maxInvoiceDiscountPercent}
              suffix="%"
              disabled={isSaving || !isEnabled}
            />
            <RewardSettingsField
              label="Minimum de rédemption"
              value={toText(form.minRedemptionPoints)}
              onChangeText={(v) => updateField('minRedemptionPoints', v)}
              icon="arrow-down-bold-circle-outline"
              helpText="Nombre minimum de points requis pour faire une demande de rédemption."
              error={validation.errors.minRedemptionPoints}
              suffix="pts"
              disabled={isSaving || !isEnabled}
              keyboardType="number-pad"
            />
          </RewardSettingsSection>

          {/* Preview Calculator */}
          {isEnabled && (
            <RewardSettingsSection
              title="Aperçu du calcul"
              icon="calculator-variant-outline"
              color={colors.accent.sky}
            >
              <RewardSettingsPreview settings={form as RewardSettings} />
            </RewardSettingsSection>
          )}

          {/* Ledger */}
          <RewardSettingsSection
            title="Grand livre des récompenses"
            icon="book-open-variant"
            color={colors.accent.mint}
          >
            {ledger.isLoading ? (
              <ActivityIndicator color={colors.primary.main} />
            ) : ledger.isError ? (
              <View style={styles.ledgerError}>
                <Text style={styles.ledgerErrorText}>Historique indisponible.</Text>
              </View>
            ) : (
              <RewardLedgerList entries={ledger.data?.items || []} />
            )}
          </RewardSettingsSection>

          {/* Bottom padding for scroll */}
          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Sticky Action Bar */}
        <View style={[styles.actionBar, { borderTopColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.resetButton, (!isDirty || isSaving) && styles.actionDisabled]}
            onPress={resetForm}
            disabled={!isDirty || isSaving}
          >
            <MaterialCommunityIcons name="restore" size={16} color={colors.text.secondary} />
            <Text style={styles.resetText}>Réinitialiser</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.saveButton,
              (!isDirty || hasErrors || isSaving) && styles.actionDisabled,
              isDirty && !hasErrors && { backgroundColor: colors.primary.main },
            ]}
            onPress={handleSave}
            disabled={!isDirty || hasErrors || isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color={colors.text.inverse} />
            ) : (
              <>
                <MaterialCommunityIcons name="content-save-outline" size={16} color={colors.text.inverse} />
                <Text style={styles.saveText}>Enregistrer</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default AdminRewardSettingsScreen;
