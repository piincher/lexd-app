import React, { useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { EligibleGoodsResult, RewardRedemption } from '../types';
import { RedemptionTimeline } from './RedemptionTimeline';
import { createStyles } from './AdminRedemptionApprovalModal.styles';

interface AdminRedemptionApprovalModalProps {
  request: RewardRedemption | null;
  eligibleGoods?: EligibleGoodsResult;
  isLoadingGoods: boolean;
  selectedGoodsIds: string[];
  approvedPoints: string;
  note: string;
  reason: string;
  selectedOutstanding: number;
  selectedCapValue: number;
  selectedMaxPoints: number;
  totalOutstanding: number;
  totalCapValue: number;
  totalMaxPoints: number;
  approvedValue: number;
  canApprove: boolean;
  validationMessage: string | null;
  isApproving: boolean;
  isRejecting: boolean;
  onClose: () => void;
  onToggleGoods: (goodsId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onApprovedPointsChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onReasonChange: (value: string) => void;
  onApprove: () => void;
  onReject: () => void;
}

const formatFCFA = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;

export const AdminRedemptionApprovalModal: React.FC<AdminRedemptionApprovalModalProps> = ({
  request,
  eligibleGoods,
  isLoadingGoods,
  selectedGoodsIds,
  approvedPoints,
  note,
  reason,
  selectedOutstanding,
  selectedCapValue,
  selectedMaxPoints,
  totalOutstanding,
  totalCapValue,
  totalMaxPoints,
  approvedValue,
  canApprove,
  validationMessage,
  isApproving,
  isRejecting,
  onClose,
  onToggleGoods,
  onSelectAll,
  onDeselectAll,
  onApprovedPointsChange,
  onNoteChange,
  onReasonChange,
  onApprove,
  onReject,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const scrollViewRef = useRef<ScrollView>(null);
  const busy = isApproving || isRejecting;
  const canReject = !!reason.trim() && !busy;
  const isReadOnly = request ? ['APPROVED', 'REJECTED', 'CANCELLED'].includes(request.status) : false;
  const goodsItems = eligibleGoods?.items || [];
  const allSelected = goodsItems.length > 0 && selectedGoodsIds.length === goodsItems.length;

  if (!request) return null;

  const handleApprove = () => {
    Alert.alert(
      'Confirmer l\'approbation',
      `Approuver ${approvedPoints} points (${formatFCFA(approvedValue)}) pour ${request.user?.name || 'ce client'} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Approuver', style: 'default', onPress: onApprove },
      ]
    );
  };

  const handleReject = () => {
    Alert.alert(
      'Confirmer le rejet',
      `Rejeter cette demande de ${request.requestedPoints} points ? Les points seront restitués au client.`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Rejeter', style: 'destructive', onPress: onReject },
      ]
    );
  };

  const scrollToInput = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>Validation points</Text>
              <Text style={styles.subtitle}>{request.user?.name || 'Client'}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={onClose} disabled={busy}>
              <MaterialCommunityIcons name="close" size={20} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {/* Timeline for all statuses */}
            <RedemptionTimeline redemption={request} />

            {/* Only show approval controls for PENDING */}
            {!isReadOnly && (
              <>
                <View style={styles.divider} />

                <View style={styles.summaryBox}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Demandé</Text>
                    <Text style={styles.summaryValue}>
                      {request.requestedPoints} pts ({formatFCFA(request.requestedValueFCFA)})
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Solde sélectionné</Text>
                    <Text style={styles.summaryValue}>
                      {formatFCFA(selectedOutstanding)} / {formatFCFA(totalOutstanding)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Limite 20%</Text>
                    <Text style={styles.summaryValue}>
                      {formatFCFA(selectedCapValue)} / {formatFCFA(totalCapValue)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Max points</Text>
                    <Text style={[styles.summaryValue, { color: colors.status.info }]}>
                      {selectedMaxPoints} / {totalMaxPoints} pts
                    </Text>
                  </View>
                </View>

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Marchandises éligibles</Text>
                  {goodsItems.length > 0 && (
                    <TouchableOpacity onPress={allSelected ? onDeselectAll : onSelectAll}>
                      <Text style={styles.selectAllText}>
                        {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {isLoadingGoods && <ActivityIndicator color={colors.primary.main} />}

                {!isLoadingGoods && goodsItems.length === 0 && (
                  <View style={styles.emptyState}>
                    <MaterialCommunityIcons name="package-variant" size={32} color={colors.text.disabled} />
                    <Text style={styles.emptyText}>Aucune marchandise éligible</Text>
                  </View>
                )}

                {goodsItems.map((item) => {
                  const checked = selectedGoodsIds.includes(item.id);
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.goodsRow, checked && styles.goodsRowSelected]}
                      onPress={() => onToggleGoods(item.id)}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons
                        name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                        size={22}
                        color={checked ? colors.primary.main : colors.text.secondary}
                      />
                      <View style={styles.goodsText}>
                        <Text style={styles.goodsName}>{item.goodsId}</Text>
                        <Text style={styles.goodsMeta}>{formatFCFA(item.balanceDue)} restant</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                <TextInput
                  style={styles.input}
                  value={approvedPoints}
                  onChangeText={onApprovedPointsChange}
                  keyboardType="number-pad"
                  placeholder="Points à approuver"
                  placeholderTextColor={colors.text.disabled}
                  editable={!busy}
                  onFocus={scrollToInput}
                />
                <Text style={styles.preview}>Valeur approuvée: {formatFCFA(approvedValue)}</Text>

                {validationMessage && (
                  <View style={styles.validationBox}>
                    <MaterialCommunityIcons name="alert-circle" size={16} color={colors.status.error} />
                    <Text style={styles.validationText}>{validationMessage}</Text>
                  </View>
                )}

                <TextInput
                  style={styles.input}
                  value={note}
                  onChangeText={onNoteChange}
                  placeholder="Note admin optionnelle"
                  placeholderTextColor={colors.text.disabled}
                  editable={!busy}
                  onFocus={scrollToInput}
                />
                <TextInput
                  style={[styles.input, styles.reasonInput]}
                  value={reason}
                  onChangeText={onReasonChange}
                  placeholder="Motif de rejet (obligatoire pour rejeter)"
                  placeholderTextColor={colors.text.disabled}
                  editable={!busy}
                  onFocus={scrollToInput}
                />

                {/* Extra bottom padding so inputs can scroll above keyboard */}
                <View style={{ height: 280 }} />
              </>
            )}

            {/* Show read-only details for processed redemptions */}
            {isReadOnly && request.status === 'APPROVED' && (
              <View style={[styles.readOnlyBox, { backgroundColor: colors.status.success + '08' }]}>
                <Text style={styles.readOnlyTitle}>Détails de l'approbation</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Points approuvés</Text>
                  <Text style={styles.summaryValue}>{request.approvedPoints} pts</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Valeur approuvée</Text>
                  <Text style={styles.summaryValue}>{formatFCFA(request.approvedValueFCFA)}</Text>
                </View>
                {request.restoredPoints > 0 && (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Points restitués</Text>
                    <Text style={[styles.summaryValue, { color: colors.status.info }]}>
                      +{request.restoredPoints} pts
                    </Text>
                  </View>
                )}
                {request.adminNote && (
                  <View style={styles.noteBox}>
                    <Text style={styles.noteLabel}>Note admin</Text>
                    <Text style={styles.noteText}>{request.adminNote}</Text>
                  </View>
                )}
              </View>
            )}

            {isReadOnly && request.status === 'REJECTED' && (
              <View style={[styles.readOnlyBox, { backgroundColor: colors.status.error + '08' }]}>
                <Text style={styles.readOnlyTitle}>Détails du rejet</Text>
                {request.restoredPoints > 0 && (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Points restitués</Text>
                    <Text style={[styles.summaryValue, { color: colors.status.info }]}>
                      +{request.restoredPoints} pts
                    </Text>
                  </View>
                )}
                <View style={styles.noteBox}>
                  <Text style={styles.noteLabel}>Motif de rejet</Text>
                  <Text style={styles.noteText}>{request.rejectionReason}</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Actions only for PENDING */}
          {!isReadOnly && (
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.rejectButton, !canReject && styles.disabled]}
                disabled={!canReject}
                onPress={handleReject}
              >
                <Text style={styles.rejectText}>{isRejecting ? 'Rejet...' : 'Rejeter'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.approveButton, (!canApprove || busy) && styles.disabled]}
                disabled={!canApprove || busy}
                onPress={handleApprove}
              >
                <Text style={styles.approveText}>
                  {isApproving ? 'Validation...' : 'Approuver'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
