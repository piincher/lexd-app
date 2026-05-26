import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView, TextInput, Switch } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./WinBackConfigModal.styles";
import type { WinBackConfig, Channel } from "../../api/winBackApi";

const ALL_CHANNELS: { key: Channel; label: string; icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"] }[] = [
  { key: "push", label: "Push", icon: "bell-outline" },
  { key: "whatsapp", label: "WhatsApp", icon: "whatsapp" },
  { key: "in_app", label: "In-App", icon: "cellphone" },
];

type WinBackConfigModalProps = {
  visible: boolean;
  config: WinBackConfig | null;
  onClose: () => void;
  onSave: (triggerType: string, updates: Partial<WinBackConfig>) => void;
  isSaving: boolean;
};

export function WinBackConfigModal({ visible, config, onClose, onSave, isSaving }: WinBackConfigModalProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  const [form, setForm] = useState<Partial<WinBackConfig>>({});

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  useEffect(() => {
    if (config) setForm({ ...config });
  }, [config, visible]);

  if (!config) return null;

  const toggleChannel = (channel: Channel) => {
    const current = (form.channels || []) as Channel[];
    const next = current.includes(channel) ? current.filter((c) => c !== channel) : [...current, channel];
    setForm((f) => ({ ...f, channels: next }));
  };

  const handleSave = () => {
    onSave(config.triggerType, {
      enabled: form.enabled,
      priority: Number(form.priority),
      cooldownDays: Number(form.cooldownDays),
      globalCooldownDays: Number(form.globalCooldownDays),
      maxPerDay: Number(form.maxPerDay),
      includePromoCode: form.includePromoCode,
      promoCodeType: form.promoCodeType,
      promoCodeValue: Number(form.promoCodeValue),
      promoCodeExpiryDays: Number(form.promoCodeExpiryDays),
      channels: form.channels,
      messageTemplatePush: form.messageTemplatePush,
      messageTemplateWhatsApp: form.messageTemplateWhatsApp,
      quietHoursRespected: form.quietHoursRespected,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent presentationStyle="overFullScreen" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Modifier la configuration</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content} ref={scrollViewRef}>
            {/* Enabled toggle */}
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Activé</Text>
              <Switch
                value={!!form.enabled}
                onValueChange={(v) => setForm((f) => ({ ...f, enabled: v }))}
                trackColor={{ false: colors.neutral[300], true: colors.primary.main }}
              />
            </View>

            {/* Numeric fields */}
            <View style={styles.grid2}>
              <View style={styles.field}>
                <Text style={styles.label}>Priorité</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  value={String(form.priority ?? 0)}
                  onChangeText={(v) => setForm((f) => ({ ...f, priority: Number(v) }))}
                  onFocus={scrollToEnd}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Max/jour</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  value={String(form.maxPerDay ?? 100)}
                  onChangeText={(v) => setForm((f) => ({ ...f, maxPerDay: Number(v) }))}
                  onFocus={scrollToEnd}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Cooldown (j)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  value={String(form.cooldownDays ?? 14)}
                  onChangeText={(v) => setForm((f) => ({ ...f, cooldownDays: Number(v) }))}
                  onFocus={scrollToEnd}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Global cooldown (j)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  value={String(form.globalCooldownDays ?? 5)}
                  onChangeText={(v) => setForm((f) => ({ ...f, globalCooldownDays: Number(v) }))}
                  onFocus={scrollToEnd}
                />
              </View>
            </View>

            {/* Channels */}
            <Text style={styles.sectionTitle}>Canaux</Text>
            <View style={styles.channelsRow}>
              {ALL_CHANNELS.map((ch) => {
                const active = (form.channels || []).includes(ch.key);
                return (
                  <TouchableOpacity
                    key={ch.key}
                    style={[styles.channelChip, active && styles.channelChipActive]}
                    onPress={() => toggleChannel(ch.key)}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons name={ch.icon} size={18} color={active ? colors.text.inverse : colors.text.secondary} />
                    <Text style={[styles.channelText, active && styles.channelTextActive]}>{ch.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Promo settings */}
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Inclure un code promo</Text>
              <Switch
                value={!!form.includePromoCode}
                onValueChange={(v) => setForm((f) => ({ ...f, includePromoCode: v }))}
                trackColor={{ false: colors.neutral[300], true: colors.primary.main }}
              />
            </View>

            {form.includePromoCode && (
              <View style={styles.grid2}>
                <View style={styles.field}>
                  <Text style={styles.label}>Type</Text>
                  <View style={styles.segmentRow}>
                    {(["PERCENTAGE", "FIXED_AMOUNT"] as const).map((t) => (
                      <TouchableOpacity
                        key={t}
                        style={[styles.segment, form.promoCodeType === t && styles.segmentActive]}
                        onPress={() => setForm((f) => ({ ...f, promoCodeType: t }))}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.segmentText, form.promoCodeType === t && styles.segmentTextActive]}>
                          {t === "PERCENTAGE" ? "%" : "Fixe"}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Valeur</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={String(form.promoCodeValue ?? 10)}
                    onChangeText={(v) => setForm((f) => ({ ...f, promoCodeValue: Number(v) }))}
                    onFocus={scrollToEnd}
                  />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Expiration (j)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={String(form.promoCodeExpiryDays ?? 7)}
                    onChangeText={(v) => setForm((f) => ({ ...f, promoCodeExpiryDays: Number(v) }))}
                    onFocus={scrollToEnd}
                  />
                </View>
              </View>
            )}

            {/* Message templates */}
            <Text style={styles.sectionTitle}>Message Push</Text>
            <View style={styles.field}>
              <Text style={styles.label}>Titre</Text>
              <TextInput
                style={styles.input}
                value={form.messageTemplatePush?.title || ""}
                onChangeText={(v) =>
                  setForm((f) => ({ ...f, messageTemplatePush: { ...f.messageTemplatePush, title: v } }))
                }
                onFocus={scrollToEnd}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Corps</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={3}
                value={form.messageTemplatePush?.body || ""}
                onChangeText={(v) =>
                  setForm((f) => ({ ...f, messageTemplatePush: { ...f.messageTemplatePush, body: v } }))
                }
                onFocus={scrollToEnd}
              />
            </View>

            <Text style={styles.sectionTitle}>Message WhatsApp</Text>
            <View style={styles.field}>
              <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={3}
                value={form.messageTemplateWhatsApp || ""}
                onChangeText={(v) => setForm((f) => ({ ...f, messageTemplateWhatsApp: v }))}
                onFocus={scrollToEnd}
              />
            </View>
            <View style={{ height: 280 }} />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose} activeOpacity={0.7}>
              <Text style={[styles.footerText, { color: colors.text.secondary }]}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary.main }]} onPress={handleSave} activeOpacity={0.7} disabled={isSaving}>
              <Text style={[styles.footerText, { color: colors.text.inverse }]}>
                {isSaving ? "Enregistrement..." : "Enregistrer"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
