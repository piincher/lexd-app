import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";

import { getStyles } from "./HelpCreateTicketModal.styles";

const TICKET_TYPES = [
  { key: "GENERAL", label: "Général", icon: "help-circle" },
  { key: "ORDER_ISSUE", label: "Problème de commande", icon: "package-variant" },
  { key: "PAYMENT_ISSUE", label: "Problème de paiement", icon: "credit-card" },
  { key: "DELIVERY_ISSUE", label: "Problème de livraison", icon: "truck-delivery" },
] as const;

const PRIORITIES = [
  { key: "LOW", label: "Basse", color: "#6B7280" },
  { key: "MEDIUM", label: "Moyenne", color: "#F59E0B" },
  { key: "HIGH", label: "Haute", color: "#EF4444" },
  { key: "URGENT", label: "Urgente", color: "#DC2626" },
] as const;

type HelpCreateTicketModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: { type: string; subject: string; description: string; priority: string }) => Promise<void>;
  isPending: boolean;
  isSuccess: boolean;
};

export function HelpCreateTicketModal({ visible, onClose, onSubmit, isPending, isSuccess }: HelpCreateTicketModalProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);
  const [type, setType] = useState("GENERAL");
  const [priority, setPriority] = useState("MEDIUM");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  const handleSubmit = async () => {
    if (!subject.trim() || !description.trim()) return;
    await onSubmit({ type, subject: subject.trim(), description: description.trim(), priority });
    setSubject("");
    setDescription("");
    setType("GENERAL");
    setPriority("MEDIUM");
  };

  const canSubmit = subject.trim().length > 0 && description.trim().length > 0 && !isPending;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Nouveau ticket</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={22} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {isSuccess ? (
            <View style={styles.success}>
              <MaterialCommunityIcons name="check-circle" size={48} color={colors.status.success} />
              <Text style={styles.successTitle}>Ticket créé !</Text>
              <Text style={styles.successSubtitle}>Nous vous répondrons dans les plus brefs délais.</Text>
              <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary.main }]} onPress={onClose} activeOpacity={0.7}>
                <Text style={styles.submitText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
              <Text style={styles.sectionLabel}>Type de problème</Text>
              <View style={styles.typeGrid}>
                {TICKET_TYPES.map((t) => (
                  <TouchableOpacity
                    key={t.key}
                    style={[styles.typeCard, type === t.key && styles.typeCardActive]}
                    onPress={() => setType(t.key)}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name={t.icon as React.ComponentProps<typeof MaterialCommunityIcons>["name"]}
                      size={20}
                      color={type === t.key ? colors.primary.main : colors.text.secondary}
                    />
                    <Text style={[styles.typeLabel, type === t.key && styles.typeLabelActive]}>{t.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.sectionLabel}>Priorité</Text>
              <View style={styles.priorityRow}>
                {PRIORITIES.map((p) => (
                  <TouchableOpacity
                    key={p.key}
                    style={[styles.priorityChip, priority === p.key && { borderColor: p.color, backgroundColor: p.color + "10" }]}
                    onPress={() => setPriority(p.key)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.priorityDot, { backgroundColor: p.color }]} />
                    <Text style={[styles.priorityLabel, priority === p.key && { color: p.color, fontFamily: Fonts.bold }]}>
                      {p.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.sectionLabel}>Sujet</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={setSubject}
                placeholder="Décrivez brièvement le problème"
                placeholderTextColor={colors.text.disabled}
                maxLength={200}
                onFocus={scrollToEnd}
              />

              <Text style={styles.sectionLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Donnez-nous plus de détails..."
                placeholderTextColor={colors.text.disabled}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={5000}
                onFocus={scrollToEnd}
              />

              <View style={{ height: 280 }} />

              <TouchableOpacity
                style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
                onPress={handleSubmit}
                disabled={!canSubmit}
                activeOpacity={0.7}
              >
                {isPending ? (
                  <ActivityIndicator size="small" color={colors.text.inverse} />
                ) : (
                  <Text style={styles.submitText}>Créer le ticket</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}
