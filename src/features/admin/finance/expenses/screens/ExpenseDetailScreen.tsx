import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  IconButton, 
  useTheme, 
  ActivityIndicator,
  Divider,
  Menu,
  Portal,
  Dialog,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { ExpenseTypeIcon } from '../components/ExpenseTypeIcon';
import { 
  useGetExpense, 
  useApproveExpense, 
  useRejectExpense, 
  useDeleteExpense 
} from '../hooks/useExpenses';
import { EXPENSE_TYPE_CONFIG, EXPENSE_STATUS_CONFIG, PAYMENT_METHOD_CONFIG } from '../types';
import { formatCurrency } from '@src/shared/lib/currency';
import type { AdminFinanceStackParamList } from '@src/navigations/type';

type NavigationProp = NativeStackNavigationProp<AdminFinanceStackParamList, 'ExpenseDetail'>;
type RoutePropType = RouteProp<AdminFinanceStackParamList, 'ExpenseDetail'>;

export const ExpenseDetailScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { expenseId } = route.params;

  const [showImageModal, setShowImageModal] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const { data: expense, isLoading } = useGetExpense(expenseId);
  const approveMutation = useApproveExpense();
  const rejectMutation = useRejectExpense();
  const deleteMutation = useDeleteExpense();

  const handleApprove = () => {
    Alert.alert(
      'Confirmer l\'approbation',
      'Êtes-vous sûr de vouloir approuver cette dépense ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Approuver', 
          onPress: () => approveMutation.mutate(expenseId)
        },
      ]
    );
  };

  const handleReject = () => {
    Alert.alert(
      'Confirmer le rejet',
      'Êtes-vous sûr de vouloir rejeter cette dépense ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Rejeter', 
          style: 'destructive',
          onPress: () => rejectMutation.mutate(expenseId)
        },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmer la suppression',
      'Cette action est irréversible. Êtes-vous sûr ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => {
            deleteMutation.mutate(expenseId, {
              onSuccess: () => navigation.goBack()
            });
          }
        },
      ]
    );
  };

  const handleEdit = () => {
    setMenuVisible(false);
    navigation.navigate('CreateExpense', { expenseId });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!expense) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="alert-circle" size={64} color="#EF4444" />
        <Text variant="titleMedium" style={styles.errorText}>
          Dépense non trouvée
        </Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          Retour
        </Button>
      </View>
    );
  }

  const typeConfig = EXPENSE_TYPE_CONFIG[expense.type];
  const statusConfig = EXPENSE_STATUS_CONFIG[expense.status];
  const paymentConfig = PAYMENT_METHOD_CONFIG[expense.paymentMethod];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />
        <Text variant="titleLarge" style={styles.headerTitle}>
          Dépense #{expense.expenseId}
        </Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton 
              icon="dots-vertical" 
              size={24} 
              onPress={() => setMenuVisible(true)} 
            />
          }
        >
          <Menu.Item 
            onPress={handleEdit} 
            title="Modifier" 
            leadingIcon="pencil" 
          />
          <Menu.Item 
            onPress={handleDelete} 
            title="Supprimer" 
            leadingIcon="delete" 
            titleStyle={{ color: '#EF4444' }}
          />
        </Menu>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: `${statusConfig.color}20` }]}>
            <MaterialCommunityIcons 
              name={expense.status === 'APPROVED' ? 'check-circle' : expense.status === 'REJECTED' ? 'close-circle' : 'clock-outline'} 
              size={16} 
              color={statusConfig.color} 
            />
            <Text style={[styles.statusText, { color: statusConfig.color }]}>
              {statusConfig.label}
            </Text>
          </View>
        </View>

        {/* Type & Amount Card */}
        <Card style={styles.mainCard}>
          <Card.Content style={styles.mainCardContent}>
            <ExpenseTypeIcon type={expense.type} size={48} />
            <View style={styles.typeInfo}>
              <Text variant="titleMedium" style={styles.typeLabel}>
                {typeConfig.label}
              </Text>
              {expense.category && (
                <Text variant="bodySmall" style={styles.category}>
                  {expense.category}
                </Text>
              )}
            </View>
            <Text variant="headlineMedium" style={[styles.amount, { color: theme.colors.error }]}>
              {formatCurrency(expense.amount)}
            </Text>
          </Card.Content>
        </Card>

        {/* Details Card */}
        <Card style={styles.detailsCard}>
          <Card.Content style={styles.detailsContent}>
            <Text variant="titleSmall" style={styles.sectionTitle}>
              Détails
            </Text>

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MaterialCommunityIcons name="text" size={20} color="#6B7280" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text variant="bodySmall" style={styles.detailLabel}>
                  Description
                </Text>
                <Text variant="bodyMedium" style={styles.detailValue}>
                  {expense.description}
                </Text>
              </View>
            </View>

            <Divider style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MaterialCommunityIcons name="calendar" size={20} color="#6B7280" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text variant="bodySmall" style={styles.detailLabel}>
                  Date
                </Text>
                <Text variant="bodyMedium" style={styles.detailValue}>
                  {format(new Date(expense.date), 'dd MMMM yyyy', { locale: fr })}
                </Text>
              </View>
            </View>

            <Divider style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MaterialCommunityIcons name="store" size={20} color="#6B7280" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text variant="bodySmall" style={styles.detailLabel}>
                  Fournisseur
                </Text>
                <Text variant="bodyMedium" style={styles.detailValue}>
                  {expense.vendor}
                </Text>
              </View>
            </View>

            <Divider style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MaterialCommunityIcons name={paymentConfig.icon as any} size={20} color="#6B7280" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text variant="bodySmall" style={styles.detailLabel}>
                  Mode de paiement
                </Text>
                <Text variant="bodyMedium" style={styles.detailValue}>
                  {paymentConfig.label}
                </Text>
              </View>
            </View>

            {expense.container && (
              <>
                <Divider style={styles.detailDivider} />
                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <MaterialCommunityIcons name="cube" size={20} color="#6B7280" />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text variant="bodySmall" style={styles.detailLabel}>
                      Conteneur lié
                    </Text>
                    <Text variant="bodyMedium" style={styles.detailValue}>
                      {expense.container.virtualContainerNumber}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Receipt Card */}
        {expense.receiptUrl && (
          <Card style={styles.receiptCard}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.sectionTitle}>
                Reçu
              </Text>
              <TouchableOpacity 
                style={styles.receiptImageContainer}
                onPress={() => setShowImageModal(true)}
              >
                <Image 
                  source={{ uri: expense.receiptUrl }} 
                  style={styles.receiptThumbnail}
                  resizeMode="cover"
                />
                <View style={styles.receiptOverlay}>
                  <MaterialCommunityIcons name="magnify" size={32} color="#fff" />
                </View>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        )}

        {/* Approval Info */}
        {expense.status === 'APPROVED' && expense.approvedBy && (
          <Card style={styles.approvalCard}>
            <Card.Content style={styles.approvalContent}>
              <MaterialCommunityIcons name="check-circle" size={24} color="#10B981" />
              <View style={styles.approvalText}>
                <Text variant="bodyMedium" style={styles.approvalTitle}>
                  Approuvé par {expense.approvedBy.firstName} {expense.approvedBy.lastName}
                </Text>
                {expense.approvedAt && (
                  <Text variant="bodySmall" style={styles.approvalDate}>
                    Le {format(new Date(expense.approvedAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                  </Text>
                )}
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Notes */}
        {expense.notes && (
          <Card style={styles.notesCard}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.sectionTitle}>
                Notes
              </Text>
              <Text variant="bodyMedium" style={styles.notesText}>
                {expense.notes}
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Created Info */}
        <View style={styles.createdInfo}>
          <Text variant="bodySmall" style={styles.createdText}>
            Créé le {format(new Date(expense.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Action Buttons */}
      {expense.status === 'PENDING' && (
        <View style={styles.actionContainer}>
          <Button
            mode="outlined"
            onPress={handleReject}
            style={[styles.actionButton, styles.rejectButton]}
            textColor="#EF4444"
            loading={rejectMutation.isPending}
            disabled={rejectMutation.isPending || approveMutation.isPending}
          >
            Rejeter
          </Button>
          <Button
            mode="contained"
            onPress={handleApprove}
            style={[styles.actionButton, styles.approveButton]}
            loading={approveMutation.isPending}
            disabled={rejectMutation.isPending || approveMutation.isPending}
          >
            Approuver
          </Button>
        </View>
      )}

      {/* Image Modal */}
      <Portal>
        <Dialog visible={showImageModal} onDismiss={() => setShowImageModal(false)} style={styles.imageDialog}>
          <Dialog.Content style={styles.imageDialogContent}>
            {expense.receiptUrl && (
              <Image 
                source={{ uri: expense.receiptUrl }} 
                style={styles.fullImage}
                resizeMode="contain"
              />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowImageModal(false)}>Fermer</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 32,
  },
  errorText: {
    color: '#374151',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontWeight: '600',
  },
  mainCard: {
    marginBottom: 16,
    elevation: 2,
  },
  mainCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  typeInfo: {
    flex: 1,
  },
  typeLabel: {
    fontWeight: '600',
  },
  category: {
    color: '#6B7280',
    marginTop: 2,
  },
  amount: {
    fontWeight: '700',
  },
  detailsCard: {
    marginBottom: 16,
    elevation: 2,
  },
  detailsContent: {
    gap: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#374151',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    color: '#6B7280',
  },
  detailValue: {
    marginTop: 2,
    color: '#1F2937',
  },
  detailDivider: {
    marginVertical: 4,
  },
  receiptCard: {
    marginBottom: 16,
    elevation: 2,
  },
  receiptImageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  receiptThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  receiptOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  approvalCard: {
    marginBottom: 16,
    backgroundColor: '#10B98110',
    elevation: 0,
  },
  approvalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  approvalText: {
    flex: 1,
  },
  approvalTitle: {
    color: '#059669',
    fontWeight: '600',
  },
  approvalDate: {
    color: '#6B7280',
    marginTop: 2,
  },
  notesCard: {
    marginBottom: 16,
    elevation: 2,
  },
  notesText: {
    color: '#374151',
    lineHeight: 22,
  },
  createdInfo: {
    alignItems: 'center',
    marginTop: 8,
  },
  createdText: {
    color: '#9CA3AF',
  },
  bottomSpacing: {
    height: 100,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
  },
  rejectButton: {
    borderColor: '#EF4444',
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  imageDialog: {
    maxHeight: '80%',
  },
  imageDialogContent: {
    padding: 0,
    alignItems: 'center',
  },
  fullImage: {
    width: 300,
    height: 400,
  },
});
