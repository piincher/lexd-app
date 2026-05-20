import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AdminRedemptionList as AdminRedemptionListData, RewardRedemption, RewardRedemptionStatus } from '../types';
import { RedemptionPagination } from './RedemptionPagination';
import { RedemptionStatusBadge } from './RedemptionStatusBadge';
import { createStyles } from './AdminRedemptionList.styles';

interface AdminRedemptionListProps {
  data?: AdminRedemptionListData;
  isLoading: boolean;
  isError: boolean;
  status: RewardRedemptionStatus | 'ALL';
  search: string;
  page: number;
  onStatusChange: (status: RewardRedemptionStatus | 'ALL') => void;
  onSearchChange: (value: string) => void;
  onRetry: () => void;
  onOpen: (request: RewardRedemption) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const STATUS_OPTIONS: Array<RewardRedemptionStatus | 'ALL'> = ['PENDING', 'APPROVED', 'REJECTED', 'ALL'];
const STATUS_LABELS: Record<RewardRedemptionStatus | 'ALL', string> = {
  PENDING: 'En attente',
  APPROVED: 'Approuvées',
  REJECTED: 'Rejetées',
  CANCELLED: 'Annulées',
  ALL: 'Toutes',
};

const formatFCFA = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;
const userName = (item: RewardRedemption) => item.user?.name || 'Client';

export const AdminRedemptionList: React.FC<AdminRedemptionListProps> = ({
  data,
  isLoading,
  isError,
  status,
  search,
  page,
  onStatusChange,
  onSearchChange,
  onRetry,
  onOpen,
  onNextPage,
  onPrevPage,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const items = data?.items || [];
  const pagination = data?.pagination;

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={18} color={colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={onSearchChange}
          placeholder="Rechercher un client..."
          placeholderTextColor={colors.text.disabled}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {STATUS_OPTIONS.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.filter, status === item && styles.filterActive]}
            onPress={() => onStatusChange(item)}
          >
            <Text style={[styles.filterText, status === item && styles.filterTextActive]}>
              {STATUS_LABELS[item]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading && (
        <View style={styles.state}>
          <ActivityIndicator color={colors.primary.main} />
        </View>
      )}

      {isError && (
        <View style={styles.state}>
          <Text style={styles.stateText}>Impossible de charger les demandes.</Text>
          <TouchableOpacity onPress={onRetry}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isLoading && !isError && items.length === 0 && (
        <View style={styles.state}>
          <Text style={styles.stateText}>Aucune demande dans cette file.</Text>
        </View>
      )}

      {items.map((item) => (
        <TouchableOpacity key={item.id} style={styles.card} onPress={() => onOpen(item)}>
          <View style={styles.cardHeader}>
            <View style={styles.clientBlock}>
              <Text style={styles.clientName}>{userName(item)}</Text>
              <Text style={styles.phone}>{item.user?.phoneNumber || '-'}</Text>
            </View>
            <RedemptionStatusBadge status={item.status} size="sm" />
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.amount}>
              {item.requestedPoints} points • {formatFCFA(item.requestedValueFCFA)}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.secondary} />
          </View>
        </TouchableOpacity>
      ))}

      {pagination && pagination.pages > 1 && (
        <RedemptionPagination
          page={page}
          pages={pagination.pages}
          total={pagination.total}
          onPrev={onPrevPage}
          onNext={onNextPage}
        />
      )}
    </View>
  );
};
