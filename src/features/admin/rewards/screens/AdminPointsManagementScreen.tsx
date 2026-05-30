import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Input } from '@src/shared/ui/Input';
import { useAdminUserPoints, useAdminAdjustPoints, useAdminUserSearch } from '../hooks/useAdminRewards';
import type { UserSearchResult } from '../api/adminRewardApi';
import { createStyles } from './AdminPointsManagementScreen.styles';

const AdminPointsManagementScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserSearchResult | null>(null);
  const [pointsDelta, setPointsDelta] = useState('');
  const [reason, setReason] = useState('');

  const search = useAdminUserSearch(searchQuery);
  const { query: pointsQuery } = useAdminUserPoints(selectedUser?._id || '');
  const adjust = useAdminAdjustPoints();

  const handleSelectUser = useCallback((user: UserSearchResult) => {
    setSelectedUser(user);
    setSearchQuery('');
  }, []);

  const handleAdjust = useCallback(() => {
    const delta = Number(pointsDelta);
    if (!delta || delta === 0) { Alert.alert('Erreur', 'Le montant doit être non nul.'); return; }
    if (!reason.trim()) { Alert.alert('Erreur', 'Le motif est obligatoire.'); return; }
    if (!selectedUser) return;
    Alert.alert('Ajuster les points', `${delta > 0 ? '+' : ''}${delta} pts pour ${selectedUser.firstName} ${selectedUser.lastName} ?`, [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Confirmer',
        onPress: () => adjust.mutate(
          { userId: selectedUser._id, pointsDelta: delta, reason: reason.trim() },
          {
            onSuccess: () => { setPointsDelta(''); setReason(''); },
          }
        ),
      },
    ]);
  }, [pointsDelta, reason, selectedUser, adjust]);

  const ledger = pointsQuery.data?.ledger || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Gestion des points</Text>
          <Text style={styles.headerSubtitle}>Rechercher et ajuster</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
          <View style={styles.searchContainer}>
            <Input
              placeholder="Nom ou téléphone..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon="search"
              fullWidth
              containerStyle={{ flex: 1, marginBottom: 0 }}
            />
          </View>

          {search.isLoading && (
            <View style={styles.empty}>
              <MaterialCommunityIcons name="loading" size={24} color={colors.primary.main} />
            </View>
          )}

          {searchQuery.trim().length >= 2 && search.data && !selectedUser && (
            <FlatList
              data={search.data}
              keyExtractor={(u) => u._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.ledgerItem, { backgroundColor: colors.background.card, borderRadius: 12, padding: 14, marginBottom: 8 }]}
                  onPress={() => handleSelectUser(item)}
                  activeOpacity={0.8}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: colors.text.primary }}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text style={{ fontSize: 13, color: colors.text.secondary, marginTop: 2 }}>
                      {item.phoneNumber}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.text.secondary} />
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>Aucun utilisateur trouvé</Text>}
              scrollEnabled={false}
            />
          )}

          {selectedUser && (
            <>
              <View style={styles.userCard}>
                <Text style={styles.userName}>{selectedUser.firstName} {selectedUser.lastName}</Text>
                <Text style={styles.userPhone}>{selectedUser.phoneNumber}</Text>
                <Text style={styles.userPoints}>{pointsQuery.data?.rewardPoints ?? 0}</Text>
                <Text style={styles.userPointsLabel}>points actuels</Text>
                <TouchableOpacity style={{ marginTop: 8 }} onPress={() => { setSelectedUser(null); setPointsDelta(''); setReason(''); }}>
                  <Text style={{ color: colors.primary.main, fontWeight: '700', fontSize: 13 }}>Changer d'utilisateur</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ajustement manuel</Text>
                <View style={styles.adjustForm}>
                  <Input
                    label="Points (+/-) *"
                    value={pointsDelta}
                    onChangeText={(v) => setPointsDelta(v.replace(/[^0-9\-]/g, ''))}
                    placeholder="Ex: +100 ou -50"
                    keyboardType="number-pad"
                    fullWidth
                  />
                  <Input
                    label="Motif *"
                    value={reason}
                    onChangeText={setReason}
                    placeholder="Raison de l'ajustement"
                    multiline
                    fullWidth
                  />
                  <TouchableOpacity style={[styles.saveButton, adjust.isPending && { opacity: 0.6 }]} onPress={handleAdjust} disabled={adjust.isPending} activeOpacity={0.8}>
                    <Text style={styles.saveButtonText}>{adjust.isPending ? 'Traitement...' : 'Ajuster les points'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Historique (20 derniers)</Text>
                {pointsQuery.isLoading ? (
                  <MaterialCommunityIcons name="loading" size={24} color={colors.primary.main} style={{ alignSelf: 'center', marginVertical: 16 }} />
                ) : ledger.length === 0 ? (
                  <Text style={styles.emptyText}>Aucune entrée</Text>
                ) : (
                  ledger.slice(0, 20).map((entry, idx) => (
                    <View key={entry.id} style={[styles.ledgerItem, idx === ledger.length - 1 && styles.ledgerItemLast]}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.ledgerNote}>{entry.note || entry.type}</Text>
                        <Text style={styles.ledgerDate}>{new Date(entry.createdAt).toLocaleDateString('fr-FR')}</Text>
                      </View>
                      <Text style={[styles.ledgerDelta, { color: entry.pointsDelta >= 0 ? colors.status.success : colors.status.error }]}>
                        {entry.pointsDelta > 0 ? '+' : ''}{entry.pointsDelta}
                      </Text>
                    </View>
                  ))
                )}
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdminPointsManagementScreen;
