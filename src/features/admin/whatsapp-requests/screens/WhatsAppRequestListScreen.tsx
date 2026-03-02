/**
 * WhatsAppRequestListScreen - Admin dashboard for WhatsApp packing list requests
 * Allows customer service to process WhatsApp requests without the customer using the app
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, FAB, Snackbar, ActivityIndicator, Chip, Button, Portal, Modal } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  useGetWhatsAppRequests,
  useGetPendingRequests,
  useGetWhatsAppStats,
  whatsappRequestQueryKeys,
  useMarkRequestProcessing,
  useMarkRequestCompleted,
  useGeneratePdf,
} from '../hooks/useWhatsAppRequests';
import { WhatsAppRequest, WhatsAppRequestStatus, WhatsAppRequestType } from '../api/whatsappRequestApi';
import { useQueryClient } from '@tanstack/react-query';
import { ApiClientError } from '@src/api/client';
import { Theme } from '@src/constants/Theme';

type WhatsAppRequestStackParamList = {
  WhatsAppRequestList: undefined;
  WhatsAppRequestDetail: { requestId: string };
  CreateWhatsAppRequest: undefined;
};

type NavigationProp = NativeStackNavigationProp<WhatsAppRequestStackParamList>;

const STATUS_FILTERS: { key: WhatsAppRequestStatus | 'all'; label: string; color: string }[] = [
  { key: 'all', label: 'Tous', color: Theme.neutral[500] },
  { key: 'PENDING', label: 'En attente', color: '#F59E0B' },
  { key: 'PROCESSING', label: 'En cours', color: '#3B82F6' },
  { key: 'COMPLETED', label: 'Terminé', color: '#10B981' },
  { key: 'FAILED', label: 'Échoué', color: '#EF4444' },
];

const TYPE_LABELS: Record<WhatsAppRequestType, string> = {
  PACKING_LIST: 'Liste de colisage',
  LOADING_LIST: 'Liste de chargement',
  TRACKING: 'Suivi',
  INVOICE: 'Facture',
  GENERAL: 'Général',
};

const STATUS_LABELS: Record<WhatsAppRequestStatus, string> = {
  PENDING: 'En attente',
  PROCESSING: 'En cours',
  COMPLETED: 'Terminé',
  FAILED: 'Échoué',
  CANCELLED: 'Annulé',
};

export const WhatsAppRequestListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();

  const [selectedStatus, setSelectedStatus] = useState<WhatsAppRequestStatus | 'all'>('PENDING');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<WhatsAppRequest | null>(null);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState<string | null>(null);

  const filters = (() => {
    return selectedStatus !== 'all' ? { status: selectedStatus, limit: 50 } : { limit: 50 };
  })();

  const { data, isLoading, isRefetching, error, refetch } = useGetWhatsAppRequests(filters);
  const { data: pendingData } = useGetPendingRequests();
  const { data: statsData } = useGetWhatsAppStats();

  const markProcessing = useMarkRequestProcessing();
  const markCompleted = useMarkRequestCompleted();
  const generatePdf = useGeneratePdf();

  const requests = data?.requests || [];
  const pendingCount = pendingData?.requests?.length || 0;
  const stats = statsData?.currentQueue || { pending: 0, processing: 0, total: 0 };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.all });
    await refetch();
  };

  const handleProcessRequest = async (request: WhatsAppRequest) => {
    try {
      if (request.status === 'PENDING') {
        await markProcessing.mutateAsync(request._id);
      }
      setSelectedRequest(request);
    } catch (err) {
      setErrorMessage(err instanceof ApiClientError ? err.message : 'Failed to process request');
    }
  };

  const handleGeneratePdf = async (request: WhatsAppRequest) => {
    try {
      const result = await generatePdf.mutateAsync({
        id: request._id,
        data: { format: request.requestType === 'LOADING_LIST' ? 'LOADING_LIST' : 'PACKING_LIST' },
      });
      setGeneratedPdf(result.pdfContent);
      setPdfModalVisible(true);
    } catch (err) {
      setErrorMessage(err instanceof ApiClientError ? err.message : 'Failed to generate PDF');
    }
  };

  const handleCompleteRequest = async (request: WhatsAppRequest) => {
    try {
      await markCompleted.mutateAsync({ id: request._id });
      setSelectedRequest(null);
    } catch (err) {
      setErrorMessage(err instanceof ApiClientError ? err.message : 'Failed to complete request');
    }
  };

  const handleCallCustomer = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsAppCustomer = (phoneNumber: string) => {
    // Remove + for WhatsApp URL
    const cleanPhone = phoneNumber.replace(/\+/g, '');
    Linking.openURL(`https://wa.me/${cleanPhone}`);
  };

  const renderRequestCard = ({ item }: { item: WhatsAppRequest }) => {
    const customerName = item.customerId
      ? `${item.customerId.firstName || ''} ${item.customerId.lastName || ''}`.trim()
      : 'Client inconnu';

    const statusColor =
      item.status === 'PENDING' ? '#F59E0B' :
      item.status === 'PROCESSING' ? '#3B82F6' :
      item.status === 'COMPLETED' ? '#10B981' :
      item.status === 'FAILED' ? '#EF4444' : Theme.neutral[400];

    const isProcessing = markProcessing.isPending || markCompleted.isPending;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleProcessRequest(item)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#FFFFFF', '#FAFAFA']}
          style={styles.cardGradient}
        >
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.requestIdContainer}>
              <Text style={styles.requestId}>{item.requestId}</Text>
              <Chip
                style={[styles.statusChip, { backgroundColor: `${statusColor}20` }]}
                textStyle={{ color: statusColor, fontSize: 11, fontWeight: '700' }}
              >
                {STATUS_LABELS[item.status]}
              </Chip>
            </View>
            <Text style={styles.timestamp}>
              {new Date(item.requestedAt).toLocaleString('fr-FR', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>

          {/* Customer Info */}
          <View style={styles.customerSection}>
            <View style={styles.customerIcon}>
              <Ionicons name="person-circle" size={40} color={Theme.primary[500]} />
            </View>
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{customerName}</Text>
              <TouchableOpacity
                onPress={() => handleCallCustomer(item.customerPhone)}
                style={styles.phoneContainer}
              >
                <Ionicons name="call" size={14} color={Theme.primary[600]} />
                <Text style={styles.customerPhone}>{item.customerPhone}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Request Type */}
          <View style={styles.typeSection}>
            <Chip
              style={styles.typeChip}
              icon={() => <Ionicons name="document-text" size={14} color={Theme.primary[600]} />}
            >
              {TYPE_LABELS[item.requestType]}
            </Chip>
            {item.goodsId && (
              <Chip style={styles.goodsChip} textStyle={{ fontSize: 11 }}>
                {item.goodsId}
              </Chip>
            )}
          </View>

          {/* Search Results Preview */}
          {item.searchResults && (
            <View style={styles.searchResults}>
              <View style={styles.resultItem}>
                <Ionicons name="cube" size={16} color={Theme.neutral[500]} />
                <Text style={styles.resultText}>
                  {item.searchResults.goodsFound.length} marchandise(s)
                </Text>
              </View>
              <View style={styles.resultItem}>
                <Ionicons name="container" size={16} color={Theme.neutral[500]} />
                <Text style={styles.resultText}>
                  {item.searchResults.containersFound.length} container(s)
                </Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          {item.status === 'PENDING' && (
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                onPress={() => handleProcessRequest(item)}
                loading={isProcessing}
                disabled={isProcessing}
                style={styles.processButton}
                buttonColor={Theme.primary[600]}
              >
                Traiter
              </Button>
              <Button
                mode="outlined"
                onPress={() => handleWhatsAppCustomer(item.customerPhone)}
                style={styles.whatsappButton}
                textColor="#25D366"
              >
                WhatsApp
              </Button>
            </View>
          )}

          {item.status === 'PROCESSING' && (
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                onPress={() => handleGeneratePdf(item)}
                loading={generatePdf.isPending}
                style={styles.pdfButton}
                buttonColor="#6366F1"
                icon="file-pdf-box"
              >
                Générer PDF
              </Button>
              <Button
                mode="contained"
                onPress={() => handleCompleteRequest(item)}
                loading={markCompleted.isPending}
                style={styles.completeButton}
                buttonColor="#10B981"
              >
                Terminer
              </Button>
            </View>
          )}

          {item.status === 'COMPLETED' && item.pdfUrl && (
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.completedText}>PDF envoyé</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: WhatsAppRequest) => item._id;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={Theme.gradients.glass}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerGreeting}>Service Client</Text>
            <Text style={styles.headerTitle}>WhatsApp Requests</Text>
          </View>
          <TouchableOpacity style={styles.iconButton} onPress={handleRefresh}>
            <Ionicons name="refresh" size={24} color={Theme.neutral[700]} />
          </TouchableOpacity>
        </View>

        {/* Stats Dashboard */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsContainer}
        >
          <StatCard
            label="En attente"
            value={stats.pending}
            icon="time"
            gradient={['#F59E0B', '#FBBF24']}
          />
          <StatCard
            label="En cours"
            value={stats.processing}
            icon="hammer"
            gradient={['#3B82F6', '#60A5FA']}
          />
          <StatCard
            label="Total"
            value={stats.total}
            icon="list"
            gradient={Theme.gradients.primary}
          />
        </ScrollView>
      </LinearGradient>

      {/* Status Filter Pills */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          {STATUS_FILTERS.map((filter) => {
            const isSelected = selectedStatus === filter.key;
            return (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterPill,
                  isSelected && { backgroundColor: filter.color },
                ]}
                onPress={() => setSelectedStatus(filter.key)}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.filterTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
                {filter.key === 'PENDING' && pendingCount > 0 && (
                  <View style={[styles.badge, { backgroundColor: isSelected ? '#FFF' : filter.color }]}>
                    <Text style={[styles.badgeText, { color: isSelected ? filter.color : '#FFF' }]}>
                      {pendingCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Request List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.primary[600]} />
          <Text style={styles.loadingText}>Chargement des demandes...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <LinearGradient
            colors={['#FEF2F2', '#FEE2E2']}
            style={styles.errorIconContainer}
          >
            <Ionicons name="alert-circle" size={64} color={Theme.status.error} />
          </LinearGradient>
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorSubtitle}>
            Impossible de récupérer les demandes
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRefresh}
          >
            <LinearGradient
              colors={Theme.gradients.primary}
              style={styles.retryButtonGradient}
            >
              <Ionicons name="refresh" size={20} color="#FFF" />
              <Text style={styles.retryButtonText}>Réessayer</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={keyExtractor}
          renderItem={renderRequestCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handleRefresh}
              tintColor={Theme.primary[500]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <LinearGradient
                colors={['#F3F0FF', '#EDE9FE']}
                style={styles.emptyIconContainer}
              >
                <Ionicons name="logo-whatsapp" size={64} color={Theme.primary[400]} />
              </LinearGradient>
              <Text style={styles.emptyTitle}>Aucune demande</Text>
              <Text style={styles.emptySubtitle}>
                {selectedStatus === 'PENDING'
                  ? 'Aucune demande WhatsApp en attente'
                  : selectedStatus !== 'all'
                  ? `Aucune demande avec le statut "${STATUS_LABELS[selectedStatus as WhatsAppRequestStatus]}"`
                  : 'Les demandes WhatsApp apparaîtront ici'}
              </Text>
            </View>
          }
        />
      )}

      {/* PDF Preview Modal */}
      <Portal>
        <Modal
          visible={pdfModalVisible}
          onDismiss={() => setPdfModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Aperçu du PDF</Text>
            <ScrollView style={styles.pdfPreview}>
              <Text style={styles.pdfText}>
                {generatedPdf ? 'PDF généré avec succès!' : 'Aucun contenu'}
              </Text>
              <Text style={styles.pdfNote}>
                En production, le PDF sera envoyé au client via WhatsApp.
              </Text>
            </ScrollView>
            <View style={styles.modalButtons}>
              <Button onPress={() => setPdfModalVisible(false)}>Fermer</Button>
              <Button
                mode="contained"
                onPress={() => {
                  setPdfModalVisible(false);
                  if (selectedRequest) {
                    handleCompleteRequest(selectedRequest);
                  }
                }}
              >
                Envoyer au client
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>

      {/* Error Snackbar */}
      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage(null)}
        action={{ label: 'OK', onPress: () => setErrorMessage(null) }}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

// Stat Card Component
interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  gradient: readonly [string, string, ...string[]];
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, gradient }) => (
  <View style={styles.statCard}>
    <LinearGradient
      colors={gradient}
      style={styles.statIconBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Ionicons name={icon as any} size={20} color="#FFF" />
    </LinearGradient>
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  header: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.lg,
  },
  headerGreeting: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  statsContainer: {
    paddingRight: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    minWidth: 130,
    ...Theme.shadows.sm,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[400],
  },
  filterWrapper: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  filterList: {
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral.white,
    ...Theme.shadows.sm,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  filterTextActive: {
    color: '#FFF',
  },
  badge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    padding: Theme.spacing.xl,
    paddingBottom: 100,
  },
  card: {
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    ...Theme.shadows.md,
  },
  cardGradient: {
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md,
  },
  requestIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  requestId: {
    fontSize: 16,
    fontWeight: '800',
    color: Theme.neutral[800],
  },
  statusChip: {
    height: 24,
  },
  timestamp: {
    fontSize: 12,
    color: Theme.neutral[400],
  },
  customerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  customerIcon: {
    marginRight: Theme.spacing.md,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  customerPhone: {
    fontSize: 14,
    color: Theme.primary[600],
    marginLeft: 4,
  },
  typeSection: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  typeChip: {
    backgroundColor: Theme.primary[50],
  },
  goodsChip: {
    backgroundColor: Theme.neutral[100],
  },
  searchResults: {
    flexDirection: 'row',
    gap: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resultText: {
    fontSize: 13,
    color: Theme.neutral[600],
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  processButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
  },
  whatsappButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
    borderColor: '#25D366',
  },
  pdfButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
  },
  completeButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: Theme.spacing.md,
    backgroundColor: '#D1FAE5',
    borderRadius: Theme.radius.lg,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Theme.spacing.lg,
    fontSize: 16,
    color: Theme.neutral[500],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
    paddingHorizontal: Theme.spacing.xl,
  },
  errorIconContainer: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  errorSubtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  retryButton: {
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  retryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  retryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: Theme.spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    paddingHorizontal: Theme.spacing['2xl'],
  },
  snackbar: {
    backgroundColor: Theme.neutral[800],
    borderRadius: Theme.radius.lg,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: Theme.radius.xl,
  },
  modalContent: {
    maxHeight: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: Theme.spacing.lg,
  },
  pdfPreview: {
    maxHeight: 300,
    marginBottom: Theme.spacing.lg,
  },
  pdfText: {
    fontSize: 16,
    color: Theme.neutral[800],
  },
  pdfNote: {
    fontSize: 14,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.md,
    fontStyle: 'italic',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Theme.spacing.md,
  },
});

export default WhatsAppRequestListScreen;
