import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./WinBackManualTriggerModal.styles";
import { useUserSearch } from "../../hooks/useWinBackQueries";
import { useManualTriggerWinBack } from "../../hooks/useWinBackMutations";
import type { TriggerType } from "../../api/winBackApi";

const TRIGGER_OPTIONS: { key: TriggerType; label: string }[] = [
  { key: "NO_SHIPMENT_30D", label: "Aucune expédition (30j)" },
  { key: "NO_APP_OPEN_14D", label: "Inactif sur l'app (14j)" },
  { key: "GOODS_UNPAID", label: "Marchandises non payées" },
  { key: "INVOICE_ABANDONED", label: "Facture abandonnée" },
];

type WinBackManualTriggerModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function WinBackManualTriggerModal({ visible, onClose }: WinBackManualTriggerModalProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<{ _id: string; firstName: string; lastName: string; phoneNumber: string } | null>(null);
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerType | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  const { data: users, isLoading: searching } = useUserSearch(search);
  const manualTrigger = useManualTriggerWinBack();

  const handleTrigger = () => {
    if (!selectedUser || !selectedTrigger) return;
    manualTrigger.mutate(
      { userId: selectedUser._id, triggerType: selectedTrigger },
      { onSuccess: () => { setSearch(""); setSelectedUser(null); setSelectedTrigger(null); onClose(); } }
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent presentationStyle="overFullScreen" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Déclencher manuellement</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content} ref={scrollViewRef}>
            {/* User search */}
            <Text style={styles.label}>Rechercher un utilisateur</Text>
            <View style={styles.searchRow}>
              <MaterialCommunityIcons name="magnify" size={18} color={colors.text.secondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Nom, téléphone ou email..."
                placeholderTextColor={colors.text.disabled}
                value={search}
                onChangeText={(v) => { setSearch(v); setSelectedUser(null); }}
                onFocus={scrollToEnd}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
                  <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.secondary} />
                </TouchableOpacity>
              )}
            </View>

            {searching && <ActivityIndicator style={{ marginVertical: 12 }} color={colors.primary.main} />}

            {!searching && users && users.length > 0 && !selectedUser && (
              <View style={styles.userList}>
                {users.map((u) => (
                  <TouchableOpacity key={u._id} style={styles.userRow} onPress={() => { setSelectedUser(u); setSearch(""); }} activeOpacity={0.7}>
                    <Text style={styles.userName}>{u.firstName} {u.lastName}</Text>
                    <Text style={styles.userPhone}>{u.phoneNumber}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedUser && (
              <View style={styles.selectedUser}>
                <MaterialCommunityIcons name="account-check" size={20} color={colors.status.success} />
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <Text style={styles.userName}>{selectedUser.firstName} {selectedUser.lastName}</Text>
                  <Text style={styles.userPhone}>{selectedUser.phoneNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedUser(null)} activeOpacity={0.7}>
                  <MaterialCommunityIcons name="close-circle" size={20} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>
            )}

            {/* Trigger selection */}
            <Text style={[styles.label, { marginTop: 16 }]}>Type de déclencheur</Text>
            <View style={styles.triggerList}>
              {TRIGGER_OPTIONS.map((t) => (
                <TouchableOpacity
                  key={t.key}
                  style={[styles.triggerChip, selectedTrigger === t.key && styles.triggerChipActive]}
                  onPress={() => setSelectedTrigger(t.key)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.triggerText, selectedTrigger === t.key && styles.triggerTextActive]}>
                    {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ height: 280 }} />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.triggerButton, { backgroundColor: colors.primary.main }, (!selectedUser || !selectedTrigger) && styles.triggerButtonDisabled]}
              onPress={handleTrigger}
              disabled={!selectedUser || !selectedTrigger || manualTrigger.isPending}
              activeOpacity={0.7}
            >
              <Text style={[styles.triggerButtonText, { color: colors.text.inverse }]}>
                {manualTrigger.isPending ? "Envoi..." : "Envoyer le win-back"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
